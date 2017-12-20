/** @format */

const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please supply a Name',
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    // workaround: Implicit async custom validators (custom validators that take 2 arguments) are deprecated in mongoose >= 4.9.0
    validate: [
      {
        validator: value => isEmail(value),
        msg: 'Invalid Email Address',
      },
    ],
    required: 'Please Supply an Email Address',
  },
  password: {
    type: String,
    required: 'Please supply a password',
  },
})

module.exports = mongoose.model('User', userSchema)
