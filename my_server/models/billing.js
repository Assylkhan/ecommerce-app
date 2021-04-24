const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  zip: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Billing', orderSchema);
