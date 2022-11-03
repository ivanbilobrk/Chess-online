const db = require('../db/index');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const{name, surName, userName, email, pwd} = req.body;

    let user = await User.fetchByUsername(userName);
    let userEmail = await User.fetchByEmail(email);
        
    //ako korisnik postoji, javi grešku
    if (user.id !== undefined) {
        throw new customError('User name je već iskorišten!', StatusCodes.CONFLICT);
    } else if (userEmail.id !== undefined) {
        throw new customError('E-mail je već iskorišten!', StatusCodes.CONFLICT);
    }

    //registriraj novog korisnika
    const pwdHash = await bcrypt.hash(pwd, 10);
    try{
        user = new User(name, surName, userName, email, pwdHash);
        await user.persist();

    } catch(error){
        throw new CustomError("User se ne može stvoriti", StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

module.exports = { handleNewUser }