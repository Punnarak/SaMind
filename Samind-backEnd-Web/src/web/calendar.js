const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const secret = 'YmFja0VuZC1Mb2dpbi1TYU1pbmQ=' //backEnd-Login-SaMind encode by base64

router.use(bodyParser.json());

router.post('/calendar_view', (req, res) => {
    const therapist_id = req.body.therapist_id; // Access therapist_id from request body
    if (!therapist_id) {
        return res.status(400).json({ error: 'Therapist ID is required' });
    }

    const query = `
        SELECT 
            p.fname || ' ' || p.lname AS patientName, 
            to_char(a.date, 'DD-MM-YYYY') AS date, 
            to_char(a.time, 'HH24:MI') AS time 
        FROM 
            appointment_new2 a 
            LEFT JOIN patient p ON a.patient_id = p.patient_id 
        WHERE 
            a.therapist_id = $1
        ORDER BY 
            a.date DESC, 
            a.time DESC
    `;
    const queryParams = [therapist_id];

    client.query(query, queryParams)
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'No appointments found for this therapist' });
            }
            res.json(result.rows.map(row => ({
                patientName: row.patientname,
                date: row.date,
                time: row.time
            })));
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

router.post('/calendar_day', (req, res) => {
    const therapist_id = req.body.therapist_id; // Access therapist_id from request body
    if (!therapist_id) {
      return res.status(400).json({ error: 'Therapist ID is required' });
    }
  
    const query = 'SELECT fname, lname FROM therapist WHERE therapist_id = $1';
    const queryParams = [therapist_id];
  
    client.query(query, queryParams)
      .then(result => {
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Therapist not found' });
        }
        res.json(result.rows[0]); // Assuming there's only one therapist with the given ID
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});  


module.exports = router;