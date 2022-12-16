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
            let tactic = new DailyTactics(req.body.tactic.title, result.podatci[0]);
            let currentMaxId = await DailyTactics.getMaxId();
            tactic.id = currentMaxId+1;

            console.log(req.body.tactic.moves)
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

const updateTactic = async (req, res, next)=>{

    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener"){

        try{
            let tactic = new DailyTactics(req.body.tactic.title, result.podatci[0]);
            let currentMaxId = await DailyTactics.getMaxId();
            tactic.id = currentMaxId+1;

            console.log(req.body.tactic.moves)
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

module.exports = {addNewTactic};