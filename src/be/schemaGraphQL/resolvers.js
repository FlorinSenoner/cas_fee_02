/** @format */

const mongoose = require('mongoose')
const Link = require('../modelsMongoose/Link')
const User = require('../modelsMongoose/User')
const Vote = require('../modelsMongoose/Vote')

module.exports = {
  Query: {
    allLinks: async () => Link.find().exec(),
  },

  Mutation: {
    createLink: async (root, { url, description }, { user }) => {
      const newLink = {
        url,
        description,
        // eslint-disable-next-line no-underscore-dangle
        postedById: user && user._id,
      }
      console.log(newLink)
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
