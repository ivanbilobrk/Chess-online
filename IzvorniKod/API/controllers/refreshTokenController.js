const db = require('../db/index');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized
    const refreshToken = cookies.jwt;

    //find the user with given refreshtoken in the database if it doesnt exist ->forbidden 403
    const foundUser = await User.fetchByRefreshToken(refreshToken);
    if (foundUser.id === undefined) return res.sendStatus(403); //Forbidden

    const name = foundUser.name;
    const surName = foundUser.surname;
    const email = foundUser.email;
    const userName = foundUser.username;
    const role = foundUser.role

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            console.log(decoded.userName)
            const accessToken = jwt.sign(
                { "username": decoded.userName, 
                  "role": decoded.role
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1000s' }
            );
            return res.json({ accessToken: accessToken})
        }
    );
}

module.exports =  {handleRefreshToken}