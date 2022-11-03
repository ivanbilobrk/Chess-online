const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res)=> {
    res.send("home")
})

app.use('/register', require('./routes/register.routes'));
app.use('/login', require('./routes/login.routes'));
app.use('/refresh', require('./routes/refresh.routes'));

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