const client = require('./connection.js')
const express = require('express');
const router = express.Router();

// router.get('/library', (req, res) => {
//   const id = req.query.id; // Get the type parameter from the query
//   let query = 'SELECT * FROM library';

//   // Check if the type parameter is provided
//   if (id) {
//     query += ' WHERE id LIKE $1';
//   }

//   const queryParams = id ? [`%${id}%`] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.get('/library', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  let query = 'SELECT * FROM library';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE id = $1';
  }

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


router.post('/libraryAdd', (req, res) => {
  const { id, name, url} = req.body;

  if (!id || !name || !url) {
    return res.status(400).json({ error: 'Both id, name, url are required fields.' });
  }

  const insertQuery = 'INSERT INTO library (id, name, url) VALUES ($1, $2, $3) RETURNING *';

  client.query(insertQuery, [id, name, url])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});
  
module.exports = router;