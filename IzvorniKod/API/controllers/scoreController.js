const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');
const Score = require('../models/ScoreModel');

const getAllScoresForTactic = async (req, res, next)=>{
    try{
        let result1 = await Score.getAllScoresForTacticWithId(req.body.tactic.id);
        return res.status(StatusCodes.OK).json({scores: result1});
    } catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti sve scorove.'});
    }
}

const addNewNewScore = async (req, res, next)=>{

    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user" || result.podatci[5] == "trener"){

        try{
            let currentTime = await Score.getScoresForTacticAndUser(req.body.score.userId, req.body.score.tacticId);
            console.log(currentTime)
            if(currentTime != undefined && currentTime > req.body.score.time){
                await Score.removeScoreForUserAndTactic(req.body.score.userId, req.body.score.tacticId);
                let score = new Score(req.body.score.userId, req.body.score.tacticId, req.body.score.time);
                await score.persist()
            } else if(currentTime == undefined){
                let score = new Score(req.body.score.userId, req.body.score.tacticId, req.body.score.time);
                await score.persist()
            } 
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati score.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati score.'});
    }
}

module.exports = {getAllScoresForTactic, addNewNewScore};
