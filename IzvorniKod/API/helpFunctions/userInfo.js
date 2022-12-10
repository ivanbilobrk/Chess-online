const User = require('../models/UserModel');

const getUserInfo = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return 401; //Unauthorized
    const refreshToken = cookies.jwt;

    //find the user with given refreshtoken in the database if it doesnt exist ->forbidden 403
    const foundUser = await User.fetchByRefreshToken(refreshToken);
    if (foundUser.id === undefined) return 403; //Forbidden

    const role = foundUser.role;
    if (role == "admin"){
        //return res.status(StatusCodes.OK)
    } else if (role == "trener"){
        //return res.status(StatusCodes.OK)
    }

    return {
        podatci:
        [foundUser.id, foundUser.username, foundUser.email, 
        foundUser.name, foundUser.surname, foundUser.role]};

}


module.exports = { getUserInfo }