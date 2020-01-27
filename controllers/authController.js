const express = require('express');
const bodyParser = require('body-parser');
const secret = process.env.JWT;
const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/authUtils');



const login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username, fetch user from db
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password ) {
        if (username === mockedUsername && password === mockedPassword) {
            let token = jwt.sign(
                { username: username },
                secret,
                { expiresIn: '24h'}
            );

            // return the JWT token for future API calls
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    }
}

const index = (req, res) => {
    res.json({
        success: true,
        message: 'Index page'
    });
}

module.exports = {
    login,
    index
}