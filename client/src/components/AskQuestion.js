import React, { useState } from 'react';
import axios from 'axios';
import './AskQuestion.css'; 

//Component for asking a question
const AskQuestion = ({ isOpen, onClose, onNewQuestion }) => {
  const [question, setQuestion] = useState({
    title: '',
    question: '',
    tags: '',
  });

  // Handler for input changes
  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await axios.post('http://localhost:5000/api/questions', question);
      console.log('Question submitted:', response.data);

      // Invoke callback to update parent component with new question data, if provided
      if(onNewQuestion) {
        onNewQuestion(response.data);
      }

      onClose(); 
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };
  // If the modal is not open, don't render anything
  if (!isOpen) return null; 

  return (
    <div className="ask-question">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Ask Question</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={question.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            name="question"
            placeholder="Question"
            value={question.question}
            onChange={handleChange}
            required
          />
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            name="tags"
            placeholder="Tags separated by commas"
            value={question.tags}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
