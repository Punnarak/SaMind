const client = require('./connection.js')
const express = require('express');
const router = express.Router();

// router.get('/question', (req, res) => {
//   const type = req.query.type; // Get the type parameter from the query
//   let query = 'SELECT id, question, options FROM questionnaire';

//   // Check if the type parameter is provided
//   if (type) {
//     query += ' WHERE type LIKE $1';
//   }

//   const queryParams = type ? [`%${type}%`] : [];

//   client.query(query, queryParams)
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
  let query = 'SELECT id, question, options FROM questionnaire';

  // Check if the type parameter is provided
  if (type) {
    query += ' WHERE type LIKE $1';
  }

  const queryParams = type ? [`%${type}%`] : [];

  client.query(query, queryParams)
    .then(result => {
      const formattedResults = result.rows.map(row => {
        let options;

        try {
          // Attempt to parse the options field as JSON
          options = JSON.parse(row.options);
        } catch (error) {
          // Handle any parsing errors, e.g., if the data is not valid JSON
          options = null; // Or handle the error in an appropriate way for your use case
        }

        return {
          id: row.id,
          question: row.question,
          options: options
        };
      });

      res.json(formattedResults);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// router.post('/questionAdd', (req, res) => {
//   const { id, question, options, type } = req.body;

//   if (!id || !question || !options || !type ) {
//     return res.status(400).json({ error: 'Both question and choice are required fields.' });
//   }

//   const insertQuery = 'INSERT INTO questionnaire (id, question, options, type) VALUES ($1, $2, $3, $4) RETURNING *';

//   client.query(insertQuery, [id, question, options, type])
//     .then(result => {
//       res.status(201).json(result.rows[0]);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/questionAdd', (req, res) => {
  const { id, question, options, type } = req.body;

  if (!id || !question || !options || !type) {
    return res.status(400).json({ error: 'Both question and choice are required fields.' });
  }

  const optionsString = JSON.stringify(options); // Convert options array to JSON string

  const insertQuery = 'INSERT INTO questionnaire (id, question, options, type) VALUES ($1, $2, $3, $4) RETURNING *';

  client.query(insertQuery, [id, question, optionsString, type])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


module.exports = router;