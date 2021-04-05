const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  //   trim: true
  // },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  positions: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Position'}]
  }
}, {
  timestamps: true
}, );

module.exports = mongoose.model('Cart', cartSchema, 'cart');
