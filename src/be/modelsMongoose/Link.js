/** @format */

const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: 'You need to provide a URL',
    trim: true,
  },
  description: {
    type: String,
    required: 'You need to provide a Description',
    trim: true,
  },
  postedById: {
    type: mongoose.Schema.ObjectId,
    required: 'You need to provide a User',
    ref: 'User',
  },
})

module.exports = mongoose.model('Link', linkSchema)
