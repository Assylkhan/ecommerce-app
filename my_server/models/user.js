const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  zip: {
    type: String
  }
}, {
  timestamps: true
}, );

var User = mongoose.model('User', userSchema);
module.exports = { User };
