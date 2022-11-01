const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

router.post('/', async (req, res)=>{
    
    const{name, surName, userName, email, pwd} = req.body;
    const pwdHash = await bcrypt.hash(pwd, 10);
    //stvaranje novog usera te provjera postoji li već takav user u bazi na osnovu maila i usernamea koji su jedinstveni
    //u sendu se opiše greška kako bi se u reactu ispravno pokazalo

    //dobavi podatke o korisniku iz baze podataka
    let user = await User.fetchByUsername(userName);
    let userEmail = await User.fetchByEmail(email);

    //ako korisnik postoji, javi grešku
    if (user.id !== undefined) {
        res.status(400).send('Username je koristen!')
        return;
    } else if (userEmail.id !== undefined) {
        res.status(400).send('Email je koristen!')
        return;
    }

    //registriraj novog korisnika
    user = new User(name, surName, userName, email, pwd);
    await user.persist();

    res.status(400).send('Greska')
})

module.exports = router;