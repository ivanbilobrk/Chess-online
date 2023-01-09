const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');
const userInfo3 = require('../helpFunctions/userInfo3');
//const { StatusCodes } = require('http-status-codes');
//const userInfo = require('../helpFunctions/userInfo');
const News = require('../models/NewsModel');
//const userInfo = require('../helpFunctions/userInfo');
const userInfo2 = require('../helpFunctions/userInfo2');
const getUserInfo = async (req, res) => {
   
    let result = await userInfo.getUserInfo(req, res);
console.log(result);
    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else {
        return res.status(StatusCodes.OK).json(result);
    }
}

const getUserInfo3 = async (req, res) => {
   
    let result = await userInfo3.getUserInfo3(req, res);
console.log(result);
    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else {
        return res.status(StatusCodes.OK).json(result);
    }
}

const getUserInfoById = async (req, res) =>{
    let result = await User.getUserInfoById(req.body.user.id);
    return res.status(StatusCodes.OK).json(result);
}

const getAllTrainers = async (req, res) =>{
    let result = await User.getAllTrainers();
    return res.status(StatusCodes.OK).json(result);
}


/*
const getUserInfo2 = async (req, res) => {
   
    let result = await userInfo2.getUserInfo2(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else {
        return res.status(StatusCodes.OK).json(result);
    }
}*/


const getAllMembers = async (req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else {
        try {
            let allMembers = await User.getAllMembers();
            console.log(allMembers);
            return res.status(StatusCodes.OK).json({membersAll: allMembers});
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti treninge.'});
        }
    }

    
}

const zabraniP= async(req, res, next) =>{
//console.log(req.body.user);
//console.log(req.body.user.id);
   
            
console.log(req.body.user.id);
          let snap=  await User.zabraniP( req.body.user.id);
            //console.log(snap);
            return res.sendStatus(StatusCodes.OK);
      
    } 



const onemoguciP = async(req, res, next) =>{
    //console.log(req);
   await User.onemoguciP(req.body.user.id);
    return res.sendStatus(StatusCodes.OK);
}


const omoguciP = async(req, res, next) =>{
    //console.log(req);
   await User.omoguciP(req.body.user.id);
    return res.sendStatus(StatusCodes.OK);
}

const odobriP = async(req, res, next) =>{
    //console.log(req);
   await User.odobriP(req.body.user.id);
    return res.sendStatus(StatusCodes.OK);
}

   
   
    
    
  
    
    const updateProfile = async(req, res, next) =>{
        let result = await userInfo2.getUserInfo2(req, res);
    console.log(result);
    console.log(req.body.user);
        if(result == 401){
            return res.sendStatus(401);
        } else if(result == 403){
            return res.sendStatus(403);
        } else {
    
            try{
                
    console.log(req.body.user.name);
               /* let newuser = new User(  req.body.user.name, req.body.user.surname, req.body.user.username,req.body.user.email, result.podaci[6]);
                newuser.id = req.body.user.id;
                newuser.role=result.podaci[5];
                newuser.showing=1;
                console.log(req.body.user.name);
                newuser.refreshToken = req.body.user.refreshToken;
                console.log(newuser);*/
              let snap=  await User.updateProfile(req.body.user.name, req.body.user.surname,req.body.user.username, req.body.user.email, req.body.user.id);
                console.log(snap);
                return res.sendStatus(StatusCodes.OK);
            } catch(err){
                return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu mijenjati novost.'});
            }
        } 
    }
    
  
    
    


    


module.exports = { getUserInfo,getUserInfo3, getAllMembers, updateProfile, zabraniP, onemoguciP, odobriP, getUserInfoById, getAllTrainers};
