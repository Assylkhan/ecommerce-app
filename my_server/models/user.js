const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
      validator: async function (email) {
        const user = await this.constructor.findOne({
          email
        });
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

userSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function (hashedPassword) {
  return bcrypt.compareSync(hashedPassword, this.password);
}

var User = mongoose.model('User', userSchema);
module.exports = {
  User
};