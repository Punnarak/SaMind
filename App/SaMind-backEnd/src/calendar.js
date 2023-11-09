const client = require('./connection.js')
const express = require('express');
const router = express.Router();


router.get('/calendar_get', (req, res) => {
  const appointment_id = req.query.appointment_id; // Get the id parameter from the query
  let query = 'SELECT * FROM appointment';

  // Check if the id parameter is provided
  if (appointment_id) {
    query += ' WHERE appointment_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY appointment_id';

  const queryParams = appointment_id ? [appointment_id] : [];

  client.query(query, queryParams)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;
