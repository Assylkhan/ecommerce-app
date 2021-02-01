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
  longDescription: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean
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

module.exports = mongoose.model('Item', itemSchema);
