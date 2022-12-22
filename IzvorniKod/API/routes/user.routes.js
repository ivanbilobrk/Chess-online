const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:user', userController.getUserInfo );
router.get('/:user/:u/:i', userController.getUserInfo3 );

router.post('/:user/:u', userController.updateProfile );
router.post('/:user/:zabrani/:u', userController.zabraniP );
router.post('/:user/:onemoguci/:o/:u', userController.onemoguciP );

router.get('/:user/:r', userController.getAllMembers );


module.exports = router;