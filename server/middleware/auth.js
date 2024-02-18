// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Retrieve the token from the request header
    const token = req.header('auth-token');
    // If no token is present, return a 401 Unauthorized response
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // Verify the token using the secret key and if it's valid, extract the user info
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Add the verified user's information to the request object
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = auth;
