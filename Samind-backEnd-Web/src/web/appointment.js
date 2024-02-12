const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

router.use(bodyParser.json());

// router.post('/appoint_post', (req, res) => {
//     let { appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint } = req.body;
  
//     if (!therapist_id || !patient_id || !date || !time) {
//       return res.status(400).json({ error: 'therapist_id, patient_id, date, and time are required fields.' });
//     }
   
//     // If appointment_id is not provided, generate a unique identifier (assuming you are using PostgreSQL)
//     if (!appointment_id) {
//       const generateAppointmentIdQuery = 'SELECT NEXTVAL(\'appointment_id_seq\') AS appointment_id';
   
//       client.query(generateAppointmentIdQuery)
//         .then(result => {
//           appointment_id = result.rows[0].appointment_id;
  
//           // Continue with the appointment creation
//           continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
//         })
//         .catch(err => {
//           console.error('Error generating appointment_id:', err);
//           res.status(500).json({ error: 'An error occurred' });
//         });
//     } else {
//       // Continue with the appointment creation using the provided appointment_id
//       continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
//     }
//   });
  
//   // Function to continue with the appointment creation
//   function continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res) {
//     // Fetch hospital_name from patient table based on patient_id
//     const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';
  
//     client.query(selectPatientQuery, [patient_id])
//       .then(patientResult => {
//         if (patientResult.rows.length > 0) {
//           const hospital_name = patientResult.rows[0].hospital_name;
  
//           // Use the provided appointment_id in the INSERT statement
//           const insertQuery = 'INSERT INTO appointment_new2 (appointment_id, therapist_id, patient_id, date, time, location, create_by, confirm, type_appoint, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP) RETURNING *';
  
//           client.query(insertQuery, [appointment_id, therapist_id, patient_id, date, time, hospital_name, create_by, confirm, type_appoint])
//             .then(result => {
//               res.status(201).json(result.rows[0]);
//             })
//             .catch(err => {
//               console.error('Error executing query:', err);
//               res.status(500).json({ error: 'An error occurred' });
//             });
  
//         } else {
//           res.status(404).json({ error: 'Patient not found' });
//         }
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   }

// router.post('/therapistAddAppoint', (req, res) => {
//     let { therapistId, patientId, date, startTime, note } = req.body;

//     if (!therapistId || !patientId || !date || !startTime) {
//         return res.status(400).json({ error: 'therapistId, patientId, date, and startTime are required fields.' });
//     }

//     // Generate a unique identifier for appointment_id
//     const generateAppointmentIdQuery = 'SELECT NEXTVAL(\'appointment_id_seq\') AS appointment_id';

//     client.query(generateAppointmentIdQuery)
//         .then(result => {
//             const appointmentId = result.rows[0].appointment_id;
//             const currentDate = new Date();
//             currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time
//             const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//             // Fetch hospital_name from patient table based on patientId
//             const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';

//             client.query(selectPatientQuery, [patientId])
//                 .then(patientResult => {
//                     if (patientResult.rows.length > 0) {
//                         const hospitalName = patientResult.rows[0].hospital_name || 'Unknown Hospital'; // Provide a default value if hospitalName is null
//                         const insertQuery = `
//                             INSERT INTO appointment_new2 (
//                                 appointment_id, therapist_id, patient_id, date, "time", description, location, confirm, active_flag, create_by, create_date, update_by, update_date
//                             ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'Y', 'Y', $8, $9, $10, $11) RETURNING *
//                         `;

//                         client.query(insertQuery, [appointmentId, therapistId, patientId, date, startTime, note, hospitalName, 'create_by_placeholder', formattedDate, 'update_by_placeholder', formattedDate])
//                             .then(result => {
//                                 res.status(201).json(result.rows[0]);
//                             })
//                             .catch(err => {
//                                 console.error('Error executing query:', err);
//                                 res.status(500).json({ error: 'An error occurred' });
//                             });
//                     } else {
//                         res.status(404).json({ error: 'Patient not found' });
//                     }
//                 })
//                 .catch(err => {
//                     console.error('Error executing query:', err);
//                     res.status(500).json({ error: 'An error occurred' });
//                 });
//         })
//         .catch(err => {
//             console.error('Error generating appointment_id:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/therapistAddAppoint', (req, res) => {
    let { therapistId, patientId, date, startTime, note } = req.body;

    if (!therapistId || !patientId || !date || !startTime) {
        return res.status(400).json({ error: 'therapistId, patientId, date, and startTime are required fields.' });
    }

    // Convert date to the format expected by the database (yyyy-mm-dd)
    const [day, month, year] = date.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    // Generate a unique identifier for appointment_id
    const generateAppointmentIdQuery = 'SELECT NEXTVAL(\'appointment_id_seq\') AS appointment_id';

    client.query(generateAppointmentIdQuery)
        .then(result => {
            const appointmentId = result.rows[0].appointment_id;
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time
            const formattedCurrentDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            // Fetch hospital_name from patient table based on patientId
            const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';

            client.query(selectPatientQuery, [patientId])
                .then(patientResult => {
                    if (patientResult.rows.length > 0) {
                        const hospitalName = patientResult.rows[0].hospital_name || 'Unknown Hospital'; // Provide a default value if hospitalName is null
                        const insertQuery = `
                            INSERT INTO appointment_new2 (
                                appointment_id, therapist_id, patient_id, date, "time", description, location, confirm, active_flag, create_by, create_date, update_by, update_date
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'Y', 'Y', $8, $9, $10, $11) RETURNING *
                        `;

                        client.query(insertQuery, [appointmentId, therapistId, patientId, formattedDate, startTime, note, hospitalName, therapistId, formattedCurrentDate, therapistId, formattedCurrentDate]) // Pass therapistId as both create_by and update_by
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
        })
        .catch(err => {
            console.error('Error generating appointment_id:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});




module.exports = router;