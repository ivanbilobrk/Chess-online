const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');


const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(StatusCodes.NO_CONTENT); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.fetchByRefreshToken(refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(StatusCodes.NO_CONTENT);
    }

    // Delete refreshToken in db
    try {
        const result = await User.addRefreshToken(foundUser.username, undefined);
    } catch (error){
        console.log(error);
    }
   

    return res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }).sendStatus(StatusCodes.NO_CONTENT);
}

module.exports = { handleLogout }