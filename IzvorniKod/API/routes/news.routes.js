const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.getAllNews);

router.post('/add', newsController.addNewNews);

router.post('/update', newsController.updateNews);

module.exports = router;