const client = require('./connection.js')
const express = require('express');
const router = express.Router();

// router.get('/library', (req, res) => {
//     const style = req.query.style || ''; // Default value if parameter not provided
//     const query = 'SELECT * FROM library WHERE style LIKE $1';
  
//     client.query(query, [`%${style}%`])
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

router.get('/library', (req, res) => {
  const style = req.query.style; // Get the type parameter from the query
  let query = 'SELECT * FROM library';

  // Check if the type parameter is provided
  if (style) {
    query += ' WHERE style LIKE $1';
  }

  const queryParams = style ? [`%${style}%`] : [];

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
  const { libraryid, title, linkpicture, linkweb, style } = req.body;

  if (!libraryid || !title || !linkpicture || !linkweb || !style ) {
    return res.status(400).json({ error: 'Both title, link-picture and link-web are required fields.' });
  }

  const insertQuery = 'INSERT INTO library (libraryid, title, linkpicture, linkweb, style) VALUES ($1, $2, $3, $4, $5) RETURNING *';

  client.query(insertQuery, [libraryid, title, linkpicture, linkweb, style])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});
  
module.exports = router;