const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0936340845",
    database: "sum_db"
})

module.exports = client 