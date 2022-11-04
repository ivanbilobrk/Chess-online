const db = require('../db/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized
    const refreshToken = cookies.jwt;

    //find the user with given refreshtoken in the database if it doesnt exist ->forbidden 403
    const foundUser = await User.fetchByRefreshToken(refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.userName },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports =  {handleRefreshToken}