/** @format */

const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: 'You need to provide a user',
    ref: 'User',
  },
  linkId: {
    type: mongoose.Schema.ObjectId,
    required: 'You need to provide a link',
    ref: 'Link',
  },
})

module.exports = mongoose.model('Vote', linkSchema)
