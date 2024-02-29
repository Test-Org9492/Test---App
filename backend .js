const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = '$njdnjii3394uebjbd@NJEJbhbdhdb';

const users = {
    "user1": "Apsaewed@123",
    "user2": "Connecr@223"
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided.' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token.' });

        req.user = decoded;
        next();
    });
};

app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if user exists and password matches
    if (users[username] && users[username] === password) {
        // Generate JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
});

// Protected endpoint
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected endpoint accessed successfully!', user: req.user });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
