const userInfo = require('../helpFunctions/userInfo');
const Membership = require('../models/TransactionModel');
const { StatusCodes } = require('http-status-codes');

const getAllTransactions = async(req, res)=>{

    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin"){
        try{
            let allTrans = await Membership.getAllTransactions();
            return res.status(StatusCodes.OK).json({allMemberships: allTrans});
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati novost.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati novost.'});
    }
}

const getAllTransactionsForUser = async (req, res) =>{
    let result = await userInfo.getUserInfo(req, res);
console.log(result);
    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user" || result.podatci[5] == "admin" || result.podatci[5] == "trener"){

        try{
            let allUserTrans = await Membership.getTransactionsForUser(result.podatci[0]);
            return res.status(StatusCodes.OK).json({allUserMemberships: allUserTrans});
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti novost, moguće je da uplata za navedeni mjesec već postoji.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti novost.'});
    }
}

const addNewTransaction = async (req, res)=>{
    let result = await userInfo.getUserInfo(req, res);
    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user"){

        try{
            let membership = new Membership(result.podatci[0], req.body.membership.month, req.body.membership.isPaid);
            await membership.persist();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati novost.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati novost.'});
    }
}

module.exports = {getAllTransactions, getAllTransactionsForUser, addNewTransaction}