const db = require('../db/index');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');
//const { StatusCodes } = require('http-status-codes');
//const userInfo = require('../helpFunctions/userInfo');
const News = require('../models/NewsModel');
//const userInfo = require('../helpFunctions/userInfo');
const userInfo2 = require('../helpFunctions/userInfo2');
const getUserInfo = async (req, res) => {
   
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else {
        return res.status(StatusCodes.OK).json(result);
    }
}







   
    
    
  
    
    const updateProfile = async(req, res, next) =>{
        let result = await userInfo2.getUserInfo2(req, res);
    
        if(result == 401){
            return res.sendStatus(401);
        } else if(result == 403){
            return res.sendStatus(403);
        } else {
    
            try{
                
    
                let user = new User(  req.body.user.name, req.body.user.surname, req.body.user.username,req.body.user.email, result.podaci[6]);
                user.id = req.body.user.id;
                user.role=result.podaci[5];
                user.refreshToken = req.body.user.refreshToken;
                await user.updateProfile();
                return res.sendStatus(StatusCodes.OK);
            } catch(err){
                return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu mijenjati novost.'});
            }
        } 
    }
    
  
    
    


    


module.exports = { getUserInfo,  updateProfile}