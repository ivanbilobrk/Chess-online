const db = require('../db/index');
const jwt = require('jsonwebtoken');
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


module.exports = { getUserInfo }