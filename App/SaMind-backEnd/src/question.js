const client = require('./connection.js')
const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

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

      formattedResults.sort((a, b) => a.id - b.id);
      res.json(formattedResults);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/questionAdd', (req, res) => {
  const requestData = req.body; // Assuming req.body is an array of objects

  if (!Array.isArray(requestData)) {
    return res.status(400).json({ error: 'Request data should be an array of objects.' });
  }

  // Iterate through each item in the array and insert it into the database with auto-generated IDs
  const insertQueries = requestData.map(item => {
    const { no, question, options, type } = item;

    if (!question || !options || !type || !no) {
      return res.status(400).json({ error: 'Each item in the array must have question, options, and type fields.' });
    }

    const id = uuidv4(); // Generate a new UUID for the question
    const optionsString = JSON.stringify(options);

    const insertQuery = 'INSERT INTO questionnaire_new (id, no, question, options, type) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    return client.query(insertQuery, [id, no, question, optionsString, type]);
  });

  // Execute all insert queries concurrently
  Promise.all(insertQueries)
    .then(results => {
      const insertedItems = results.map(result => result.rows[0]);
      res.status(201).json(insertedItems);
    })
    .catch(err => {
      console.error('Error executing queries:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});




module.exports = router;