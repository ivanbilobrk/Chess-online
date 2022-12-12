const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingsController');

router.get('/', trainingController.getAllTrainings);
router.post('/addTraining', trainingController.addNewTraining);
router.post('/updateTraining', trainingController.updateExistingTraining);
router.post('/deleteTraining', trainingController.deleteExistingTraining);
router.post('/trainingSubscription', trainingController.subscribeToTraining);
router.post('/trainingSubscriptionRemoval', trainingController.cancelTrainingSubscription);

module.exports = router;