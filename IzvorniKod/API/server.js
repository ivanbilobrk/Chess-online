const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res)=> {
    res.send("home")
})

app.use('/register', require('./routes/register.routes'));
app.use('/login', require('./routes/login.routes'));
//currently login controller isn't sending cookies to refresh controller - FIX
app.use('/refresh', require('./routes/refresh.routes'));

app.use(verifyJWT);  //every route after this line here will use verifyJWT middleware

//tester - tester route that will demonstrate use of tokens
//download thunder client in vsc, and follow these steps for testing
// 1) register a new user at /register (send the parameters through body of POST request)
// 2) login with that username and password at /login (send the username and pwd throught body)
// 3) you will get AccessToken in respone, copy it
// 4) send the GET request to the /tester with copied AccessToken in Auth->Bearer 
// 5) you will be able to access the /tester page until the token expires
app.use('/tester', require('./routes/tester.routes'));

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