const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>{
    res.json({userData: "secret user data accessed"})
});

module.exports = router;