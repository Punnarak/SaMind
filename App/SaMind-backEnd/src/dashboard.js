const client = require('./connection.js');
// const avatar = require('./connection.js');
// const { client, avatar, game } = require('./connection.js');

const express = require('express');
const router = express.Router();

router.post('/mood_tracker', (req, res) => {
  const { id, patient_id, date_time, score } = req.body;

  if (!id || !patient_id || !date_time || !score) {
    return res.status(400).json({ error: 'Both id, patient_id, score, date_time are required fields.' });
  }

  const insertQuery = 'INSERT INTO mood_tracker (id, patient_id, score, date_time) VALUES ($1, $2, $3, $4) RETURNING *';

  client.query(insertQuery, [id, patient_id, score, date_time])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


router.get('/dash_AVG_mood', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  let query = 'SELECT * FROM mood_tracker';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY id';

  const queryParams = id ? [id] : [];
  

  client.query(query, queryParams)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.get('/dashTest', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  let query = 'SELECT * FROM test_score';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY id';

  const queryParams = id ? [id] : [];

  client.query(query, queryParams)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// router.get('/dash_mood_detection', (req, res) => {
//   const id = req.query.id; // Get the id parameter from the query
//   client.query("SET search_path TO 'avatarDB';");
//   let query = 'SELECT * FROM mood_detection';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY id';

//   const queryParams = id ? [id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.get('/dash_mood_detection', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  const schemaName = 'avatar_db'; // Specify the schema name

  // Set the search_path to the desired schema
  const setSchemaQuery = `SET search_path TO ${schemaName}, public;`;

  // Build the query to select data from the table
  let query = `SELECT * FROM ${schemaName}.mood_detection`;

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY id';

  const queryParams = id ? [id] : [];

  // Run the queries
  client.query(setSchemaQuery) // Set the search_path
    .then(() => client.query(query, queryParams)) // Execute the main query
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});



  
module.exports = router;