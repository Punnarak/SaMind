const client = require('./connection.js');
// const avatar = require('./connection.js');
// const { client, avatar, game } = require('./connection.js');

const express = require('express');
const router = express.Router();


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
//   let query = 'SELECT * FROM mood_detection';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY id';

//   const queryParams = id ? [id] : [];

//   avatar.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });
  
module.exports = router;