/** @format */
const Link = require('../modelsMongoose/Link')

module.exports = {
  Query: {
    allLinks: async () => Link.find().exec(),
  },

  Mutation: {
    createLink: async (root, { url, description }) =>
      new Link({ url, description }).save(),
  },

  Link: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,
  },
}
