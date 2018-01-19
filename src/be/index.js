/** @format */

/* eslint consistent-return:0 */

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' })

// Node server
const express = require('express')

// Parses incoming request bodies using middleware
const bodyParser = require('body-parser')

// A Object Document Mapper (ODM) from MongoDB
const mongoose = require('mongoose')

// Handle GraphQL server requests and responses based on the schema.
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

// import utils
const logger = require('./utils/logger')
const argv = require('./utils/argv')
const port = require('./utils/port')

const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const User = require('./modelsMongoose/User')
const schema = require('./schemaGraphQL')
const buildDataloaders = require('./schemaGraphQL/dataloaders')
const formatError = require('./schemaGraphQL/formatError')
const { authenticate } = require('./schemaGraphQL/authentication')

const setup = require('./middlewares/frontendMiddleware')

const isDev = process.env.NODE_ENV !== 'production'

const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false
const { resolve } = require('path')
const app = express()
const server = createServer(app)

// Connect to database
const mongoDB = process.env.DATABASE
mongoose.connect(mongoDB, { useMongoClient: true })
// Use native promises
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => logger.error(err.message))
mongoose.set('debug', process.env.DEBUG_DATABASE === 'true')

// get the intended host and port number, use localhost and port 8888 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

const buildOptions = async req => {
  const user = await authenticate(req, User)
  return {
    // This context object is passed to all resolvers.
    context: {
      dataloaders: buildDataloaders(),
      user,
    },
    formatError,
    schema,
  }
}

// add be API, add custom backend-specific middleware
app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions))
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'Authorization': 'bearer token-test@gmail.com'`,
    subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`,
  }),
)

// In production we need to pass these values in instead of relying on webpack
setup(app, { outputPath: resolve(process.cwd(), 'build'), publicPath: '/' })

// Start app
server.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }

  // start subscription server
  SubscriptionServer.create({ execute, subscribe, schema }, { server, path: '/subscriptions' })

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr)
      }

      logger.appStarted(port, prettyHost, url)
    })
  } else {
    logger.appStarted(port, prettyHost)
  }
})
