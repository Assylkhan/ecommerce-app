const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Cart', cartSchema);
