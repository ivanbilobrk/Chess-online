const {Pool} = require('pg');
require('dotenv').config();
const env = process.env;

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT),
});


const sql_create_users = `CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name text NOT NULL,
    surname text NOT NULL,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    pwdHash  NOT NULL,
    role text NOT NULL,
    refreshToken text
)`;

const sql_create_users_id_index = `CREATE  UNIQUE INDEX idx_usersId ON users(id)`;

//const sql_insert_users = `INSERT INTO users (username, name, surname, email, pwdhash, role) VALUES ('admin', 'Adminko', 'Administratović', 'null@admin', 'adminpass', 'admin')`

let table_names = [
    "users"
]

let tables = [
    sql_create_users
];

let table_data = [
    //sql_insert_users
]

let indexes = [
    sql_create_users_id_index
];


(async () => {
    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
        console.log("Creating table " + table_names[i] + ".");
        try {
            await pool.query(tables[i], [])
            console.log("Table " + table_names[i] + " created.");
            if (table_data[i] !== undefined) {
                try {
                    await pool.query(table_data[i], [])
                    console.log("Table " + table_names[i] + " populated with data.");
                } catch (err) {
                    console.log("Error populating table " + table_names[i] + " with data.")
                    return console.log(err.message);
                }
            }
        } catch (err) {
            console.log("Error creating table " + table_names[i])
            return console.log(err.message);
        }
    }

    console.log("Creating indexes");
    for (let i = 0; i < indexes.length; i++) {
        try {
            await pool.query(indexes[i], [])
            console.log("Index " + i + " created.")
        } catch (err) {
            console.log("Error creating index " + i + ".")
        }
    }

    await pool.end();
})()