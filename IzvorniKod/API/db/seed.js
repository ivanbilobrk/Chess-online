const {Pool} = require('pg');
require('dotenv').config();
const env = process.env;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "users",
    password: "bazepodataka",
    port: "5432",
});




const sql_create_users = `CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name text NOT NULL,
    surname text NOT NULL,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    pwdHash text NOT NULL,
    role text NOT NULL,
    refreshToken text
)`;

const sql_create_users_id_index = `CREATE  UNIQUE INDEX idx_usersId ON users(id)`;



const sql_create_training = `CREATE TABLE training (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  trainer_id int REFERENCES users(id),
  trainingStartTimeDate timestamp NOT NULL,
  trainingDurationMin int NOT NULL,
  showing int NOT NULL
)`;

const sql_create_training_id_index =`CREATE  UNIQUE INDEX idx_trainingId ON training(id)`;

const sql_create_tournament =`CREATE TABLE tournament(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  trainer_id int REFERENCES users(id),
  tournamentStartTimeDate timestamp NOT NULL,
  tournamentDurationMin int NOT NULL,
  participantsNo int 
)`;

const sql_create_tournament_id_index =`CREATE  UNIQUE INDEX idx_tournamentId ON tournament(id)`;

const sql_create_scheduledTournament =`CREATE TABLE scheduledTournament(
member_id int REFERENCES users(id),
tournament_id int REFERENCES tournament(id),
PRIMARY KEY (member_id, tournament_id)

)`;

const sql_create_scheduledTraining =`CREATE TABLE scheduledTraining(
	member_id int REFERENCES users(id),
    training_id int REFERENCES training(id),
    PRIMARY KEY(member_id, training_id)


)`;


const sql_create_news = `CREATE TABLE news(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    trainer_id int REFERENCES users(id),
    title text NOT NULL,
    content text NOT NULL,
    showing int NOT NULL
)`;

const sql_create_news_id_index =`CREATE  UNIQUE INDEX idx_newsId ON news(id)`;


const sql_create_dailyTactics= `CREATE TABLE dailyTactics(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  trainer_id int REFERENCES users(id),
  content text NOT NULL,
  solution text NOT NULL
)`;

const sql_create_dailyTactics_id_index =`CREATE  UNIQUE INDEX idx_dailyTacticsId ON dailyTactics(id)`;


const sql_create_membership =`CREATE TABLE membership(
  member_id int REFERENCES users(id),
  month int NOT NULL,
  isPaid boolean NOT NULL,
  PRIMARY KEY(member_id, month)
)`;


const sql_create_reportedMistake =`CREATE TABLE reportedMistake(
	member_id int REFERENCES users(id),
	tactic_id int REFERENCES dailyTactics(id),
	trainer_id int REFERENCES users(id),
	preposedMove text NOT NULL,
	moveDescription text NOT NULL,
	isFixed boolean NOT NULL,
	PRIMARY KEY(member_id, tactic_id)

)`;



const sql_create_score = `CREATE TABLE score(
	member_id int REFERENCES users(id),
	tactic_id int REFERENCES dailyTactics(id),
	solvingTime time NOT NULL,
	accuracy float NOT NULL,
	PRIMARY KEY(member_id, tactic_id)
	
)`;











//const sql_insert_users = `INSERT INTO users (username, name, surname, email, pwdhash, role) VALUES ('admin', 'Adminko', 'Administratović', 'null@admin', 'adminpass', 'admin')`

let table_names = [
    "users",
    "training",
    "tournament",
    "scheduledTournament",
    "scheduledTraining",
    "news",
    "dailyTactics",
    "membership",
    "reportedMistake",
    "score"
]

let tables = [
    sql_create_users,
    sql_create_training,
    sql_create_tournament,
    sql_create_scheduledTournament,
    sql_create_scheduledTraining,
    sql_create_news,
    sql_create_dailyTactics,
    sql_create_membership,
    sql_create_reportedMistake,
    sql_create_score
];

let table_data = [
   // sql_insert_users
]

let indexes = [
    sql_create_users_id_index,
    sql_create_tournament_id_index,
    sql_create_training_id_index,
    sql_create_news_id_index,
    sql_create_dailyTactics_id_index
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
