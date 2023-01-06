const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');
const News = require('../models/NewsModel');


const addNewNews = async (req, res, next)=>{

    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener"){

        try{
            let news = new News(result.podatci[0], req.body.news.title, req.body.news.content);
            await news.persist();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati novost.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati novost.'});
    }
}

const updateNews = async(req, res, next) =>{
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener"){

        try{
            let currentTrainerId = (await News.getNewsById(req.body.news.id)).trainer;
            if(currentTrainerId != result.podatci[0] && result.podatci[5] != "admin"){
                return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za mijenjati novost.'})
            }

            let news = new News(currentTrainerId, req.body.news.title, req.body.news.content);
            news.showing = req.body.news.showing;
            news.id = req.body.news.id;
            await news.updateNews();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu mijenjati novost.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za mijenjati novost.'});
    }
}

const getAllNews = async(req, res, next) =>{
    try{
        let allNews = await News.getAllTrainerNews();
        console.log(allNews);
        return res.status(StatusCodes.OK).json({newsAll: allNews});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti novosti.'});
    }
}



module.exports = {addNewNews, updateNews, getAllNews};