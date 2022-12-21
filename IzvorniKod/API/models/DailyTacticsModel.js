const db = require('../db/index');

module.exports = class DailyTactics{

    //kostruktor svakog korisnika
    constructor(title, trainer_id, content){
       this.content = content;
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

    static async getTacticById(id){
        return await dbGetTacticById(id);
    }

    static async getAllTactics(){
        const map1 = new Map();

        let result = await dbGetAllTactics();
        result.forEach((el)=>{
            let temp = map1.get(el.id);
            if(temp == null || temp == undefined){
                map1.set(el.id, {title: el.title, trainer: el.trainer_id, moves: [{fen: el.fen, index: el.index}], content: el.content, showing: el.showing})
            } else {
                let tempArray = [...map1.get(el.id).moves, {fen: el.fen, index: el.index}];
                map1.set(el.id, {title: el.title, trainer: el.trainer_id, moves: tempArray, content: el.content, showing: el.showing})
            }
        });

        let sorted = [];

        let index = 0;
        map1.forEach((value, key)=>{
            sorted[index] = {
                title: value.title,
                id: key,
                trainer_id: value.trainer,
                showing : value.showing,
                content: value.content,
                moves: value.moves
            }
            sorted[index].moves = sorted[index].moves.sort(function(a,b){return a.index - b.index})
            index++;
        });
        
        return sorted;

    }


    async saveMoves(){
        this.moves.forEach(async (el, index)=>{
            await dbSaveMove(el, this.id, this.title, this.trainer_id, this.showing, this.content, index);
        })
    }

    async editTactic(){
        await dbRemoveAllMoves(this.id);
        await this.saveMoves();
    }
}

dbGetAllTactics = async () =>{
    const sql = "select * from dailyTactics"
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
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

dbSaveMove = async (fen, id, title, trainer, showing, content, index) =>{
    const sql = "insert into dailyTactics (id, title, trainer_id, fen, showing, content, index) values ('" +
    id + "', '" + title + "', '" + trainer + "', '" + fen + "', '"+ showing + "', '"+ content + "', '"+ index + "')"
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }

}

dbGetTacticById = async(id) =>{
    const sql = "select * from dailyTactics where id = "+id;
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




