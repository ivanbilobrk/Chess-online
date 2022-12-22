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
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti transakcije.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti transakcije.'});
    }
}

const getAllTransactionsForUser = async (req, res) =>{
    let result = await userInfo.getUserInfo(req, res);
console.log(result);
    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user"){

        try{
            let allUserTrans = await Membership.getTransactionsForUser(result.podatci[0]);
            return res.status(StatusCodes.OK).json({allUserMemberships: allUserTrans});
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti transakcije za korisnika.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti transakcije za traženog korisnika.'});
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
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati transakcije.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati transakciju.'});
    }
}

module.exports = {getAllTransactions, getAllTransactionsForUser, addNewTransaction}