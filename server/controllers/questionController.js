const Question = require('../models/Question');
const Answer = require('../models/Answer');


// POST endpoint for creating a new question
const postQuestion = async (req, res) => {
    try {
        // Creating a new question instance using the request body data
        const newQuestion = new Question(req.body);

        // Save the question to the database
        await newQuestion.save();

        // Send a response back to the client
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// GET endpoint to fetch all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().lean();
    
    for (let question of questions) {
      const answers = await Answer.find({ questionId: question._id });
      question.answersCount = answers.length;
      question.voteCount = answers.reduce((sum, answer) => sum + (answer.upvotes - answer.downvotes), 0);
    }
    
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET endpoint to fetch a specific question by ID
const getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        // Sending back the question if found, or a not found message if not
        if (question) {
            res.json(question);
        } else {
            res.status(404).send('Question not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    postQuestion,
    getAllQuestions,
    getQuestion
};