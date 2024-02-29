const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Dummy user database
const users = {
    "user1": "Lash#224",
    "user2": "2334#2343A"
};

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if user exists and password matches
    if (users[username] && users[username] === password) {
        return res.json({ message: 'Login successful!' });
    } else {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
