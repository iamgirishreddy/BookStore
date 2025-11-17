const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
