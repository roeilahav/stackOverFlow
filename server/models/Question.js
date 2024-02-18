const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: String, // or mongoose.Schema.Types.ObjectId if you're referencing the User model
    required: false,
  },
  question: {
    type: String,
    required: true,
  },
  tags: [String],
  voteCount: {
    type: Number,
    default: 0,
  },
  answersCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);
