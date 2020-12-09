const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: [true],
    index: true,
    trim: true,
    required: [true, 'The email is required'],
    validate: {
      validator: async function(email) {
        const user = await this.constructor.findOne({email});
        if (user) {
          return this.id === user.id;
        }
        return true;
      },
      message: props => 'The specified email address is already in use'
    }
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
    trim: true
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
    type: String,
    trim: true
  }
}, {
  timestamps: true
}, );

var User = mongoose.model('User', userSchema);
module.exports = { User };
