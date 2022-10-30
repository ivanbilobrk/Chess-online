const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const signupRoute = require('./routes/signup.routes');

app.use('/register', signupRoute);

app.get('/', (req, res)=>{
    res.send('EEEEE')
})

app.listen(3500);