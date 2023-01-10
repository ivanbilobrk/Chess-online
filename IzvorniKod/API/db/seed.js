const {Pool} = require('pg');
require('dotenv').config({ path: __dirname + '/.env'});
const env = process.env;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "progi",
    password: "bazepodataka",
    port: "5432"
});


const sql_create_users = `CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name text NOT NULL,
    surname text NOT NULL,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    pwdHash text NOT NULL,
    role text NOT NULL,
    isBanned boolean not null default false,
    onlyPay boolean not null default false,
    refreshToken text
)`;

const sql_create_users_id_index = `CREATE  UNIQUE INDEX idx_usersId ON users(id)`;



const sql_create_training = `CREATE TABLE training (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  trainer_id int REFERENCES users(id),
  trainingStartTimeDate timestamp NOT NULL,
  trainingDurationMin int NOT NULL
)`;

const sql_create_training_id_index =`CREATE  UNIQUE INDEX idx_trainingId ON training(id)`;

const sql_create_tournament =`CREATE TABLE tournament(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  trainer_id int REFERENCES users(id),
  tournamentStartTimeDate timestamp NOT NULL,
  tournamentDurationMin int NOT NULL,
  participantsNo int,
  showing int NOT NULL
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
  id int NOT NULL, 
  title text NOT NULL,
  trainer_id int REFERENCES users(id),
  fen text NOT NULL,
  index int NOT NULL,
  showing int NOT NULL,
  content text NOT NULL,
  primary key(id, index)
)`;



const sql_create_membership =`CREATE TABLE membership(
  member_id int REFERENCES users(id),
  month int NOT NULL,
  isPaid boolean NOT NULL,
  PRIMARY KEY(member_id, month)
)`;


const sql_create_reportedMistake =`CREATE TABLE reportedMistake(
    member_id int NOT NULL,
	tactic_id int NOT NULL,
	trainer_id int REFERENCES users(id),
	description text NOT NULL,
	showing int NOT NULL,
	PRIMARY KEY(tactic_id, member_id)

)`;



const sql_create_score = `CREATE TABLE score(
	member_id int REFERENCES users(id),
	tactic_id int NOT NULL,
	solvingTime int NOT NULL,
    showing int NOT NULL,
	PRIMARY KEY(member_id, tactic_id, solvingtime, showing)
)`;

const sql_create_scoreMoves = `CREATE TABLE scoremoves(
	member_id int REFERENCES users(id),
	tactic_id int NOT NULL,
	index int NOT NULL,
    fen text NOT NULL,
	PRIMARY KEY(member_id, tactic_id, index)
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
    "score",
    "scoremoves"
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
    sql_create_score,
    sql_create_scoreMoves
];

let table_data = [
   // sql_insert_users
]

let indexes = [
    sql_create_users_id_index,
    sql_create_tournament_id_index,
    sql_create_training_id_index,
    sql_create_news_id_index,
];


(async () => {
    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
        console.log(env.DB_PASSWORD)
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
