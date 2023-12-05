const client = require('./connection.js')
const express = require('express');
const router = express.Router();

// router.post('/appoint_post', (req, res) => {
//   const { appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint } = req.body;

//   if (!appointment_id || !therapist_id || !patient_id || !date || !time || !location) {
//     return res.status(400).json({ error: 'Both appointment_id, therapist_id, patient_id, date, time, location are required fields.' });
//   }

//   // Use CURRENT_TIMESTAMP for the update_date column
//   const insertQuery = 'INSERT INTO appointment (appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP) RETURNING *';

//   client.query(insertQuery, [appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint])
//     .then(result => {
//       res.status(201).json(result.rows[0]);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appoint_post', (req, res) => {
//   const { appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint } = req.body;

//   // if (!appointment_id || !therapist_id || !patient_id || !date || !time) {
//   //   return res.status(400).json({ error: 'appointment_id, therapist_id, patient_id, date, and time are required fields.' });
//   // }

//   // Fetch hospital_name from patient table based on patient_id
//   const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';

//   client.query(selectPatientQuery, [patient_id])
//     .then(patientResult => {
//       if (patientResult.rows.length > 0) {
//         const hospital_name = patientResult.rows[0].hospital_name;

//         // Use CURRENT_TIMESTAMP for the update_date column
//         const insertQuery = 'INSERT INTO appointment_new (appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP) RETURNING *';

//         client.query(insertQuery, [appointment_id, therapist_id, patient_id, date, time, hospital_name, create_by, confirm, type_appoint])
//           .then(result => {
//             res.status(201).json(result.rows[0]);
//           })
//           .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//           });
//       } else {
//         res.status(404).json({ error: 'Patient not found' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appoint_post', (req, res) => {
//   let { appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint } = req.body;

//   if (!therapist_id || !patient_id || !date || !time) {
//     return res.status(400).json({ error: 'therapist_id, patient_id, date, and time are required fields.' });
//   }

//   // If appointment_id is not provided, generate a unique identifier (assuming you are using PostgreSQL)
//   if (!appointment_id) {
//     const generateAppointmentIdQuery = 'SELECT NEXTVAL(\'appointment_id_seq\') AS appointment_id';

//     client.query(generateAppointmentIdQuery)
//       .then(result => {
//         appointment_id = result.rows[0].appointment_id;

//         // Continue with the appointment creation
//         continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
//       })
//       .catch(err => {
//         console.error('Error generating appointment_id:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   } else {
//     // Continue with the appointment creation
//     continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
//   }
// });

// // Function to continue with the appointment creation
// function continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res) {
//   // Fetch hospital_name from patient table based on patient_id
//   const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';

//   client.query(selectPatientQuery, [patient_id])
//     .then(patientResult => {
//       if (patientResult.rows.length > 0) {
//         const hospital_name = patientResult.rows[0].hospital_name;

//         // Instead of generating appointment_id manually, use the sequence directly in the INSERT statement
//       const insertQuery = 'INSERT INTO appointment_new (appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date) VALUES (NEXTVAL(\'appointment_id_seq\'), $1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP) RETURNING *';

//       client.query(insertQuery, [therapist_id, patient_id, date, time, hospital_name, create_by, confirm, type_appoint])
//         .then(result => {
//           res.status(201).json(result.rows[0]);
//         })
//         .catch(err => {
//           console.error('Error executing query:', err);
//           res.status(500).json({ error: 'An error occurred' });
//         });

//       } else {
//         res.status(404).json({ error: 'Patient not found' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// }

router.post('/appoint_post', (req, res) => {
  let { appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint } = req.body;

  if (!therapist_id || !patient_id || !date || !time) {
    return res.status(400).json({ error: 'therapist_id, patient_id, date, and time are required fields.' });
  }

  // If appointment_id is not provided, generate a unique identifier (assuming you are using PostgreSQL)
  if (!appointment_id) {
    const generateAppointmentIdQuery = 'SELECT NEXTVAL(\'appointment_id_seq\') AS appointment_id';

    client.query(generateAppointmentIdQuery)
      .then(result => {
        appointment_id = result.rows[0].appointment_id;

        // Continue with the appointment creation
        continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
      })
      .catch(err => {
        console.error('Error generating appointment_id:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
  } else {
    // Continue with the appointment creation using the provided appointment_id
    continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
  }
});

// Function to continue with the appointment creation
function continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res) {
  // Fetch hospital_name from patient table based on patient_id
  const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';

  client.query(selectPatientQuery, [patient_id])
    .then(patientResult => {
      if (patientResult.rows.length > 0) {
        const hospital_name = patientResult.rows[0].hospital_name;

        // Use the provided appointment_id in the INSERT statement
        const insertQuery = 'INSERT INTO appointment_new (appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP) RETURNING *';

        client.query(insertQuery, [appointment_id, therapist_id, patient_id, date, time, hospital_name, create_by, confirm, type_appoint])
          .then(result => {
            res.status(201).json(result.rows[0]);
          })
          .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
          });

      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
}



// router.get('/appoint_patient_get', (req, res) => {
//   const id = req.query.patient_id; // Get the id parameter from the query
//   let query = 'SELECT date FROM appointment_new';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE patient_id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY patient_id';

//   const queryParams = id ? [id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.get('/appoint_patient_get', (req, res) => {
  const id = req.query.patient_id; // Get the id parameter from the query
  let query = 'SELECT to_char(date, \'YYYY-MM-DD\') as date FROM appointment_new';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY patient_id';

  const queryParams = id ? [id] : [];

  client.query(query, queryParams)
    .then(result => {
      // Extract the date values from the rows and store them in an array
      const dates = result.rows.map(row => row.date);
      res.json(dates);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});




router.get('/appoint_therapist_get', (req, res) => {
  const id = req.query.therapist_id; // Get the id parameter from the query
  let query = 'SELECT * FROM appointment';

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

module.exports = router;
