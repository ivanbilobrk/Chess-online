const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/', scoreController.addNewNewScore);

module.exports = router;