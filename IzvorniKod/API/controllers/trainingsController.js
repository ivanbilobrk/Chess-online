const userInfo = require('../helpFunctions/userInfo');
const Training = require('../models/TrainingModel');
const { StatusCodes } = require('http-status-codes');

const getAllTrainings = async(req, res) => {

    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {

    }
}

const addNewTraining = async(req, res) => {

}

const updateExistingTraining = async(req, res) => {
    
}

const deleteExistingTraining = async(req, res) => {
    
}

const subscribeToTraining = async(req, res) => {
    
}

const cancelTrainingSubscription = async(req, res) => {
    
}

module.exports = {getAllTrainings, addNewTraining, updateExistingTraining, deleteExistingTraining, subscribeToTraining, cancelTrainingSubscription};