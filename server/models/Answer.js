const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,  
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
