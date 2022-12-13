const userInfo = require('../helpFunctions/userInfo');
const Training = require('../models/TrainingModel');
const { StatusCodes } = require('http-status-codes');

// MOZDA MI TREBA PROVJERA JE LI ULOGIRANI KORISNIK ADMIN ALI NISAM SIGURAN
const getAllTrainings = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin") {
        try {
            let allTrainings = await Training.getAllTrainings();
            console.log(allTrainings);
            return res.status(StatusCodes.OK).json({trainingsAll: allTrainings});
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti treninge.'});
        }
    }
}


const getAllScheduledTrainings = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {
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
    } else if(result.podatci[5] == "trener") {
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


// MORAM NEKAKO DOHVATITI TRAINING ID
const addNewTraining = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try{
            let training = new Training(result.podatci[0], req.body.training.trainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            await training.persist();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati trening.'});
    }
}


const updateExistingTraining = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try{
            // OVDJE MORAM IZMIJENJATI KOD TAKO DA DOBIJEM trainingId
            let currentTrainingId = (await Training.getTrainingById(req.body.training.trainingId)).trainingId;

            // MORAM SKONTATI STA CU ZA CURRENTTRAINERID, TJ MENI TREBA TRAINING ID
            let training = new Training(currentTrainingId, req.body.training.trainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            // training.trainingId = req.body.training.trainingId;
            await training.updateTraining();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu mijenjati trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za mijenjati trening.'});
    }
}


const deleteExistingTraining = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try{
            
            let currentTrainingId = (await Training.getTrainingById(req.body.training.trainingId)).trainingId;

            let training = new Training(currentTrainingId, req.body.training.trainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            // training.trainingId = req.body.training.trainingId;
            await training.deleteTraining();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu izbrisati trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za brisati trening.'});
    }
}


const signupForTraining = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {

        try{
            
            let currentTrainingId = (await Training.getTrainingById(req.body.training.trainingId)).trainingId;

            let training = new Training(currentTrainingId, req.body.training.trainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            // training.trainingId = req.body.training.trainingId;
            await training.signupForTraining(result);
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu izbrisati trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za brisati trening.'});
    }
}


const cancelTrainingSubscription = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401){
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {

        try{
            
            let currentTrainingId = (await Training.getTrainingById(req.body.training.trainingId)).trainingId;

            let training = new Training(currentTrainingId, req.body.training.trainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            // training.trainingId = req.body.training.trainingId;
            await training.cancelTraining();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu se odjaviti s trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za odjaviti se s trening.'});
    }
}


module.exports = {getAllTrainings, getAllScheduledTrainings, getAllTrainingsForTrainer, addNewTraining, updateExistingTraining,
                  deleteExistingTraining, signupForTraining, cancelTrainingSubscription};