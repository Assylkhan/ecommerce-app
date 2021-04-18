const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: string,
    trim: true
  },
  sum: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Shipping', orderSchema);
