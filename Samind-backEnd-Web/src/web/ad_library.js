const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

router.use(bodyParser.json());

// Carousel
router.post('/adCarouselEdit', (req, res) => {
    const { patientID } = req.body;
    const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID
  
    let query = 'SELECT * FROM therapist';
  
    // Check if the id parameter is provided
    if (therapist_id) {
      query += ' WHERE therapist_id = $1';
    }
  
    const queryParams = therapist_id ? [therapist_id] : [];
  
    client.query(query, queryParams)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });





// Tip




// Link


module.exports = router;