const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  itemNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    enum: ['O', 'C', 'E', 'A', 'N'],
    required: true,
  },
  facetCode: {
    type: String,
    required: true,
  },
  facetName: {
    type: String,
    required: true,
  },
  keyedDirection: {
    type: String,
    enum: ['+', '-'],
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Question', questionSchema);
