const db = require('../db/index');
const User = require('./UserModel');

module.exports = class Score{

    constructor(member_id, tactic_id, solvingtime, showing){
        this.member_id = member_id,
        this.tactic_id = tactic_id,
        this.solvingtime = solvingtime,
        this.showing = showing
    }

    static async getAllScores(){
        return await dbGetAllScores();
    }

    static async getAllScoresForTacticWithId(id){
        let results = await dbGetAllScoresForTactic(id);

        if(results?.length != 0){
            let allScores = [];

            for(let i = 0; i < results.length; i++){
                let userTemp = await User.fetchByUserId(results[i].member_id)
                let oneScore = {
                    user : userTemp.username,
                    time : results[i].solvingtime,
                    showing: results[i].showing
                }
                allScores[i] = oneScore;
            }
            return allScores;
        }

        return undefined;
    }

    static async removeScoreForUserAndTactic (member, tactic){
        await dbRemoveScoreForTacticAndUser(member, tactic);
    }

    async addMovesForTactic(moves){
        moves.forEach(async (el, index)=>{
            await dbInsertUserMove(this.member_id, this.tactic_id, index, el)
        })
    }

    static async removeAllUserMovesForTactic (user, tactic){
        await dbRemoveAllUserMovesForTactic(user, tactic);
    }

    static async getScoresForTacticAndUser (member, tactic){
        let results = await dbGetScoreForTacticAndUser(member, tactic);
        if(results?.length != 0){
            results = results.sort(function(a,b){ return a.solvingtime < b.solvingtime});
            return results[0];
        }
        return undefined;
    }

    static async getAllMovesForUserAndTactic(user, tactic){
        let result = await dbGetAllMovesForUserAndTactic(user, tactic);
        let moves = []

        result.sort(function(a,b){
            return a.index < b.index;
        })

        result.forEach((el, index)=>{
            moves[index] = el.fen;
        }) 
        return moves;
    }

    static async removeScore(user, tactic){
        await dbUpdateShowingToFalse(user, tactic);
    }

    static async showScore(user, tactic){
        await dbUpdateShowingToTrue(user, tactic);
    }

    async persist(){
        try{
            await dbNewScore(this);
        }catch(err){
            console.log("ERROR persisting score data: " + JSON.stringify(this));
            throw err;
        }
    }
}

dbGetAllScores = async () =>{
    const sql = "select users.username as user, sum(solvingtime) as time from score join users on score.member_id = users.id where showing = 1 group by member_id, users.username";
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbUpdateShowingToTrue = async (user, tactic) =>{
    const sql = "update score set showing = 1 where member_id = "+user+" and tactic_id = "+tactic;
    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbUpdateShowingToFalse = async (user, tactic) =>{
    const sql = "update score set showing = 0 where member_id = "+user+" and tactic_id = "+tactic;
    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbGetAllMovesForUserAndTactic = async (user, tactic) =>{
    const sql = "select * from scoremoves where member_id = "+user +" and tactic_id = "+tactic;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbRemoveAllUserMovesForTactic = async (user, tactic) =>{
    const sql = "delete from scoremoves where member_id = "+user+" and tactic_id = "+tactic;
    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbUpdateScore = async (values) =>{
    const sql = "delete from score where member_id = "+values.member_id +" and tactic_id = "+values.tactic_id+" ";
    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }

    await dbNewScore(values);
}

dbInsertUserMove = async(member_id, tactic_id, index, el)=>{
    const sql = "insert into scoremoves values ('"+ member_id+"', '"+ tactic_id+"', '"+ index+"', '"+ el+"')";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }

}


dbRemoveScoreForTacticAndUser = async (member, tactic) =>{
    const sql = "delete from score where member_id = '"+ member+"' and tactic_id = '"+ tactic+"'";
    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbGetScoreForTacticAndUser = async (member, tactic) =>{
    const sql = "select * from score where member_id = '"+ member+"' and tactic_id = '"+ tactic+"'";
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbNewScore = async (values) =>{
    const sql = "insert into score (member_id, tactic_id, solvingtime, showing) values ( '"+ values.member_id+"', '"+ values.tactic_id+"', '"+ values.solvingtime+"' , '"+ values.showing+"')"; 

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbGetAllScoresForTactic = async (id) =>{
    const sql = "select * from score where tactic_id = "+id;

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
            throw err;
    }

}