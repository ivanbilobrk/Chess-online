const db = require('../db/index');

module.exports = class User{

    //kostruktor svakog korisnika
    constructor(name, surname, username, email, pwdHash){
       this.id = undefined
       this.role = 'user'
       this.name = name
       this.surname = surname
       this.username = username
       this.email = email
       this.pwdHash = pwdHash
       this.refreshToken = null
    }

    //dohvat korisnika na osnovu korisničkog imena
    static async fetchByUsername(username) {

        let results = await dbGetUserByName(username)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].name, results[0].surname,
                results[0].username, results[0].email, results[0].pwdhash)
            newUser.id = results[0].id
            newUser.role = results[0].role
        }
        return newUser
    }

    //dohvat korisnika na osnovu email adrese
    static async fetchByEmail(email) {

        let results = await dbGetUserByEmail(email)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].name, results[0].surname,
                results[0].username, results[0].email, results[0].pwdHash)
            newUser.id = results[0].id
            newUser.role = results[0].role
        }
        return newUser
    }
    static async fetchByRefreshToken(refreshToken) {

        let results = await dbGetUserByRefreshToken(refreshToken)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].name, results[0].surname,
                results[0].username, results[0].email, results[0].pwdHash)
            newUser.id = results[0].id
            newUser.role = results[0].role
        }
        return newUser
    }
    static async addRefreshToken(userName, refreshToken){
        let results = await dbUpdateUser(userName, refreshToken);
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].name, results[0].surname,
                results[0].username, results[0].email, results[0].pwdHash)
            newUser.id = results[0].id
            newUser.role = results[0].role
        }
        return newUser

    }


    //dohvat korisnika na osnovu id korisnika (tablica users)
    static async fetchByUserId(id) {

        let results = await dbGetUserById(id)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User(results[0].name, results[0].surname,
                results[0].username, results[0].email, results[0].pwdHash)
            newUser.id = results[0].id
            newUser.role = results[0].role
        }
        return newUser
    }

     //da li je korisnik pohranjen u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

     //provjera zaporke
     checkPassword(passwordHash) {
        return this.pwdHash ? this.pwdHash === passwordHash : false
    }


     //pohrana korisnika u bazu podataka
     async persist() {
        try {
            let userID = await dbNewUser(this)
            this.id = userID
        } catch(err) {
            console.log("ERROR persisting user data: " + JSON.stringify(this))
            throw err
        }
    }
    
}

//dohvat korisnika iz baze podataka na osnovu korisničkog imena (stupac user_name)
dbGetUserByName = async (userName) => {
    const sql = `SELECT *
    FROM users WHERE username = '` + userName + `'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};


//dohvat korisnika iz baze podataka na osnovu email adrese (stupac email)
dbGetUserByEmail = async (user_email) => {
    const sql = `SELECT *
    FROM users WHERE email = '` + user_email + `'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};
dbGetUserByRefreshToken = async (refreshToken) => {
    const sql = `SELECT *
    FROM users WHERE refreshToken = '` + refreshToken + `'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

//dohvat korisnika iz baze podataka na osnovu id korisnika (stupac id)
dbGetUserById = async (user_id) => {
    const sql = `SELECT *
    FROM users WHERE id = ` + user_id;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

//umetanje zapisa o korisniku u bazu podataka
dbNewUser = async (user) => {
    const sql = "INSERT INTO users (name, surname, username, email, pwdHash, role, refreshToken) VALUES ('" +
        user.name + "', '" + user.surname + "', '" + user.username + "', '" +
        user.email + "', '" + user.pwdHash + "', '" + user.role + "','"+user.refreshToken+"') RETURNING id";
    try {
        const result = await db.query(sql, []);
        return result.rows[0].id;
    } catch (err) {
        console.log(err);
        throw err
    }
}
dbUpdateUser = async (userName, refreshToken) => {
    const sql = "UPDATE users SET refreshToken = '"+refreshToken+"' WHERE userName = '" + userName + "'";
    try {
        const result = await db.query(sql, []);
        return result.rows; 
    } catch (err){
        console.log(err);
        throw err
    }
}


