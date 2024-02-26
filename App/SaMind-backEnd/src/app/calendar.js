const client = require('./connection.js')
const express = require('express');
const router = express.Router();
const auth = require('./auth.js').authorization;

router.get('/calendar_get', auth, (req, res) => {
  const patient_id = req.query.patient_id;
  let query = 'SELECT * FROM appointment_new';

  // Check if the id parameter is provided
  if (patient_id) {
    query += ' WHERE patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  // query += ' ORDER BY date';

  const queryParams = patient_id ? [patient_id] : [];

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
