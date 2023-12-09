const client = require('./connection.js')
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'YmFja0VuZC1Mb2dpbi1TYU1pbmQ=' //backEnd-Login-SaMind encode by base64

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

// router.get('/info_patient_get', (req, res) => {
//     const patient_id = req.query.patient_id; // Get the id parameter from the query
//     let query = 'SELECT * FROM patient';
  
//     // Check if the id parameter is provided
//     if (patient_id) {
//       query += ' WHERE patient_id = $1';
//     }
  
//     // Add an "ORDER BY" clause to sort the result by the "id" column
//     query += ' ORDER BY patient_id';
  
//     const queryParams = patient_id ? [patient_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

// router.get('/info_patient_get', (req, res) => {
//   const patient_id = req.query.patient_id; // Get the id parameter from the query
//   let query = 'SELECT users.email, users.password, patient.fname, patient.lname FROM users LEFT JOIN patient ON patient.patient_id = users.patient_id';

//   // Check if the id parameter is provided
//   if (patient_id) {
//     query += ' WHERE patient.patient_id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "patient_id" column
//   query += ' ORDER BY patient.patient_id';

//   const queryParams = patient_id ? [patient_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.get('/info_patient_get', (req, res) => {
  const patient_id = req.query.patient_id; // Get the id parameter from the query
  let query = 'SELECT users.email, patient.patient_id, patient.fname, patient.lname, users.password FROM users LEFT JOIN patient ON patient.patient_id = users.patient_id';

  // Check if the id parameter is provided
  if (patient_id) {
    query += ' WHERE patient.patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "patient_id" column
  query += ' ORDER BY patient.patient_id';

  const queryParams = patient_id ? [patient_id] : [];

  client.query(query, queryParams)
    .then(result => {
      // Decode the base64-encoded password
      const decodedResult = result.rows.map(row => {
        return {
          email: row.email,
          patient_id: row.patient_id,
          fname: row.fname,
          lname: row.lname,
          password: Buffer.from(row.password, 'base64').toString('utf-8'),
        };
      });

      res.json(decodedResult);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});



router.post('/info_therapist_post', (req, res) => {
  const { therapist_id, fname, lname, phone, email, hospital_name } = req.body;

  if (!therapist_id || !fname || !lname || !phone || !email || !hospital_name) {
    return res.status(400).json({ error: 'Both therapist_id, fname, lname, phone, email, hospital_name are required fields.' });
  }

  const insertQuery = 'INSERT INTO therapist (therapist_id, fname, lname, phone, email, hospital_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  client.query(insertQuery, [therapist_id, fname, lname, phone, email, hospital_name])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.get('/info_therapist_get', (req, res) => {
  const id = req.query.therapist_id; // Get the id parameter from the query
  let query = 'SELECT * FROM therapist';

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

router.post('/login', jsonParser, function (req, res, next) {
  const email = req.body.email;
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [req.body.email]
  };

  client.query(query, function(err, users, fields) {
    if (err) {
      res.json({ status: 'error', message: err });
      return;
    }
    if (users.rows.length == 0) {
      res.json({ status: 'error', message: 'NO user found' });
      return;
    }

    // Retrieve the fname values
    const fname = users.rows.map(row => row.fname); //add

    bcrypt.compare(req.body.password, users.rows[0].password, function(err, isLogin) {
      if (isLogin) {
        var token = jwt.sign({ email: users.rows[0].email }, secret, { expiresIn: '1h' });
        res.json({ status: 'ok', message: 'login success', token, fname});
      } else {
        res.json({ status: 'error', message: 'login failed' });
      }
    });
  });
});

module.exports = router;
