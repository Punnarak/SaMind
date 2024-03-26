const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const secret = require("./auth.js").secret;
const auth = require("./auth.js").authorization;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.use(bodyParser.json());

router.post('/all_therapist', auth, (req, res) => {
    const therapist_id = req.body.therapist_id; // Access therapist_id from request body
    if (!therapist_id) {
      return res.status(400).json({ error: 'Therapist ID is required' });
    }
  
    const query = 'SELECT CONCAT(fname, \' \', lname) AS full_name FROM therapist WHERE therapist_id != $1';
    const queryParams = [therapist_id];
  
    client.query(query, queryParams)
      .then(result => {
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Therapists not found' });
        }
        const therapistNames = result.rows.map(row => row.full_name);
        res.json(therapistNames);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});

router.post('/info_therapist', auth, (req, res) => {
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
  
//old api can use 
// router.post('/update_info_therapist'/*, auth*/, async (req, res) => {
//     const { therapist_id, fname, lname, password } = req.body; // Access therapist_id, fname, lname, password from request body
//     console.log(therapist_id, fname, lname, password)
//     if (!therapist_id) {
//       return res.status(400).json({ error: 'Therapist ID is required' });
//     }
  
//     try {
//       // Convert password to string
//       const passwordString = String(password);

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(passwordString, 10);
  
//       // Construct the UPDATE query
//       const query = `
//         UPDATE therapist 
//         SET fname = $1, lname = $2, password = $3
//         WHERE therapist_id = $4
//       `;
//       const queryParams = [fname, lname, hashedPassword, therapist_id];
  
//       // Execute the UPDATE query
//       const result = await client.query(query, queryParams);
  
//       if (result.rowCount === 0) {
//         return res.status(404).json({ error: 'Therapist not found' });
//       }
  
//       res.json({ message: 'Therapist updated successfully' });
//     } catch (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     }
// });

router.post('/update_info_therapist', auth, async (req, res) => {
  const { therapist_id, fname, lname, password } = req.body; // Access therapist_id, fname, lname, password from request body
  console.log(therapist_id, fname, lname, password)
  if (!therapist_id) {
    return res.status(400).json({ error: 'Therapist ID is required' });
  }

  try {
    let hashedPassword;
    if (password === '') {
      // If password is empty, retrieve the old password from the database
      const getPasswordQuery = `
        SELECT password FROM therapist
        WHERE therapist_id = $1
      `;
      const getPasswordParams = [therapist_id];
      const getPasswordResult = await client.query(getPasswordQuery, getPasswordParams);
      
      if (getPasswordResult.rows.length === 0) {
        return res.status(404).json({ error: 'Therapist not found' });
      }
      
      hashedPassword = getPasswordResult.rows[0].password;
    } else {
      // If password is provided, hash it
      const passwordString = String(password);
      hashedPassword = await bcrypt.hash(passwordString, 10);
    }

    // Construct the UPDATE query
    const query = `
      UPDATE therapist 
      SET fname = $1, lname = $2, password = $3
      WHERE therapist_id = $4
    `;
    const queryParams = [fname, lname, hashedPassword, therapist_id];

    // Execute the UPDATE query
    const result = await client.query(query, queryParams);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    res.json({ message: 'Therapist updated successfully' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;