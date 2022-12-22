const db = require('../db/index');

module.exports = class Mistake{

    constructor(user, trainer, tactic, desc){
        this.user = user;
        this.trainer = trainer;
        this.tactic = tactic;
        this.desc = desc;
        this.showing = 1
    }

    async persist(){
        await dbAddNewMistake(this);
    }

    static async removeAllMistakesForTactic(tactic){
        await dbRemoveAllMistakesForTactic();
    }

    static async getAllMistakesForTrainer(trainer){
        let mistakes = await dbGetAllMistakesForTrainer(trainer);
        return mistakes;
    }

}

dbRemoveAllMistakesForTactic = async(tactic) => {
    const sql = "delete from reportedmistake where tactic_id = "+tactic;
    try {
        await db.query(sql, []);
        result.rows; 
    } catch (err){
        console.log(err);
        throw err
    }
}

dbAddNewMistake = async (values) => {
    const sql = "insert into reportedmistake values ('" + values.user + "', '" + values.tactic + "', '" + values.trainer + "', '" + values.desc + "', '" + values.showing + "') ";
    console.log(sql)

    try {
        await db.query(sql, []);
    } catch (err){
        console.log(err);
        throw err
    }
}

dbGetAllMistakesForTrainer = async(trainer) =>{
    const sql = "select * from reportedmistake where trainer_id = "+trainer;
    try {
        let result = await db.query(sql, []);
        return result.rows; 
    } catch (err){
        console.log(err);
        throw err
    }

}