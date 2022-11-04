const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT),
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: pool
}
