const express = require('express');
const router = express.Router();
const { check, validationResult } = require ('express-validator');
const{ StatusCodes } = require('http-status-codes');
const {register} = require('../services/loginsignupService');
const CustomError = require('../errors/customError');
const { NOT_EXTENDED } = require('http-status');

router.post('/',[check('email').isEmail().withMessage('Krivo napisan email.'), 
                        check('name').isLength({min: 1, max: 30}).withMessage('Ime mora imati između 1 i 30 znakova'),
                        check('surName').isLength({min: 1, max: 30}).withMessage('Prezime mora imati između 1 i 30 znakova'),
                        check('userName').matches(/^[A-z][A-z0-9-_]{3,23}$/).withMessage('Krivi format user name-a'),
                        check('pwd').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/).withMessage('Krivi format lozinke')] 
                        , async(req, res, next)=>{
            const errors = validationResult(req);
    
            if(!errors.isEmpty()){
                return res.status(StatusCodes.BAD_REQUEST).json({erros: errors.array()});
            }

            const{name, surName, userName, email, pwd} = req.body;
            
            try{
                res.json(await register(name, surName, userName, email, pwd));
            }catch(error){
                console.log(error)
            }
        })


module.exports = router;