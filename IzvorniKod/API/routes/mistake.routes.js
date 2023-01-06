const express = require('express');
const router = express.Router();
const MistakeController = require('../controllers/mistakeController');

router.post('/add', MistakeController.addMistakeForTactic);
router.get('/getTrainerMistakes', MistakeController.getAllMistakesForTrainer);

module.exports = router;