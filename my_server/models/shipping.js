const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: string,
    trim: true
  },
  sum: {
    type: Number,
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
  address: {
    type: String
  },
  zip: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Shipping', orderSchema);
