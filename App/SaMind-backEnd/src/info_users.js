const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.post('/info_patient_post', (req, res) => {
    const { patient_id, email, fname, lname, age, gender, start_date, phone, level, hospital_name } = req.body;
  
    if (!patient_id || !email || !fname || !lname || !age || !gender || !phone) {
      return res.status(400).json({ error: 'Both patient_id, email, fname, lname, age, gender, phone are required fields.' });
    }
  
    const insertQuery = 'INSERT INTO patient (patient_id, email, fname, lname, age, gender, start_date, phone, level, hospital_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  
    client.query(insertQuery, [patient_id, email, fname, lname, age, gender, start_date, phone, level, hospital_name])
      .then(result => {
        res.status(201).json(result.rows[0]);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});

router.get('/info_patient_get', (req, res) => {
    const patient_id = req.query.patient_id; // Get the id parameter from the query
    let query = 'SELECT * FROM patient';
  
    // Check if the id parameter is provided
    if (patient_id) {
      query += ' WHERE patient_id = $1';
    }
  
    // Add an "ORDER BY" clause to sort the result by the "id" column
    query += ' ORDER BY patient_id';
  
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
