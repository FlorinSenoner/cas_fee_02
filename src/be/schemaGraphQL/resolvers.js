/** @format */

const mongoose = require('mongoose')
const pubsub = require('./pubsub')
const isURL = require('validator/lib/isURL')

const Link = require('../modelsMongoose/Link')
const User = require('../modelsMongoose/User')
const Vote = require('../modelsMongoose/Vote')

class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.field = field
  }
}

const assertValidLink = url => {
  if (!isURL(url)) {
    throw new ValidationError('Link validation error: invalid url.', 'url')
  }
}

const buildFilters = ({ OR = [], descriptionContains, urlContains }) => {
  const filter = descriptionContains || urlContains ? {} : null
  if (descriptionContains) {
    filter.description = { $regex: `.*${descriptionContains}.*` }
  }
  if (urlContains) {
    filter.url = { $regex: `.*${urlContains}.*` }
  }

  let filters = filter ? [filter] : []
  // eslint-disable-next-line
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildFilters(OR[i]))
  }
  return filters
}

module.exports = {
  Query: {
    allLinks: async (root, { filter }) => {
      const query = filter ? { $or: buildFilters(filter) } : {}
      return Link.find(query).exec()
    },
  },

  Mutation: {
    createLink: async (root, { url, description }, { user }) => {
      assertValidLink(url)
      const newLink = {
        url,
        description,
        // eslint-disable-next-line no-underscore-dangle
        postedById: user && user._id,
      }
      pubsub.publish('Link', { Link: { mutation: 'CREATED', node: newLink } })
      return new Link(newLink).save()
    },

    createUser: async (root, { name, authProvider }) => {
      // You need to convert the given arguments into the format for the
      // `User` type, grabbing email and password from the "authProvider".
      const newUser = {
        name,
        email: authProvider.email.email,
        password: authProvider.email.password,
      }
      return new User(newUser).save()
    },

    signinUser: async (root, { email }) => {
      const user = await User.findOne({ email: email.email }).exec()
      if (email.password === user.password) {
        return { token: `token-${user.email}`, user }
      }
      return undefined
    },
    createVote: async (root, { linkId }, { user }) => {
      const newVote = {
        // eslint-disable-next-line no-underscore-dangle
        userId: user && user._id,
        linkId: new mongoose.mongo.ObjectId(linkId),
      }
      return new Vote(newVote).save()
    },
  },

  Subscription: {
    Link: {
      subscribe: () => pubsub.asyncIterator('Link'),
    },
  },

  Link: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,
    postedBy: async ({ postedById }, data, { dataloaders: { userLoader } }) =>
      userLoader.load(postedById),
    votes: async ({ _id }) => Vote.find({ linkId: _id }).exec(),
  },

  User: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,
    votes: async ({ _id }) => Vote.find({ userId: _id }).exec(),
  },

  Vote: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,
    user: async ({ userId }, data, { dataloaders: { userLoader } }) =>
      userLoader.load(userId),
    link: async ({ linkId }) => Link.findOne({ _id: linkId }).exec(),
  },
}
