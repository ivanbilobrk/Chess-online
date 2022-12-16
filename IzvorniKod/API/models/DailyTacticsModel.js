const db = require('../db/index');

module.exports = class DailyTactics{

    //kostruktor svakog korisnika
    constructor(title, trainer_id){
       this.id = undefined,
       this.showing = 1,
       this.moves = [],
       this.title = title,
       this.trainer_id = trainer_id
    }

    static async getMaxId(){
        let result = await dbGetMaxId();

        if(result[0].id == null){
            return -1;
        } else {
            return parseInt(result[0].id);
        }
    }


    async saveMoves(){
        this.moves.forEach(async (el)=>{
            await dbSaveMove(el, this.id, this.title, this.trainer_id, this.showing);
        })
    }

    async editTactic(){
        await dbRemoveAllMoves(this.id);
        await this.saveMoves();
    }
}

dbRemoveAllMoves = async (id) =>{
    const sql = "delete from dailyTactics where id = '" + id + "'";
    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}

dbSaveMove = async (fen, id, title, trainer, showing) =>{
    const sql = "insert into dailyTactics (id, title, trainer_id, fen, showing) values ('" +
    id + "', '" + title + "', '" + trainer + "', '" + fen + "', '"+ showing + "')"
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }

}

dbGetMaxId = async () =>{
    const sql = `select max(id) as id from dailyTactics`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }

}




