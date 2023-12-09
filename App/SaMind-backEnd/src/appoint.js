const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

// Use bodyParser middleware to parse JSON in the request body
router.use(bodyParser.json());

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

// router.get('/appoint_patient_get', (req, res) => {
//   const id = req.query.patient_id; // Get the id parameter from the query
//   let query = 'SELECT to_char(date, \'YYYY-MM-DD\') as date FROM appointment_new';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE patient_id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY patient_id';

//   const queryParams = id ? [id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract the date values from the rows and store them in an array
//       const dates = result.rows.map(row => row.date);
//       res.json(dates);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.get('/appoint_patient_get', (req, res) => {
//   const { patient_id } = req.body; // Get the patient_id from the request body
//   let query = 'SELECT to_char(date, \'YYYY-MM-DD\') as date FROM appointment_new';
//   console.log("entryyyyy", patient_id)

//   // Check if the patient_id is provided
//   if (patient_id) {
//     console.log("innnnnnnnnnnn", patient_id)
//     query += ' WHERE patient_id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "date" column (or another relevant column)
//   query += ' ORDER BY date'; // Update this to the correct column name

//   const queryParams = patient_id ? [patient_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract the date values from the rows and store them in an array
//       const dates = result.rows.map(row => row.date);
//       res.json(dates);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/appoint_patient_post', (req, res) => {
  const { patient_id } = req.body;

  let query = 'SELECT to_char(date, \'YYYY-MM-DD\') as date FROM appointment_new';
  
  if (patient_id) {
    query += ' WHERE patient_id = $1';
  }

  query += ' ORDER BY date';

  const queryParams = patient_id ? [patient_id] : [];

  client.query(query, queryParams)
    .then(result => {
      const dates = result.rows.map(row => row.date);
      res.json(dates);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// router.get('/appoint_date_get', (req, res) => {
//   const id = req.query.patient_id; // Get the id parameter from the query
//   let query = 'SELECT to_char(date, \'YYYY-MM-DD\') as date FROM appointment_new';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE patient_id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY patient_id';

//   const queryParams = id ? [id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract the date values from the rows and store them in an array
//       const dates = result.rows.map(row => row.date);
//       res.json(dates);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.get('/upcoming_date_get', (req, res) => {
//   // Access data directly from req.body
//   const { patient_id, date } = req.body;

//   // Check if both patient_id and date parameters are provided
//   if (!patient_id || !date) {
//     return res.status(400).json({ error: 'Both patient_id and date are required parameters' });
//   }

//   // Define the base query with parameterized placeholders
//   const query = 'SELECT * FROM appointment_new WHERE patient_id = $1 AND date = $2::date ORDER BY time';
//   console.log("dateeee", query);
  
//   // Define query parameters
//   const queryParams = [patient_id, date];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract the data values from the rows and store them in an array
//       const appointments = result.rows;
//       res.json(appointments);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/upcoming_date_post', (req, res) => {
//   // Access data directly from req.body
//   const { patient_id, date } = req.body;

//   // Check if both patient_id and date parameters are provided
//   if (!patient_id || !date) {
//     return res.status(400).json({ error: 'Both patient_id and date are required parameters' });
//   }

//   // Define the base query with parameterized placeholders
//   const query = 'SELECT * FROM appointment_new WHERE patient_id = $1 AND date = $2::date ORDER BY time';
//   // console.log("dateeee", query);
  
//   // Define query parameters
//   const queryParams = [patient_id, date];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract the data values from the rows and store them in an array
//       const appointments = result.rows;
//       res.json(appointments);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/upcoming_date_post', (req, res) => {
  // Access data directly from req.body
  const { patient_id, date } = req.body;

  // Check if both patient_id and date parameters are provided
  if (!patient_id || !date) {
    return res.status(400).json({ error: 'Both patient_id and date are required parameters' });
  }

  // Define the base query with parameterized placeholders
  const query = `
    SELECT 
      appointment_new.*, 
      therapist.fname AS therapist_fname,
      therapist.lname AS therapist_lname
    FROM 
      appointment_new
    LEFT JOIN 
      therapist ON appointment_new.therapist_id = therapist.therapist_id
    WHERE 
      appointment_new.patient_id = $1 
      AND appointment_new.date = $2::date 
    ORDER BY 
      appointment_new.time`;

  // Define query parameters
  const queryParams = [patient_id, date];

  client.query(query, queryParams)
    .then(result => {
      // Extract the data values from the rows and store them in an array
      const appointments = result.rows;
      res.json(appointments);
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
