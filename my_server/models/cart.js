const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Cart', cartSchema);
