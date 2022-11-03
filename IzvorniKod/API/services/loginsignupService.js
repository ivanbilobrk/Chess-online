const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel')
const {customError} = require('../errors/customError')
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();


//nepotrebno - izbriši
async function register(name, surName, userName, email, pwd){

    let user = await User.fetchByUsername(userName);
    let userEmail = await User.fetchByEmail(email);
        
    //ako korisnik postoji, javi grešku
    if (user.id !== undefined) {
        throw new customError('User name je već iskorišten!', StatusCodes.CONFLICT);
    } else if (userEmail.id !== undefined) {
        throw new customError('E-mail je već iskorišten!', StatusCodes.CONFLICT);
    }
        
    //registriraj novog korisnika
    const pwdHash = await bcrypt.hash(pwd, 10);

    try{
        user = new User(name, surName, userName, email, pwdHash);
        await user.persist();

        const refreshToken = jwt.sign(
            { userName: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' });

        return refreshToken;

    } catch(error){
        throw new customError('Neuspjelo stvaranje korisnika.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { register };