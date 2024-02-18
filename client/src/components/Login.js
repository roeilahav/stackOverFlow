import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  // State hooks to manage email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // useNavigate hook for navigation
  const navigate = useNavigate(); 
  // Function to handle form submission
  const handleSubmit = async (event) => {
  //prevents the default action associated with the event from occurring
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: email,
        password: password
      });
      console.log('Login successful:', response.data);

      // Store the received token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the questions page
      navigate('/questions');
    } catch (error) {
      console.error('Login error:', error.response);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">LOGO</div>
      <h1>IVOverflow</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
