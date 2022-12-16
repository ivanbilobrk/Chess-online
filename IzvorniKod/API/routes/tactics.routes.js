const express = require('express');
const router = express.Router();
const tacticController = require('../controllers/tactisController');

router.post('/add', tacticController.addNewTactic);

module.exports = router;