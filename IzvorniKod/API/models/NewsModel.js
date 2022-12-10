const db = require('../db/index');

module.exports = class News{

    constructor(trainer, title, content){
        this.id = undefined;
        this.trainer = trainer;
        this.title = title;
        this.content = content;
        this.showing = 1;
    }

    static async getAllTrainerNews(){
        let results = await dbGetAllTrainerNews();

        if(results?.length != 0){
            let allNews = [];

            for(let i = 0; i < results.length; i++){
                let temp = new News(results[i].trainer_id, results[i].title, results[i].content);
                temp.id = results[i].id;
                temp.showing = results[i].showing;
                allNews[i] = temp;
            }
            return allNews;
        }

        return undefined;
    }

    static async getNewsById(newsId){
        let results = await dbGetNewsById(newsId);

        if(results?.length == 1){
            let news = new News(results[0].trainer_id, results[0].title, results[0].content);
            news.id = results[0].id;
            news.showing = results[0].showing;
            return news;
        }
        return undefined;
    }

    async updateNews(){
        await dbUpdateNews(this);
    }

    async persist(){
        try{
            let newsId = await dbNewNews(this);
            this.id = newsId;
        }catch(err){
            console.log("ERROR persisting news data: " + JSON.stringify(this));
            throw err;
        }
    }
}

dbNewNews = async(news) =>{
    const sql = "insert into news (trainer_id, title, content, showing) values ('"+ news.trainer+"', '"+ news.title+"', '"+ 
                news.content+"', '"+ news.showing+"') returning id";

    try {
        const result = await db.query(sql, []);
        return result.rows[0].id;
    } catch (err) {
        console.log(err);
            throw err;
    }
}

dbUpdateNews = async(news) =>{
    const sql = "update news set trainer_id = '"+ news.trainer+"', title = '"+ news.title+"', content = '"+ news.content+"', showing = '"+ 
                    news.showing+"' where id = '"+ news.id+"'";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err;
    }                   
}

dbGetNewsById = async(id) =>{
    const sql = "select * from news where id = '"+ id+"'";

    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}

dbGetAllTrainerNews = async() =>{
    const sql = "select * from news";
    
    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}