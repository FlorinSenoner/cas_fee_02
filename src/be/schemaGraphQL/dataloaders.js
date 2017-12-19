/** @format */
const User = require('../modelsMongoose/User')

const DataLoader = require('dataloader')

const batchUsers = async keys => User.find({ _id: { $in: keys } }).exec()

module.exports = () => ({
  userLoader: new DataLoader(keys => batchUsers(keys), {
    cacheKeyFn: key => key.toString(),
  }),
})
