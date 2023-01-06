const express = require('express');
const router = express.Router();
const tacticController = require('../controllers/tactisController');

router.get('/',tacticController.getAllTactics);

module.exports = router;