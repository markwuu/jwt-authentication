require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'Mark',
        title: 'Cool post 1',
    },
    {
        username: 'Ash',
        title: 'Cool post 2',
    }
]

//GET /posts sends along access token
//authenticateToken will verify the token in the GET request is the same by running it through a function that takes the token in the GET request and compares it to the ACCESS_TOKEN_SECRET in the .env file
app.get('/posts', authenticateToken, (req, res) => {
    // return list of posts where the post.username is equal to the name on the get request
    res.json(posts.filter(post => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    //verify token that user was sent during login. If verified, allow next middleware to fire
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        //if verified, we set the user to the req.user in the next middleware
        req.user = user;
        next();
    });
};

app.listen(3000);
