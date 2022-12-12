const userInfo = require('../helpFunctions/userInfo');
const Training = require('../models/TrainingModel');
const { StatusCodes } = require('http-status-codes');

// MSM DA MI TREBA PROVJERA JE LI ULOGIRANI KORISNIK ADMIN ALI NISAM SIGURAN
const getAllTrainings = async(req, res) => {
    try {
        let allTrainings = await Training.getAllTrainings();
        console.log(allTrainings);
        return res.status(StatusCodes.OK).json({trainingsAll: allTrainings});
    } catch(err) {
        return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti treninge.'});
    }
}


const getAllScheduledTrainings = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user"){
        try{
            let allUserTrains = await Training.getAllScheduledTrainings(result.podatci[0]);
            return res.status(StatusCodes.OK).json({allUserTrainings: allUserTrains});
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti prijavljene treninge.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti prijavljene treninge ovog usera.'});
    }
}


const getAllTrainingsForTrainer = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "trener"){
        try{
            let allUserTrains = await Training.getTrainingsForTrainer(result.podatci[0]);
            return res.status(StatusCodes.OK).json({allUserTrainings: allUserTrains});
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti treninge.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti treninge.'});
    }
}


const addNewTraining = async(req, res) => {

}


const updateExistingTraining = async(req, res) => {
    
}


const deleteExistingTraining = async(req, res) => {
    
}


const signupForTraining = async(req, res) => {
    
}


const cancelTrainingSubscription = async(req, res) => {
    
}


module.exports = {getAllTrainings, getAllScheduledTrainings, getAllTrainingsForTrainer, addNewTraining, updateExistingTraining,
                  deleteExistingTraining, signupForTraining, cancelTrainingSubscription};