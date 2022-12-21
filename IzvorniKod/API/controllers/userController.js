const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');


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

const getUserInfoById = async (req, res) =>{
    let result = await User.getUserInfoById(req.body.user.id);
    return res.status(StatusCodes.OK).json(result);
}

const getAllTrainers = async (req, res) =>{
    let result = await User.getAllTrainers();
    return res.status(StatusCodes.OK).json(result);
}


module.exports = { getUserInfo, getUserInfoById, getAllTrainers }