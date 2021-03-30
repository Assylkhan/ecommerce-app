const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    trim: true
  },
  cartId: {
    type: String,
    trim: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  quantity: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Position', positionSchema);
