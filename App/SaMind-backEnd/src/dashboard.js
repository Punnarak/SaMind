const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    const id = req.query.patientID;
    const query = 'SELECT * FROM dashboard WHERE patientID';
  
    client.query(query, [`%${id}%`])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});

module.exports = router;