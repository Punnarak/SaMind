const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.get('/question', (req, res) => {
    const type = req.query.type || ''; // Default value if parameter not provided
    const query = 'SELECT * FROM questionnaire WHERE type LIKE $1';
  
    client.query(query, [`%${type}%`])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});

module.exports = router;