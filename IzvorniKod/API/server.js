const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const signupRoute = require('./routes/signup.routes');

app.get('/', (req, res)=>{
    res.send("eee")
})

app.use('/register', signupRoute);

app.use((req, res)=>{
    res.status(404).json({error: 'Not found'});
})

app.use((error, req, res, next)=>{
    res.status(error.status).json({
        message: error.message ? error.message : 'Dogodila se greška.',
        stack: error.showStack ? error.showStack : {},
    });
    next();
});

app.listen(parseInt(process.env.PORT));