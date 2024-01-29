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


router.post('/update_info_patient', async (req, res) => {
  const { patient_id, email, fname, lname } = req.body;

  if (!patient_id || !email || !fname || !lname) {
    return res.status(400).json({ error: 'patient_id, email, fname, and lname are required fields.' });
  }

  const updateFields = Object.keys(req.body).filter(key => key !== 'patient_id');
  const updateValues = updateFields.map((key, index) => `${key} = $${index + 2}`).join(', ');

  const updateQuery = `
    UPDATE patient
    SET ${updateValues}
    WHERE patient_id = $1
    RETURNING *;
  `;

  try {
    const result = await client.query(updateQuery, [patient_id, email, fname, lname]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Patient not found.' });
    }
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/update_info_user', async (req, res) => {
  const { patient_id, email, password } = req.body;

  if (!patient_id || !email || !password) {
    return res.status(400).json({ error: 'patient_id, email, and password are required fields.' });
  }

  // Hash the password before updating
  const hashedPassword = await bcrypt.hash(password, 10);

  const updateQuery = `
    UPDATE users
    SET email = $2, password = $3
    WHERE patient_id = $1
    RETURNING *;
  `;

  try {
    const result = await client.query(updateQuery, [patient_id, email, hashedPassword]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//merge upper 2 api
router.post('/update_info', async (req, res) => {
  const { patient_id, email, fname, lname, password } = req.body;

  if (!patient_id || !email) {
    return res.status(400).json({ error: 'patient_id and email are required fields.' });
  }

  // Update patient information
  const updatePatientFields = ['fname', 'lname'].filter(key => req.body[key] !== undefined);
  const updatePatientValues = updatePatientFields.map((key, index) => `${key} = $${index + 3}`).join(', ');

  const updatePatientQuery = `
    UPDATE patient
    SET email = $2, ${updatePatientValues}
    WHERE patient_id = $1
    RETURNING *;
  `;

  // Update user information
  if (password !== undefined) {
    // Hash the password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUserQuery = `
      UPDATE users
      SET email = $2, password = $3
      WHERE patient_id = $1
      RETURNING *;
    `;

    try {
      const resultUser = await client.query(updateUserQuery, [patient_id, email, hashedPassword]);
      if (resultUser.rows.length > 0) {
        // User updated successfully, now update patient information
        try {
          const resultPatient = await client.query(updatePatientQuery, [patient_id, email, ...updatePatientFields.map(key => req.body[key])]);
          if (resultPatient.rows.length > 0) {
            res.status(200).json(resultPatient.rows[0]);
          } else {
            res.status(404).json({ error: 'Patient not found.' });
          }
        } catch (errPatient) {
          console.error('Error executing patient update query:', errPatient);
          res.status(500).json({ error: 'An error occurred during patient update.' });
        }
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (errUser) {
      console.error('Error executing user update query:', errUser);
      res.status(500).json({ error: 'An error occurred during user update.' });
    }
  } else {
    // Update patient information only
    try {
      const resultPatient = await client.query(updatePatientQuery, [patient_id, email, ...updatePatientFields.map(key => req.body[key])]);
      if (resultPatient.rows.length > 0) {
        res.status(200).json(resultPatient.rows[0]);
      } else {
        res.status(404).json({ error: 'Patient not found.' });
      }
    } catch (errPatient) {
      console.error('Error executing patient update query:', errPatient);
      res.status(500).json({ error: 'An error occurred during patient update.' });
    }
  }
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

router.post('/info_patient_get', (req, res) => {
  const patient_id = req.query.patient_id; // Get the id parameter from the query
  let query = 'SELECT users.email, patient.patient_id, patient.fname, patient.lname FROM users LEFT JOIN patient ON patient.patient_id = users.patient_id';

  // Check if the id parameter is provided
  if (patient_id) {
    query += ' WHERE patient.patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "patient_id" column
  query += ' ORDER BY patient.patient_id';

  const queryParams = patient_id ? [patient_id] : [];

  client.query(query, queryParams)
    .then(result => {
      if (result.rows.length > 0) {
        const row = result.rows[0]; // Take the first row, assuming there's only one result
        const decodedResult = {
          email: row.email,
          patient_id: row.patient_id,
          fname: row.fname,
          lname: row.lname,
        };

        res.json(decodedResult);
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
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
