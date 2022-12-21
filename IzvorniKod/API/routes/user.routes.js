const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:user', userController.getUserInfo );

router.post('/:user/:u', userController.updateProfile );
router.post('/:user/:zabrani', userController.zabraniP );
router.post('/:user/:o', userController.onemoguciP );

router.get('/:user/:r', userController.getAllMembers );

module.exports = router;