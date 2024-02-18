const Answer = require('../models/Answer');

// POST endpoint for creating a new answer
const postAnswer = async (req, res) => {
    try {
         // Creating a new answer instance with request data
        const newAnswer = new Answer({
            content: req.body.content,
            questionId: req.body.questionId, 
        });
        // Saving the new answer to the database
        await newAnswer.save();
        // Sending back the created answer
        res.status(201).json(newAnswer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// PUT endpoint for voting on an answer
const voteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.answerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        // Update upvotes or downvotes based on the vote type
        if (req.body.voteType === 'upvote') {
            answer.upvotes += 1; // Increment upvotes
        } else if (req.body.voteType === 'downvote') {
            answer.downvotes += 1; // Increment downvotes
        }

        await answer.save();
        res.json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET endpoint to fetch all answers for a specific question
const getAnswersByQuestionId = async (req, res) => {
    try {
        const answers = await Answer.find({ questionId: req.params.questionId }).sort({ createdAt: -1 });
        res.json(answers);
    } catch (err) {
        console.error("Error fetching answers:", err);
        res.status(500).send('Server Error');
    }
};



module.exports = {
    postAnswer,
    voteAnswer,
    getAnswersByQuestionId
};