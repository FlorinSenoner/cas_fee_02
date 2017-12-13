/** @format */
const Link = require('../modelsMongoose/Link')
const User = require('../modelsMongoose/User')

module.exports = {
  Query: {
    allLinks: async () => Link.find().exec(),
  },

  Mutation: {
    createLink: async (root, { url, description }, user) => {
      const newLink = {
        url,
        description,
        // eslint-disable-next-line no-underscore-dangle
        postedById: user && user._id,
      }
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
  },

  Link: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,

    postedBy: async ({ postedById }) =>
      User.findOne({ _id: postedById }).exec(),
  },

  User: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,
  },
}
