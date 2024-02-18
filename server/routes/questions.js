const express = require('express');
const router = express.Router();
const { postQuestion, getAllQuestions, getQuestion } = require('../controllers/questionController');

// Post a question
router.post('/', postQuestion);

// Get all questions
router.get('/', getAllQuestions);

// Get a specific question by its ID
router.get('/:id', getQuestion);

module.exports = router;
