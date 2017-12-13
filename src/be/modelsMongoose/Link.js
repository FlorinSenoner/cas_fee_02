/** @format */

const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  url: String,
  description: String,
})

module.exports = mongoose.model('Link', linkSchema)
