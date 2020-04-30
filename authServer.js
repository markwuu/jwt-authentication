require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

// store this in a database
let refreshTokens = [];

//send the [refresh token] and receive a new [access token] using [user + ACCESS_TOKEN_SECRET]
app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    //check if received [refresh token] is stored in our database
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    //verify refresh token with REFRESH_TOKEN_SECRET
    //then create a new [access token] for user
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

//send the [refresh token] and then remove it from the database
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

//login with username and receive an [access token] and [refresh token]
app.post('/login', (req, res) => {
    // Authenticate user

    const username = req.body.username;
    const user = { name: username };

    //generates access token using username (expires in x)
    const accessToken = generateAccessToken(user);
    //generates refresh token using username (no expiration)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    //store this refresh token in your database
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
});

//generates an [access token] using [user + ACCESS_TOKEN_SECRET]
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '25s'});
}

app.listen(4000);
