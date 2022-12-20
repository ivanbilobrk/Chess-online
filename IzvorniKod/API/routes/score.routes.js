const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/', scoreController.getAllScoresForTactic);

module.exports = router;