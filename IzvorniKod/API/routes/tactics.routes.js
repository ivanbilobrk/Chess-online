const express = require('express');
const router = express.Router();
const tacticController = require('../controllers/tactisController');

router.post('/add', tacticController.addNewTactic);
router.post('/edit', tacticController.editTactic);

module.exports = router;