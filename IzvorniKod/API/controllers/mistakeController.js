const { StatusCodes } = require('http-status-codes');
const userInfo = require('../helpFunctions/userInfo');
const Mistake = require('../models/MistakeModel');

const getAllMistakesForTrainer = async (req, res) => {
   
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "trener"){
        let trainerId = result.podatci[0];
        try{
            let result = await Mistake.getAllMistakesForTrainer(trainerId);
            res.status(StatusCodes.OK).json({mistakes: result}); 
        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti prijavljene greške za trenera.'});
        }

    }
}

const addMistakeForTactic = async (req, res)=>{

        let result = await userInfo.getUserInfo(req, res);
    
        if(result == 401){
            return res.sendStatus(401);
        } else if(result == 403){
            return res.sendStatus(403);
        } else if(result.podatci[5] == "user"){
    
            try{
                let mistake = new Mistake(result.podatci[0], req.body.mistake.trainer, req.body.mistake.tactic, req.body.mistake.description);
                await mistake.persist();
                return res.sendStatus(StatusCodes.OK);
            } catch(err){
                return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati pogrešku.'});
            }
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati pogrešku.'});
        }
 }

module.exports = { getAllMistakesForTrainer, addMistakeForTactic };
