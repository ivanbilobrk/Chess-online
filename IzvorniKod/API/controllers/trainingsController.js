const userInfo = require('../helpFunctions/userInfo');
const Training = require('../models/TrainingModel');
const { StatusCodes } = require('http-status-codes');


const getAllTrainings = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else {
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

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {
        try {
            let allUserTrains = await Training.getAllScheduledTrainings(result.podatci[0]);
            return res.status(StatusCodes.OK).json({allUserTrainings: allUserTrains});
           
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti prijavljene treninge.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti prijavljene treninge ovog usera.'});
    }
}


const addNewTraining = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try {
            let training = new Training(result.podatci[0], req.body.training.trainingStart, req.body.training.trainingDuration);
            await training.persist();
            return res.sendStatus(StatusCodes.OK);
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati trening.'});
    }
}


const updateExistingTraining = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try {
            let currentTrainerId = (await Training.getTrainingById(req.body.training.id)).trainerId;

            if(currentTrainerId != result.podatci[0] && result.podatci[5] != "admin"){
                return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za mijenjati trening.'})
            }

            let training = new Training(currentTrainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            training.id = req.body.training.id;
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

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try {
            let currentTrainerId = (await Training.getTrainingById(req.body.training.id)).trainerId;

            if(currentTrainerId != result.podatci[0] && result.podatci[5] != "admin"){
                return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za brisati trening.'})
            }

            let training = new Training(currentTrainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.id = req.body.training.id;
            training.showing = req.body.training.showing;
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

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {

        try {
            let currentTrainerId = (await Training.getTrainingById(req.body.training.id)).trainerId;

            let training = new Training(currentTrainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            training.id = req.body.training.id;
            await training.signupForTraining(result.podatci[0]);
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu se prijaviti na trening.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za prijaviti se na trening.'});
    }
}


const cancelTrainingSubscription = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {

        try {
            let currentTrainerId = (await Training.getTrainingById(req.body.training.id)).trainerId;

            let training = new Training(currentTrainerId, req.body.training.trainingStart, req.body.training.trainingDuration);
            training.showing = req.body.training.showing;
            training.id = req.body.training.id;
            await training.cancelTraining();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu se odjaviti s treninga.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za odjaviti se s treninga.'});
    }
}


module.exports = {getAllTrainings, getAllScheduledTrainings, addNewTraining, updateExistingTraining,
                  deleteExistingTraining, signupForTraining, cancelTrainingSubscription};
