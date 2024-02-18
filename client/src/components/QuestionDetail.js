import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnswerDetails from './AnswerDetails';  
import './QuestionDetail.css';

function QuestionDetail() {
    // State hooks for storing question data and answers
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    // useParams hook to access the question ID from the UR
    const { id } = useParams();

    // Fetch question and answers data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionResponse = await axios.get(`http://localhost:5000/api/questions/${id}`);
                setQuestion(questionResponse.data);
                
                const answersResponse = await axios.get(`http://localhost:5000/api/answers/question/${id}`);
                setAnswers(answersResponse.data);
            } catch (error) {
                console.error('Error fetching question details:', error);
            }
        };
        // useEffect dependency array with id to re-run the hook when id changes
        fetchData();
    }, [id]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="question-detail-container">
            <div className="question">
                <h3>{question.title}</h3>
                <p>{question.content}</p>
                <div className="tags">
                    {question.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
                <div className="votes">Votes: {question.vote}</div>
            </div>
            <AnswerDetails questionId={id} answers={answers} setAnswers={setAnswers} />
        </div>
    );
}

export default QuestionDetail;
