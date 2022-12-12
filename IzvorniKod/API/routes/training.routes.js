const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingsController');

router.get('/', trainingController.getAllTrainings);
router.get('/userTrainings', trainingController.getAllScheduledTrainings);
router.get('/trainerTrainings', trainingController.getAllTrainingsForTrainer);
router.post('/addTraining', trainingController.addNewTraining);
router.post('/updateTraining', trainingController.updateExistingTraining);
router.post('/deleteTraining', trainingController.deleteExistingTraining);
router.post('/signupForTraining', trainingController.signupForTraining);
router.post('/cancelTraining', trainingController.cancelTrainingSubscription);

module.exports = router;