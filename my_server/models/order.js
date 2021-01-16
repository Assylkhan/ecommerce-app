const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    trim: true
  },
  sum: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Order', orderSchema);
