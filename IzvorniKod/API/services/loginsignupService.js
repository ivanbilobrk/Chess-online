const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel')
const {customError} = require('../errors/customError')
const { StatusCodes } = require('http-status-codes');

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
    const salt = await bcrypt.genSalt(10);
    const pwdHash = await bcrypt.hash(pwd, salt);

    try{
        user = new User(name, surName, userName, email, pwdHash);
        await user.persist();

        const token = jwt.sign(
            { id: user.id, name: user.name, surName: user.surname ,userName: user.username, email: user.email, role: user.role},
            config.jwTokenKey,
            {
              expiresIn: config.token_expiration,
            });

        return token;

    } catch(error){
        throw new customError('Neuspjelo stvaranje korisnika.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={register}