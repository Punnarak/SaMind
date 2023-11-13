const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.post('/appoint_post', (req, res) => {
  const { appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date } = req.body;

  if (!appointment_id || !therapist_id || !patient_id || !date || !time || !location) {
    return res.status(400).json({ error: 'Both appointment_id, therapist_id, patient_id, date, time, location are required fields.' });
  }

  const insertQuery = 'INSERT INTO appointment (appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

  client.query(insertQuery, [appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.get('/appoint_patient_get', (req, res) => {
  const id = req.query.patient_id; // Get the id parameter from the query
  let query = 'SELECT * FROM appointment';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY patient_id';

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

router.get('/appoint_therapist_get', (req, res) => {
  const id = req.query.therapist_id; // Get the id parameter from the query
  let query = 'SELECT * FROM appointment';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE therapist_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY therapist_id';

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

module.exports = router;
