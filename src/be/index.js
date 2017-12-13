/** @format */

/* eslint consistent-return:0 */
const express = require('express')
// This package automatically parses JSON requests.
const bodyParser = require('body-parser')
// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const logger = require('./logger')
const argv = require('./argv')
const port = require('./port')
const schema = require('./schema')
// const connectMongo = require('./mongo-connector')
const setup = require('./middlewares/frontendMiddleware')

const isDev = process.env.NODE_ENV !== 'production'

const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false
const { resolve } = require('path')
const app = express()

const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/wettemer'
mongoose.connect(mongoDB, { useMongoClient: true })
mongoose.Promise = global.Promise

mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:'),
)

// const Links = mongoose.model('Links')
// const linkSchema = new mongoose.Schema()
const Links = mongoose.model('Links', {
  url: String,
  description: String,
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

// add be API, add custom backend-specific middleware
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: { Links },
  }),
)
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
)

// In production we need to pass these values in instead of relying on webpack
setup(app, { outputPath: resolve(process.cwd(), 'build'), publicPath: '/' })

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }

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
