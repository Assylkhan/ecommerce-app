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

var Order = mongoose.model('Order', orderSchema);
module.exports = {
  Order
};
