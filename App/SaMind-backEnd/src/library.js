const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.get('/library', (req, res) => {
    const style = req.query.style || ''; // Default value if parameter not provided
    const query = 'SELECT * FROM library WHERE style LIKE $1';
  
    client.query(query, [`%${style}%`])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});
  
module.exports = router;