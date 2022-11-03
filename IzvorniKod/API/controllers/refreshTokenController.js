const db = require('../db/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized
    const refreshToken = cookies.jwt;

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.userName },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '120s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }