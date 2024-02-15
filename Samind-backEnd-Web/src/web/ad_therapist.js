const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'YmFja0VuZC1Mb2dpbi1TYU1pbmQ=' //backEnd-Login-SaMind encode by base64

router.use(bodyParser.json());

// router.post('/adCreateTherapist', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/adCreateTherapist', async (req, res) => {
  const { fname, lname, phone, hospitalName, email, password } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert data into therapist table
    const query = `
      INSERT INTO therapist (therapist_id, fname, lname, phone, hospital_name, email, password, admin) 
      VALUES (NEXTVAL('therapist_id_seq'), $1, $2, $3, $4, $5, $6, 'N')
      RETURNING therapist_id
    `;
    const queryParams = [fname, lname, phone, hospitalName, email, hashedPassword];

    const result = await client.query(query, queryParams);
    const therapistId = result.rows[0].therapist_id;
    
    res.status(201).json({ therapistId, message: 'Therapist created successfully' });
  } catch (err) {
    console.error('Error creating therapist:', err);
    res.status(500).json({ error: 'An error occurred while creating therapist' });
  }
});


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

router.post('/adTherapistEdit', (req, res) => {
  const { therapistID, fname, lname, email, password } = req.body;

  // Extract numeric ID from therapistID
  const numericTherapistID = parseInt(therapistID.match(/\d+/)[0]);

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    let query = 'UPDATE therapist SET ';
    const queryParams = [];

    // Check and add fields to be updated
    if (fname) {
      query += 'fname = $1, ';
      queryParams.push(fname);
    }
    if (lname) {
      query += 'lname = $2, ';
      queryParams.push(lname);
    }
    if (email) {
      query += 'email = $3, ';
      queryParams.push(email);
    }
    if (password) {
      query += 'password = $4, ';
      queryParams.push(hashedPassword);
    }

    // Remove the trailing comma and space
    query = query.slice(0, -2);

    // Add WHERE clause to update only if therapist_id matches
    query += ' WHERE therapist_id = $5';
    queryParams.push(numericTherapistID);

    client.query(query, queryParams)
      .then(result => {
        res.json({ message: 'Therapist data updated successfully' });
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
});

// router.post('/adTherapistDelete', (req, res) => {
//   const { therapistID } = req.body;
//   const numericTherapistID = therapistID.replace(/\D/g, '');
//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/adTherapistDelete', (req, res) => {
  const { therapistID } = req.body;
  const numericTherapistID = therapistID.replace(/\D/g, '');
  
  const query = 'DELETE FROM therapist WHERE therapist_id = $1';
  const queryParams = [numericTherapistID];

  client.query(query, queryParams)
    .then(result => {
      res.json({ message: 'Therapist deleted successfully' });
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


module.exports = router;