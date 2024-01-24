const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0936340845",
    database: "sum_db"
});

// Add an event listener for the 'connect' event
client.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

// Add an event listener for the 'error' event
client.on('error', (err) => {
    console.error('Error connecting to PostgreSQL database:', err.message);
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => {
        console.log('Connection to PostgreSQL successful');
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL:', err.message);
    });

module.exports = client;