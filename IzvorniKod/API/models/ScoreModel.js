const db = require('../db/index');
const User = require('./UserModel');

module.exports = class Score{

    constructor(member_id, tactic_id, solvingtime){
        this.member_id = member_id,
        this.tactic_id = tactic_id,
        this.solvingtime = solvingtime
    }

    static async getAllScoresForTacticWithId(id){
        let results = await dbGetAllScoresForTactic(id);

        if(results?.length != 0){
            let allScores = [];

            for(let i = 0; i < results.length; i++){
                let userTemp = await User.fetchByUserId(results[i].member_id)
                let oneScore = {
                    user : userTemp.username,
                    time : results[i].solvingtime
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

    static async getScoresForTacticAndUser (member, tactic){
        let results = await dbGetScoreForTacticAndUser(member, tactic);
        if(results?.length != 0){
            return results[0].solvingtime;
        }
        return undefined;
    }

    async persist(){
        try{
            await dbNewScore(this);
        }catch(err){
            console.log("ERROR persisting news data: " + JSON.stringify(this));
            throw err;
        }
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
    const sql = "insert into score (member_id, tactic_id, solvingtime) values ( '"+ values.member_id+"', '"+ values.tactic_id+"', '"+ values.solvingtime+"' )"; 

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