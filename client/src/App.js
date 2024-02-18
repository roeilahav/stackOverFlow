import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import QuestionsList from './components/QuestionsList';
import QuestionDetail from './components/QuestionDetail';
// import AskQuestion from './components/AskQuestion';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/">Questions</Link></li>
            {/* <li><Link to="/register">Register</Link></li> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<QuestionsList />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<QuestionsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
