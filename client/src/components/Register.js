import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

function Register() {
  const [userData, setUserData] = useState({
    nickname: '',
    fullName: '',
    email: '',
    password: '',
  });

  const { nickname, fullName, email, password } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(userData);
      const response = await axios.post('/api/users/register', body, config);

      console.log(response.data); 
      
    } catch (error) {
      console.error(error.response.data); 
    }
  };

  return (
    <div className="register-container">
      <div className="register-logo">LOGO</div>
      <h1>IVOverflow</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
          required
        />

        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;