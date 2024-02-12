const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

router.use(bodyParser.json());

// router.post('/adTherapistView', (req, res) => {
//     const therapist_id = req.query.therapist_id;
//     let query = 'SELECT * FROM therapist';
  
//     // Check if the id parameter is provided
//     if (therapist_id) {
//       query += ' WHERE therapist_id = $1';
//     }
  
//     const queryParams = therapist_id ? [therapist_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });

// router.post('/adTherapistView', (req, res) => {
//     const hospitalName = req.body.hospitalName;
//     let query = `SELECT therapist_id, fname, lname, email FROM therapist WHERE hospital_name = $1`;
//     const queryParams = [hospitalName];

//     client.query(query, queryParams)
//       .then(result => {
//         const therapists = result.rows.map((therapist, index) => {
//           return {
//             No: (index + 1).toString().padStart(2, '0'), // Auto increment number
//             therapistID: `THID${therapist.therapist_id}`, // THID + therapist_id from the database
//             therapistName: `${therapist.fname} ${therapist.lname}`, // Concatenate fname and lname
//             email: therapist.email
//           };
//         });
//         res.json(therapists);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

router.post('/adTherapistView', (req, res) => {
    const hospitalName = req.body.hospitalName;
    let query = `SELECT therapist_id, fname, lname, email FROM therapist WHERE hospital_name = $1 AND admin = 'N'`; // Added condition for admin column
    const queryParams = [hospitalName];

    client.query(query, queryParams)
      .then(result => {
        const therapists = result.rows.map((therapist, index) => {
          return {
            No: (index + 1).toString().padStart(2, '0'), // Auto increment number
            therapistID: `THID${therapist.therapist_id}`, // THID + therapist_id from the database
            therapistName: `${therapist.fname} ${therapist.lname}`, // Concatenate fname and lname
            email: therapist.email
          };
        });
        res.json(therapists);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});




module.exports = router;