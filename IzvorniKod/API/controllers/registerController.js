const db = require('../db/index');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel')
const customError = require('../errors/customError')
const { check, validationResult } = require ('express-validator');
const { NOT_EXTENDED } = require('http-status');
const { StatusCodes } = require('http-status-codes');


const handleNewUser = async (req, res) => {

    const errors = validationResult(req) 
    if(!errors.isEmpty()){
        return res.status(StatusCodes.BAD_REQUEST).json({erros: errors.array()});
    }
    
    const{name, surName, userName, email, pwd} = req.body;
    //ako korisnik postoji, javi grešku
    try {
        
        let user = await User.fetchByUsername(userName);  
        let userEmail = await User.fetchByEmail(email);
        if (user.id !== undefined) {
            throw new customError('User name je već iskorišten!', StatusCodes.CONFLICT);
        } else if (userEmail.id !== undefined) {
            throw new customError('E-mail je već iskorišten!', StatusCodes.CONFLICT);
        }
    } catch(err){
        return res.status(err.status).json({'error': err.message})
    }

    //registriraj novog korisnika

    const pwdHash = await bcrypt.hash(pwd, 10);
  
    try{
        user = new User(name, surName, userName, email, pwdHash);
        await user.persist();
        res.status(StatusCodes.OK).json({'message':'user successfully created'})
    } catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'error': 'User se ne može stvoriti.'})
    }
   
}

module.exports =  {handleNewUser}