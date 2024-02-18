import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnswerDetails.css'; 

function AnswerDetails({ questionId }) {
    const [newAnswer, setNewAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');

    // Function to fetch answers from the server
    const fetchAnswers = async () => {
        setIsLoading(true);
        try {
            const answersResponse = await axios.get(`http://localhost:5000/api/answers/question/${questionId}`);
            setAnswers(answersResponse.data);
        } catch (error) {
            setError('Error fetching answers: ' + error.message);
        }
        setIsLoading(false);
    };

    // Call fetchAnswers on mount and when questionId changes
    useEffect(() => {
        fetchAnswers();
    }, [questionId]);

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`http://localhost:5000/api/answers`, {
                content: newAnswer,
                questionId,
            });
            setAnswers(prevAnswers => [...prevAnswers, response.data]);
            setNewAnswer('');
        } catch (error) {
            setError('Error submitting answer: ' + error.message);
        }
        setIsLoading(false);
    };

    // Function to handle voting
    const handleVote = async (answerId, voteType) => {
        setIsLoading(true);
        try {
            await axios.post(`http://localhost:5000/api/answers/${voteType}/${answerId}`, {
                voteType,
            });
            fetchAnswers(); // Re-fetch answers to get the updated votes
        } catch (error) {
            setError('Error voting: ' + error.message);
        }
        setIsLoading(false);
    };
    

    return (
        <div className="answers-container">
            {answers.map((answer) => (
                <div key={answer._id} className="answer">
                    <p>{answer.content}</p>
                    <div className="vote-controls">
                        <button onClick={() => handleVote(answer._id, 'upvote')} disabled={isLoading}>Upvote</button>
                        <span>{answer.upvotes - answer.downvotes}</span>
                        <button onClick={() => handleVote(answer._id, 'downvote')} disabled={isLoading}>Downvote</button>
                    </div>
                </div>
            ))}
            <form onSubmit={handleSubmitAnswer} className="answer-form">
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Type your answer here"
                    required
                />
                <button type="submit" disabled={isLoading}>Submit Answer</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default AnswerDetails;
