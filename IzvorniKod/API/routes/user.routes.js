const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/trainers', userController.getAllTrainers);
router.get('/userDataId', userController.getUserInfoById);
router.get('/', userController.getUserInfo );


module.exports = router;