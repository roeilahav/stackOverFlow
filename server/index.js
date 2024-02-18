const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the connectDB function

// Import routes
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');

connectDB(); // Initialize database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Test route
app.get('/', (req, res) => {
  res.send('Hello from IVOverflow server!');
});

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes  );

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
