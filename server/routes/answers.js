// server/routes/answers.js
const express = require('express');
const router = express.Router();
const { postAnswer, voteAnswer, getAnswersByQuestionId } = require('../controllers/answerController');

// Post an answer to a question
router.post('/', postAnswer);

// Get all answers for a specific question by ID
router.get('/question/:questionId', getAnswersByQuestionId);

// Upvote/Downvote an answer
router.post('/upvote/:answerId', voteAnswer); // Upvote route
router.post('/downvote/:answerId', voteAnswer); // Downvote route

module.exports = router;
