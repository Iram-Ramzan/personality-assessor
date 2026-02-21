const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  traits: {
    O: Number,
    C: Number,
    E: Number,
    A: Number,
    N: Number,
  },

  facets: {
    type: Object,
    default: {},
  },

  careerSuggestions: {
    type: [String],
    required: true,
  },

  answers: {
    type: Object,
  },

  personalityLabel: String,
  primaryTrait: String,
  primaryScore: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assessment', assessmentSchema);
