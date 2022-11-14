const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const{name, surName, userName, email, pwd} = req.body;
    
    const foundUser = await User.fetchByUsername(userName);
    if (foundUser.id === undefined) return res.status(StatusCodes.BAD_REQUEST).json({'error':'User ne postoji'}); //Unauthorized 

    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.pwdHash);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.userName,
              "role":foundUser.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1000s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.userName,
                "role": foundUser.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in the database, add the refreshToken column to the database 
        try {
            const result = await User.addRefreshToken(userName, refreshToken);
        } catch (error){
            console.log(error);
        }

        return res.cookie('jwt', refreshToken, { httpOnly: true,secure: true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000 }).json({accessToken});
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Kriva lozinka'});
    }
}

module.exports =  {handleLogin}