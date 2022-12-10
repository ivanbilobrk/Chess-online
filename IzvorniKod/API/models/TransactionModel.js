const db = require('../db/index');

module.exports = class Membership{

    constructor(userId, month, isPaid){
        this.userId = userId;
        this.month = month;
        this.isPaid = isPaid;
    }
    
    static getTransactionsForUser = async(id)=>{
        let transactions = await dbGetAllTransactionsForUser(id);
        console.log(transactions);
        let result = [];
        if(transactions?.length != 0){
            for(let i = 0; i < transactions.length; i++){
                let newMembership = new Membership(transactions[i].member_id, transactions[i].month, transactions[i].ispaid);
                result[i] = newMembership;
            }
            console.log(result);
            return result;
        }
        return undefined;
    }

    async persist(){
        try{
            await dbAddNewTrans(this);
        } catch(err){
            console.log("ERROR persisting membership: " + JSON.stringify(this));
            throw err;
        }
    }


    static getAllTransactions = async()=>{
        let transactions = await dbGetAllTransactions();
        
        let result = [];
        if(transactions?.length != 0){
            for(let i = 0; i < transactions.length; i++){
                let newMembership = new Membership(transactions[i].member_id, transactions[i].month, transactions[i].ispaid);
                result[i] = newMembership;
            }
            return result;
        }
        return undefined;
    }

}
const dbAddNewTrans = async (membership)=>{
    const sql = "insert into membership values('"+membership.userId+"', '"+membership.month+"', '"+membership.isPaid+"') "

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbGetAllTransactions = async ()=>{
    const sql = "select * from membership";

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

const dbGetAllTransactionsForUser = async (id)=>{
    const sql = "select * from membership join users on member_id = id where member_id =" + id;

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}