const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();


router.get('/:user', (req, res) =>{
    //trazimo podatke za usera
    return res.status(StatusCodes.OK).json({podatci:["prvi", "drugi"]})

});

module.exports = router;