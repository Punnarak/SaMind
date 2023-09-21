const client = require('./connection.js')
const express = require('express');
const router = express.Router();

// router.get('/question', (req, res) => {
//     const type = req.query.type || ''; // Default value if parameter not provided
//     const query = 'SELECT * FROM questionnaire WHERE type LIKE $1';
  
//     client.query(query, [`%${type}%`])
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

// router.get('/question', (req, res) => {
//   const type = req.query.type || 'test2'; // Default value if parameter not provided
//   const query = 'SELECT * FROM questionnaire WHERE type LIKE $1';

//   client.query(query, [`%${type}%`])
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.get('/question', (req, res) => {
  const type = req.query.type; // Get the type parameter from the query
  let query = 'SELECT * FROM questionnaire';

  // Check if the type parameter is provided
  if (type) {
    query += ' WHERE type LIKE $1';
  }

  const queryParams = type ? [`%${type}%`] : [];

  client.query(query, queryParams)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/questionAdd', (req, res) => {
  const { questionid, question, choice, type } = req.body;

  if (!question || !questionid || !type || !choice ) {
    return res.status(400).json({ error: 'Both question and choice are required fields.' });
  }

  const insertQuery = 'INSERT INTO questionnaire (questionid, question, choice, type) VALUES ($1, $2, $3, $4) RETURNING *';

  client.query(insertQuery, [questionid, question, choice, type])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;