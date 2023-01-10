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


module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //console.log('executed query', {text, rows: res.rows});
                return res;
            });
    },
    pool: pool
}
