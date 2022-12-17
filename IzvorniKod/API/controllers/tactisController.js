const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');
const DailyTactics = require('../models/DailyTacticsModel');

const addNewTactic = async (req, res, next)=>{

    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener"){

        try{
            let tactic = new DailyTactics(req.body.tactic.title, result.podatci[0], req.body.tactic.content);
            let currentMaxId = await DailyTactics.getMaxId();
            tactic.id = currentMaxId+1;

            tactic.moves = req.body.tactic.moves;
            await tactic.saveMoves();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati taktiku.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati taktiku.'});
    }
}

const editTactic = async (req, res, next)=>{
    let result = await userInfo.getUserInfo(req, res);
    console.log(result + "ee")
    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener"){

        try{
            let result1 = await DailyTactics.getTacticById(req.body.tactic.id);
            if(result1 == 0){
                return res.status(StatusCodes.BAD_REQUEST).json({'error':'Taktika ne postoji.'});
            }
            let tactic = new DailyTactics(req.body.tactic.title, result.podatci[0], req.body.tactic.content);
            tactic.showing = req.body.tactic.showing;
            tactic.id = parseInt(req.body.tactic.id);
            tactic.moves = req.body.tactic.moves;
            await tactic.editTactic();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu promjeniti taktiku.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati taktiku.'});
    }
}

const getAllTactics = async (req, res, next)=>{

        try{
            let result1 = await DailyTactics.getAllTactics();
            return res.status(StatusCodes.OK).json({tactics: result1});
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti sve taktike.'});
        }
    
}



module.exports = {addNewTactic, editTactic, getAllTactics};