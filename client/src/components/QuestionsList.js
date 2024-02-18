import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './QuestionsList.css';
import AskQuestion from './AskQuestion';

function QuestionsList() {
    const [isOpen, setIsOpen] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleNewQuestion = (newQuestion) => {
        setQuestions([newQuestion, ...questions]);
    };

    return (
        <div className="questions-list">
            <header>
                <div className="logo">LOGO</div>
                <input type="search" placeholder="Search" />
                <button onClick={() => setIsOpen(true)}>Ask Question</button>
                <button>Logout</button>
            </header>
            <div className="questions-container">
                {questions.map((question) => (
                    <div key={question._id} className="question-card">
                        <div className="question-stats">
                            <div className="answers-count">
                                {question.answersCount || 0} answers
                            </div>
                            <div className="vote-count">
                                {question.vote || 0} votes
                            </div>
                        </div>
                        <div className="question-content">
                            <h3>{question.title}</h3>
                            <p>{question.question}</p>
                            <div className="tags-container">
                                {question.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="question-footer">
                                asked {question.createdAt} by {question.user}
                            </div>
                            <Link to={`/questions/${question._id}`}>
                                <button className="answer-button">Answer</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <AskQuestion isOpen={isOpen} onClose={() => setIsOpen(false)} onNewQuestion={handleNewQuestion} />
        </div>
    );
}

export default QuestionsList;
