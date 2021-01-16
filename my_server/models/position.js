const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    trim: true
  },
  itemId: {
    type: Number,
    trim: true
  },
  quantity: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Position', positionSchema);
