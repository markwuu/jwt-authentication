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

//GET /posts sends along access token in the header
app.get('/posts', authenticateToken, (req, res) => {
    // return list of posts where the post.username is equal to the name on the get request
    res.json(posts.filter(post => post.username === req.user.name));
});

//authenticateToken will verify the token in the GET request
//is generated from the ACCESS_TOKEN_SECRET using the verify function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user; //pass user into request object
        next(); //and allow next callback to fire
    });
};

app.listen(3000);
