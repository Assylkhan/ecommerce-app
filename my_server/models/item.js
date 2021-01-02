const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  realPrice: {
    type: Number,
    trim: true
  },
  price: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  count: {
    type: Number,
    required: [true, 'The count is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  imageFileName: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
}, );

var Item = mongoose.model('Item', itemSchema);
module.exports = {
  Item
};
