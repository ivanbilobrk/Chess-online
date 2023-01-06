const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/', scoreController.getAllScoresForTactic);
router.get('/', scoreController.getAllScores);

module.exports = router;