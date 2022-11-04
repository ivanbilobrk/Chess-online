const db = require('../db/index');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel')
const customError = require('../errors/customError')
const { check, validationResult } = require ('express-validator');
const { NOT_EXTENDED } = require('http-status');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
dotenv.config({ path: '../.env' })
const env = process.env;

const handleNewUser = async (req, res) => {

    const errors = validationResult(req) 
    if(!errors.isEmpty()){
        return res.status(StatusCodes.BAD_REQUEST).json({erros: errors.array()});
    }
    
    const{name, surName, userName, email, pwd} = req.body;
    let user = await User.fetchByUsername(userName);  
    let userEmail = await User.fetchByEmail(email);
   
    //ako korisnik postoji, javi grešku
    try {
        if (user.id !== undefined) {
            throw new customError('User name je već iskorišten!', StatusCodes.CONFLICT);
        } else if (userEmail.id !== undefined) {
            throw new customError('E-mail je već iskorišten!', StatusCodes.CONFLICT);
        }
    } catch(err){
        res.status(error.status).json({'error': err})
    }

    //registriraj novog korisnika

    const pwdHash = await bcrypt.hash(pwd, 10);
  
    try{
        user = new User(name, surName, userName, email, pwdHash);
        await user.persist();

    } catch(error){
        throw new customError("User se ne može stvoriti", StatusCodes.INTERNAL_SERVER_ERROR);
    }
   
}

module.exports =  {handleNewUser}