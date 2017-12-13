/** @format */

module.exports = {
  Query: {
    allLinks: async (root, data, { Links }) => Links.find().exec(),
  },

  Mutation: {
    createLink: async (root, { url, description }, { Links }) =>
      new Links({ url, description }).save(),
  },

  Link: {
    // eslint-disable-next-line no-underscore-dangle
    id: root => root._id || root.id,
  },
}
