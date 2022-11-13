const db = require('../db/index');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes');


const getUserInfo = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized
    const refreshToken = cookies.jwt;

    //find the user with given refreshtoken in the database if it doesnt exist ->forbidden 403
    const foundUser = await User.fetchByRefreshToken(refreshToken);
    if (foundUser.id === undefined) return res.sendStatus(403); //Forbidden


    const role = foundUser.role;
    if (role == "admin"){
        //return res.status(StatusCodes.OK)
    } else if (role == "trener"){
        //return res.status(StatusCodes.OK)
    }

    return res.status(StatusCodes.OK).json({
        podatci:
        [foundUser.id, foundUser.username, foundUser.email, 
        foundUser.name, foundUser.surname, foundUser.role]
    });

}


module.exports = { getUserInfo }