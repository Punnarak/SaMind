const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0936340845",
    database: "sumDB"
})

const avatar = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0936340845",
    database: "avatarDB"
})

const game = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0936340845",
    database: "gameDB"
})

module.exports = client,avatar,game