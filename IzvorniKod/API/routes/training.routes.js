const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingsController');

router.get('/', trainingController.getAllTrainings);
router.get('/scheduled', trainingController.getAllScheduledTrainings);
router.post('/add', trainingController.addNewTraining);
router.post('/update', trainingController.updateExistingTraining);
router.post('/delete', trainingController.deleteExistingTraining);
router.post('/signup', trainingController.signupForTraining);
router.post('/cancel', trainingController.cancelTrainingSubscription);

module.exports = router;
