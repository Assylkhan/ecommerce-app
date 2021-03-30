const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true
  },
  positions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Position'
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Cart', cartSchema);
