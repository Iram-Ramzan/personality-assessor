const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  traits: {
    O: { type: Number, required: true },
    C: { type: Number, required: true },
    E: { type: Number, required: true },
    A: { type: Number, required: true },
    N: { type: Number, required: true },
  },
  // NEW: facet scores, keyed by facetCode (O1, O2, C1, etc.)
  facets: {
    type: Object, // { O1: Number, O2: Number, ... }
    default: {},
  },
  careerSuggestions: {
    type: [String],
    required: true,
  },
  answers: {
    type: Object,
  },
  // Optional: store summary personality info for later reporting
  personalityLabel: {
    type: String,
  },
  primaryTrait: {
    type: String,
    enum: ['O', 'C', 'E', 'A', 'N'],
  },
  primaryScore: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assessment', assessmentSchema);
