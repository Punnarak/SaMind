const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const client = require("./connection.js");
const auth = require("./auth.js").authorization;

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

router.post("/therapistAddAppoint", auth, (req, res) => {
  let { therapistId, patientId, date, startTime, note } = req.body;

  if (!therapistId || !patientId || !date || !startTime) {
    return res
      .status(400)
      .json({
        error:
          "therapistId, patientId, date, and startTime are required fields.",
      });
  }

  // Convert date to the format expected by the database (yyyy-mm-dd)
  const [day, month, year] = date.split("/");
  const formattedDate = `${year}-${month}-${day}`;

  // Generate a unique identifier for appointment_id
  const generateAppointmentIdQuery =
    "SELECT NEXTVAL('appointment_id_seq') AS appointment_id";

  client
    .query(generateAppointmentIdQuery)
    .then((result) => {
      const appointmentId = result.rows[0].appointment_id;
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time
      const formattedCurrentDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // Fetch hospital_name from patient table based on patientId
      const selectPatientQuery =
        "SELECT hospital_name FROM patient WHERE patient_id = $1";

      client
        .query(selectPatientQuery, [patientId])
        .then((patientResult) => {
          if (patientResult.rows.length > 0) {
            const hospitalName =
              patientResult.rows[0].hospital_name || "Unknown Hospital"; // Provide a default value if hospitalName is null
            const insertQuery = `
                            INSERT INTO appointment_new2 (
                                appointment_id, therapist_id, patient_id, date, "time", description, location, confirm, active_flag, create_by, create_date, update_by, update_date
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'Y', 'Y', $8, $9, $10, $11) RETURNING *
                        `;

            client
              .query(insertQuery, [
                appointmentId,
                therapistId,
                patientId,
                formattedDate,
                startTime,
                note,
                hospitalName,
                therapistId,
                formattedCurrentDate,
                therapistId,
                formattedCurrentDate,
              ]) // Pass therapistId as both create_by and update_by
              .then((result) => {
                res.status(201).json(result.rows[0]);
              })
              .catch((err) => {
                console.error("Error executing query:", err);
                res.status(500).json({ error: "An error occurred" });
              });
          } else {
            res.status(404).json({ error: "Patient not found" });
          }
        })
        .catch((err) => {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "An error occurred" });
        });
    })
    .catch((err) => {
      console.error("Error generating appointment_id:", err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// router.post('/appointmentRequestView', (req, res) => {
//     const type = req.body.type; // Get the type from the JSON body
//     let query = 'SELECT no, question, options, test_name FROM questionnaire_new2';

//     // Check if the type is provided
//     if (type) {
//       query += ' WHERE test_name = $1';
//     }

//     query += ' ORDER BY no'; // Order by the "no" column

//     const queryParams = type ? [type] : [];

//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

// router.post('/appointmentRequestView', (req, res) => {
//     const therapist_id = req.body.therapist_id;
//     let query = `
//         SELECT
//             to_char(a.date, 'Dy, DD Mon YYYY') AS date,
//             to_char(a.time, 'HH24:MI') AS time,
//             p.fname || ' ' || p.lname AS patientName
//         FROM
//             appointment_new2 a
//         JOIN
//             patient p ON a.patient_id = p.patient_id
//         WHERE
//             a.therapist_id = $1
//             AND a.confirm = 'W'
//         ORDER BY
//             a.date, a.time`;

//     const queryParams = [therapist_id];

//     client.query(query, queryParams)
//         .then(result => {
//             res.json(result.rows);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/appointmentRequestView', (req, res) => {
//     const therapist_id = req.body.therapist_id;
//     let query = `
//         SELECT
//             a.date,
//             a.time,
//             a.change_date,
//             a.change_time,
//             p.fname || ' ' || p.lname AS patientName
//         FROM
//             appointment_new2 a
//         JOIN
//             patient p ON a.patient_id = p.patient_id
//         WHERE
//             a.therapist_id = $1
//             AND a.confirm = 'W'
//         ORDER BY
//             a.date, a.time`;

//     const queryParams = [therapist_id];

//     client.query(query, queryParams)
//         .then(result => {
//             const formattedResults = result.rows.map(row => {
//                 const dateFrom = row.date ? new Date(row.date).toLocaleString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-';
//                 const timeFrom = row.time ? new Date(row.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-';
//                 const dateTo = row.change_date ? new Date(row.change_date).toLocaleString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-';
//                 const timeTo = row.change_time ? new Date(row.change_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-';
//                 return {
//                     patientName: row.patientName,
//                     dateFrom: dateFrom,
//                     timeFrom: timeFrom,
//                     dateTo: dateTo,
//                     timeTo: timeTo
//                 };
//             });
//             res.json(formattedResults);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/appointmentRequestView', (req, res) => {
//     const therapist_id = req.body.therapist_id;
//     let query = `
//         SELECT
//             a.date,
//             a.time,
//             a.change_date,
//             a.change_time,
//             p.fname || ' ' || p.lname AS patientName
//         FROM
//             appointment_new2 a
//         JOIN
//             patient p ON a.patient_id = p.patient_id
//         WHERE
//             a.therapist_id = $1
//             AND a.confirm = 'W'
//         ORDER BY
//             a.date, a.time`;

//     const queryParams = [therapist_id];

//     client.query(query, queryParams)
//         .then(result => {
//             const formattedResults = result.rows.map(row => {
//                 const dateFrom = row.date ? formatDate(row.date) : '-';
//                 const timeFrom = row.time ? formatTime(row.time) : '-';
//                 const dateTo = row.change_date ? formatDate(row.change_date) : '-';
//                 const timeTo = row.change_time ? formatTime(row.change_time) : '-';
//                 return {
//                     patientName: row.patientName,
//                     dateFrom: dateFrom,
//                     timeFrom: timeFrom,
//                     dateTo: dateTo,
//                     timeTo: timeTo
//                 };
//             });
//             res.json(formattedResults);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(date);
// }

// function formatTime(timeString) {
//     // Check if the timeString is in the expected format
//     const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
//     if (!timeRegex.test(timeString)) {
//         return '-'; // Return a placeholder value if the time format is invalid
//     }

//     // Split the time string into hours, minutes, and seconds
//     const [hours, minutes, seconds] = timeString.split(':');

//     // Concatenate hours and minutes
//     const formattedTime = `${hours}:${minutes}`;

//     return formattedTime;
// }

// router.post('/appointmentRequestView', (req, res) => {
//     const therapist_id = req.body.therapist_id;
//     let query = `
//         SELECT
//             a.date,
//             a.time,
//             a.change_date,
//             a.change_time,
//             p.fname || ' ' || p.lname AS patientName
//         FROM
//             appointment_new2 a
//         JOIN
//             patient p ON a.patient_id = p.patient_id
//         WHERE
//             a.therapist_id = $1
//             AND a.confirm = 'W'
//         ORDER BY
//             a.date, a.time`;

//     const queryParams = [therapist_id];

//     client.query(query, queryParams)
//         .then(result => {
//             const formattedResults = result.rows.map(row => {
//                 const dateFrom = row.date ? formatDate(row.date) : '-';
//                 const timeFrom = row.time ? formatTime(row.time) : '-';
//                 const dateTo = row.change_date ? formatDate(row.change_date) : '-';
//                 const timeTo = row.change_time ? formatTime(row.change_time) : '-';
//                 return {
//                     patientName: row.patientName, // Corrected field name here
//                     dateFrom: dateFrom,
//                     timeFrom: timeFrom,
//                     dateTo: dateTo,
//                     timeTo: timeTo
//                 };
//             });
//             res.json(formattedResults);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(date);
// }

// function formatTime(timeString) {
//     // Check if the timeString is in the expected format
//     const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
//     if (!timeRegex.test(timeString)) {
//         return '-'; // Return a placeholder value if the time format is invalid
//     }

//     // Split the time string into hours, minutes, and seconds
//     const [hours, minutes, seconds] = timeString.split(':');

//     // Concatenate hours and minutes
//     const formattedTime = `${hours}:${minutes}`;

//     return formattedTime;
// }

// this api it work
// router.post('/appointmentRequestView', (req, res) => {
//     const therapist_id = req.body.therapist_id;
//     let query = `
//         SELECT
//             a.date,
//             a.time,
//             a.change_date,
//             a.change_time,
//             p.fname,
//             p.lname
//         FROM
//             appointment_new2 a
//         JOIN
//             patient p ON a.patient_id = p.patient_id
//         WHERE
//             a.therapist_id = $1
//             AND a.confirm = 'W'
//         ORDER BY
//             a.date, a.time`;

//     const queryParams = [therapist_id];

//     client.query(query, queryParams)
//         .then(result => {
//             const formattedResults = result.rows.map(row => {
//                 const dateFrom = row.date ? formatDate(row.date) : '-';
//                 const timeFrom = row.time ? formatTime(row.time) : '-';
//                 const dateTo = row.change_date ? formatDate(row.change_date) : '-';
//                 const timeTo = row.change_time ? formatTime(row.change_time) : '-';
//                 const patientName = row.fname + ' ' + row.lname; // Concatenate fname and lname to get the full name
//                 return {
//                     patientName: patientName,
//                     dateFrom: dateFrom,
//                     timeFrom: timeFrom,
//                     dateTo: dateTo,
//                     timeTo: timeTo
//                 };
//             });
//             res.json(formattedResults);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post("/appointmentRequestView", auth, (req, res) => {
  const therapist_id = req.body.therapist_id;
  let query = `
        SELECT 
            a.date,
            a.time,
            a.change_date,
            a.change_time,
            p.fname,
            p.lname,
            a.patient_id
        FROM 
            appointment_new2 a
        JOIN 
            patient p ON a.patient_id = p.patient_id
        WHERE 
            a.therapist_id = $1
            AND a.confirm = 'W'
        ORDER BY 
            a.date, a.time`;

  const queryParams = [therapist_id];

  client
    .query(query, queryParams)
    .then((result) => {
      const formattedResults = result.rows.map((row) => {
        const dateFrom = row.date ? formatDate(row.date) : "-";
        const timeFrom = row.time ? formatTime(row.time) : "-";
        const dateTo = row.change_date ? formatDate(row.change_date) : "-";
        const timeTo = row.change_time ? formatTime(row.change_time) : "-";
        const patientName = row.fname + " " + row.lname; // Concatenate fname and lname to get the full name
        return {
          patientID: row.patient_id,
          patientName: patientName,
          dateFrom: dateFrom,
          timeFrom: timeFrom,
          dateTo: dateTo,
          timeTo: timeTo,
        };
      });
      res.json(formattedResults);
    })
    .catch((err) => {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(date);
// }

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function formatTime(timeString) {
  // Check if the timeString is in the expected format
  const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
  if (!timeRegex.test(timeString)) {
    return "-"; // Return a placeholder value if the time format is invalid
  }

  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeString.split(":");

  // Concatenate hours and minutes
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

// router.post('/appointmentRequestConfirm', (req, res) => {
//     const type = req.body.type; // Get the type from the JSON body
//     let query = 'SELECT no, question, options, test_name FROM questionnaire_new2';

//     // Check if the type is provided
//     if (type) {
//       query += ' WHERE test_name = $1';
//     }

//     query += ' ORDER BY no'; // Order by the "no" column

//     const queryParams = type ? [type] : [];

//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom || !confirm) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, timeFrom, and confirm are required' });
//     }

//     // Convert dateFrom and timeFrom to match database format
//     const formattedDateFrom = new Date(dateFrom).toISOString().split('T')[0];
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Construct SQL query based on confirm status
//     let query;
//     let queryParams;
//     if (confirm === 'Y') {
//         // Update appointment when confirmed
//         query = `UPDATE public.appointment_new2
//                  SET date = $1,
//                      time = $2,
//                      confirm = $3,
//                      change_date = $4,
//                      change_time = $5
//                  WHERE patient_id = $6 AND date = $7 AND time = $8`;
//         queryParams = [formattedDateFrom, formattedTimeFrom, confirm, dateTo, timeTo, patientID, formattedDateFrom, formattedTimeFrom];
//     } else if (confirm === 'N') {
//         // Store data when not confirmed
//         query = `UPDATE public.appointment_new2
//                  SET confirm = $1
//                  WHERE patient_id = $2 AND date = $3 AND time = $4`;
//         queryParams = [confirm, patientID, formattedDateFrom, formattedTimeFrom];
//     } else {
//         return res.status(400).json({ error: 'Invalid confirmation status' });
//     }

//     // Execute the query
//     client.query(query, queryParams)
//         .then(result => {
//             res.json({ message: 'Appointment updated successfully' });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom || !confirm) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, timeFrom, and confirm are required' });
//     }

//     // Convert dateFrom and timeFrom to match database format
//     const formattedDateFrom = new Date(dateFrom).toISOString().split('T')[0];
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Construct SQL query based on confirm status
//     let query;
//     let queryParams;
//     if (confirm === 'Y') {
//         // Update appointment when confirmed
//         query = `UPDATE public.appointment_new2
//                  SET date = $1,
//                      time = $2,
//                      confirm = $3,
//                      change_date = $4,
//                      change_time = $5
//                  WHERE (patient_id = $6 AND date = $7 AND time = $8) OR (confirm = 'W')`;
//         queryParams = [formattedDateFrom, formattedTimeFrom, confirm, dateTo, timeTo, patientID, formattedDateFrom, formattedTimeFrom];
//     } else if (confirm === 'N') {
//         // Store data when not confirmed
//         query = `UPDATE public.appointment_new2
//                  SET confirm = $1
//                  WHERE patient_id = $2 AND date = $3 AND time = $4`;
//         queryParams = [confirm, patientID, formattedDateFrom, formattedTimeFrom];
//     } else {
//         return res.status(400).json({ error: 'Invalid confirmation status' });
//     }

//     // Execute the query
//     client.query(query, queryParams)
//         .then(result => {
//             res.json({ message: 'Appointment updated successfully' });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom || !confirm) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, timeFrom, and confirm are required' });
//     }

//     // Convert dateFrom and timeFrom to match database format
//     const formattedDateFrom = new Date(dateFrom).toISOString().split('T')[0];
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Construct SQL query based on confirm status
//     let query;
//     let queryParams;
//     if (confirm === 'Y') {
//         // Update appointment when confirmed
//         query = `UPDATE public.appointment_new2
//                  SET confirm = $1,
//                      change_date = $2,
//                      change_time = $3
//                  WHERE patient_id = $4 AND date = $5 AND time = $6`;
//         queryParams = [confirm, formattedDateFrom, formattedTimeFrom, patientID, formattedDateFrom, formattedTimeFrom];
//     } else if (confirm === 'N') {
//         // Store data when not confirmed
//         query = `UPDATE public.appointment_new2
//                  SET confirm = $1
//                  WHERE patient_id = $2 AND date = $3 AND time = $4`;
//         queryParams = [confirm, patientID, formattedDateFrom, formattedTimeFrom];
//     } else {
//         return res.status(400).json({ error: 'Invalid confirmation status' });
//     }

//     // Execute the query
//     client.query(query, queryParams)
//         .then(result => {
//             res.json({ message: 'Appointment updated successfully' });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, and timeFrom are required' });
//     }

//     // Convert dateFrom and timeFrom to match database format
//     const formattedDateFrom = new Date(dateFrom).toISOString().split('T')[0];
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Construct SQL query to update data only when confirm is 'W' in the database
//     const query = `UPDATE public.appointment_new2
//                    SET confirm = $1,
//                        change_date = $2,
//                        change_time = $3
//                    WHERE confirm = 'W' AND patient_id = $4 AND date = $5 AND time = $6`;
//     const queryParams = [confirm, formattedDateFrom, formattedTimeFrom, patientID, formattedDateFrom, formattedTimeFrom];

//     // Execute the query
//     client.query(query, queryParams)
//         .then(result => {
//             // Check if any row was updated
//             if (result.rowCount > 0) {
//                 res.json({ message: 'Appointment updated successfully' });
//             } else {
//                 res.status(404).json({ error: 'No appointment found with confirm status "W"' });
//             }
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// const months = {
//     Jan: '01',
//     Feb: '02',
//     Mar: '03',
//     Apr: '04',
//     May: '05',
//     Jun: '06',
//     Jul: '07',
//     Aug: '08',
//     Sep: '09',
//     Oct: '10',
//     Nov: '11',
//     Dec: '12'
// };

// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, and timeFrom are required' });
//     }

//     // Split the dateFrom string and extract day, month, and year
//     const dateParts = dateFrom.split(/[\s,]+/).filter(part => !!part); // Split by space or comma and remove empty parts
//     if (dateParts.length !== 4) {
//         return res.status(400).json({ error: 'Invalid date format' });
//     }
//     const day = dateParts[2]; // Day is the third element
//     const month = months[dateParts[1]]; // Month is the second element, mapped to MM format
//     const year = dateParts[3]; // Year is the fourth element

//     // Format date and time to match database format
//     const formattedDateFrom = `${year}-${month}-${day}`;
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Construct SQL query to update data only when confirm is 'W' in the database
//     const query = `UPDATE public.appointment_new2
//                    SET confirm = $1,
//                        change_date = $2,
//                        change_time = $3
//                    WHERE confirm = 'W' AND patient_id = $4 AND date = $5 AND time = $6`;
//     const queryParams = [confirm, formattedDateFrom, formattedTimeFrom, patientID, formattedDateFrom, formattedTimeFrom];

//     // Execute the query
//     client.query(query, queryParams)
//         .then(result => {
//             // Check if any row was updated
//             if (result.rowCount > 0) {
//                 res.json({ message: 'Appointment updated successfully' });
//             } else {
//                 res.status(404).json({ error: 'No appointment found with confirm status "W"' });
//             }
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// const months = {
//     Jan: '01',
//     Feb: '02',
//     Mar: '03',
//     Apr: '04',
//     May: '05',
//     Jun: '06',
//     Jul: '07',
//     Aug: '08',
//     Sep: '09',
//     Oct: '10',
//     Nov: '11',
//     Dec: '12'
// };

// //This api it work when confirm but change_date and change_time is not finish.
// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, and timeFrom are required' });
//     }

//     // Split the dateFrom string and extract day, month, and year
//     const dateParts = dateFrom.split(/[\s,]+/).filter(part => !!part); // Split by space or comma and remove empty parts
//     if (dateParts.length !== 4) {
//         return res.status(400).json({ error: 'Invalid date format' });
//     }
//     const day = dateParts[2]; // Day is the third element
//     const month = months[dateParts[1]]; // Month is the second element, mapped to MM format
//     const year = dateParts[3]; // Year is the fourth element

//     // Format date and time to match database format
//     const formattedDateFrom = `${year}-${month}-${day}`;
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Construct SQL query to update data only when confirm is 'W' in the database
//     const query = `UPDATE public.appointment_new2
//                    SET confirm = $1
//                    WHERE confirm = 'W' AND patient_id = $2 AND date = $3 AND time = $4`;
//     const queryParams = [confirm, patientID, formattedDateFrom, formattedTimeFrom];

//     // Execute the query
//     client.query(query, queryParams)
//         .then(result => {
//             // Check if any row was updated
//             if (result.rowCount > 0) {
//                 res.json({ message: 'Appointment updated successfully' });
//             } else {
//                 res.status(404).json({ error: 'No appointment found with confirm status "W"' });
//             }
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// const months = {
//     Jan: '01',
//     Feb: '02',
//     Mar: '03',
//     Apr: '04',
//     May: '05',
//     Jun: '06',
//     Jul: '07',
//     Aug: '08',
//     Sep: '09',
//     Oct: '10',
//     Nov: '11',
//     Dec: '12'
// };

// //This api can update data at column "confirm" and can check "change_date" and "change_time"
// router.post('/appointmentRequestConfirm', (req, res) => {
//     // Directly extract appointment data from the request body
//     const { patientID, patientName, dateFrom, timeFrom, dateTo, timeTo, confirm } = req.body;

//     // Check if appointmentData is provided
//     if (!patientID || !dateFrom || !timeFrom) {
//         return res.status(400).json({ error: 'Patient ID, dateFrom, and timeFrom are required' });
//     }

//     // Split the dateFrom string and extract day, month, and year
//     const datePartsFrom = dateFrom.split(/[\s,]+/).filter(part => !!part); // Split by space or comma and remove empty parts
//     if (datePartsFrom.length !== 4) {
//         return res.status(400).json({ error: 'Invalid date format for dateFrom' });
//     }
//     const dayFrom = datePartsFrom[2]; // Day is the third element
//     const monthFrom = months[datePartsFrom[1]]; // Month is the second element, mapped to MM format
//     const yearFrom = datePartsFrom[3]; // Year is the fourth element

//     // Format date and time to match database format for dateFrom
//     const formattedDateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`;
//     const formattedTimeFrom = `${timeFrom}:00`;

//     // Split the dateTo string and extract day, month, and year
//     const datePartsTo = dateTo.split(/[\s,]+/).filter(part => !!part); // Split by space or comma and remove empty parts
//     if (datePartsTo.length !== 4) {
//         return res.status(400).json({ error: 'Invalid date format for dateTo' });
//     }
//     const dayTo = datePartsTo[2]; // Day is the third element
//     const monthTo = months[datePartsTo[1]]; // Month is the second element, mapped to MM format
//     const yearTo = datePartsTo[3]; // Year is the fourth element

//     // Format date and time to match database format for dateTo
//     const formattedDateTo = `${yearTo}-${monthTo}-${dayTo}`;
//     const formattedTimeTo = `${timeTo}:00`;

//     // Check if the confirmation status is 'W' and dateTo and timeTo match change_date and change_time
//     if (confirm === 'Y') {
//         const query = `UPDATE public.appointment_new2
//                        SET confirm = 'Y',
//                            date = $1,
//                            time = $2
//                        WHERE confirm = 'W' AND patient_id = $3 AND date = $4 AND time = $5 AND change_date = $6 AND change_time = $7`;
//         const queryParams = [formattedDateTo, formattedTimeTo, patientID, formattedDateFrom, formattedTimeFrom, formattedDateTo, formattedTimeTo];

//         // Execute the query
//         client.query(query, queryParams)
//             .then(result => {
//                 // Check if any row was updated
//                 if (result.rowCount > 0) {
//                     res.json({ message: 'Appointment updated successfully' });
//                 } else {
//                     res.status(404).json({ error: 'No appointment found with confirm status "W" and matching dateTo and timeTo' });
//                 }
//             })
//             .catch(err => {
//                 console.error('Error executing query:', err);
//                 res.status(500).json({ error: 'An error occurred' });
//             });
//     } else if (confirm === 'N') {
//         // If the confirmation status is 'N', update confirm directly
//         const query = `UPDATE public.appointment_new2
//                        SET confirm = 'N'
//                        WHERE confirm = 'W' AND patient_id = $1 AND date = $2 AND time = $3`;
//         const queryParams = [patientID, formattedDateFrom, formattedTimeFrom];

//         // Execute the query
//         client.query(query, queryParams)
//             .then(result => {
//                 // Check if any row was updated
//                 if (result.rowCount > 0) {
//                     res.json({ message: 'Appointment updated successfully' });
//                 } else {
//                     res.status(404).json({ error: 'No appointment found with confirm status "W"' });
//                 }
//             })
//             .catch(err => {
//                 console.error('Error executing query:', err);
//                 res.status(500).json({ error: 'An error occurred' });
//             });
//     } else {
//         // If confirm is not 'W' or 'N', return error
//         res.status(400).json({ error: 'Invalid confirmation status. Confirmation status must be either "W" or "N".' });
//     }
// });

const months = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

router.post("/appointmentRequestConfirm", auth, (req, res) => {
  // Directly extract appointment data from the request body
  const {
    patientID,
    patientName,
    dateFrom,
    timeFrom,
    dateTo,
    timeTo,
    confirm,
  } = req.body;

  // Check if appointmentData is provided
  if (!patientID || !dateFrom || !timeFrom || !confirm) {
    return res
      .status(400)
      .json({
        error: "Patient ID, dateFrom, timeFrom, and confirm are required",
      });
  }

  // Split the dateFrom string and extract day, month, and year
  const datePartsFrom = dateFrom.split(/[\s,]+/).filter((part) => !!part); // Split by space or comma and remove empty parts
  if (datePartsFrom.length !== 4) {
    return res.status(400).json({ error: "Invalid date format for dateFrom" });
  }
  const dayFrom = datePartsFrom[2]; // Day is the third element
  const monthFrom = months[datePartsFrom[1]]; // Month is the second element, mapped to MM format
  const yearFrom = datePartsFrom[3]; // Year is the fourth element

  // Format date and time to match database format for dateFrom
  const formattedDateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`;
  const formattedTimeFrom = `${timeFrom}:00`;

  if (dateTo !== "-" && timeTo !== "-") {
    // This is the second type of request with both dateTo and timeTo provided
    // Split the dateTo string and extract day, month, and year
    const datePartsTo = dateTo.split(/[\s,]+/).filter((part) => !!part); // Split by space or comma and remove empty parts
    if (datePartsTo.length !== 4) {
      return res.status(400).json({ error: "Invalid date format for dateTo" });
    }
    const dayTo = datePartsTo[2]; // Day is the third element
    const monthTo = months[datePartsTo[1]]; // Month is the second element, mapped to MM format
    const yearTo = datePartsTo[3]; // Year is the fourth element

    // Format date and time to match database format for dateTo
    const formattedDateTo = `${yearTo}-${monthTo}-${dayTo}`;
    const formattedTimeTo = `${timeTo}:00`;

    // Check if the confirmation status is 'Y' and dateTo and timeTo match change_date and change_time
    if (confirm === "Y") {
      const query = `UPDATE public.appointment_new2 
                           SET confirm = 'Y', 
                               date = $1,
                               time = $2
                           WHERE confirm = 'W' AND patient_id = $3 AND date = $4 AND time = $5 AND change_date = $6 AND change_time = $7`;
      const queryParams = [
        formattedDateTo,
        formattedTimeTo,
        patientID,
        formattedDateFrom,
        formattedTimeFrom,
        formattedDateTo,
        formattedTimeTo,
      ];

      // Execute the query
      client
        .query(query, queryParams)
        .then((result) => {
          // Check if any row was updated
          if (result.rowCount > 0) {
            res.json({ message: "Appointment updated successfully" });
          } else {
            res
              .status(404)
              .json({
                error:
                  'No appointment found with confirm status "W" and matching dateTo and timeTo',
              });
          }
        })
        .catch((err) => {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "An error occurred" });
        });
    } else if (confirm === "N") {
      // If the confirmation status is 'N', update confirm directly
      const query = `UPDATE public.appointment_new2 
                           SET confirm = 'N'
                           WHERE confirm = 'W' AND patient_id = $1 AND date = $2 AND time = $3`;
      const queryParams = [patientID, formattedDateFrom, formattedTimeFrom];

      // Execute the query
      client
        .query(query, queryParams)
        .then((result) => {
          // Check if any row was updated
          if (result.rowCount > 0) {
            res.json({ message: "Appointment updated successfully" });
          } else {
            res
              .status(404)
              .json({ error: 'No appointment found with confirm status "W"' });
          }
        })
        .catch((err) => {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "An error occurred" });
        });
    } else {
      // If confirm is not 'W' or 'N', return error
      res
        .status(400)
        .json({
          error:
            'Invalid confirmation status. Confirmation status must be either "W" or "N".',
        });
    }
  } else {
    // This is the first type of request without dateTo and timeTo provided
    // Construct SQL query to update data only when confirm is 'W' in the database
    const query = `UPDATE public.appointment_new2 
                       SET confirm = $1
                       WHERE confirm = 'W' AND patient_id = $2 AND date = $3 AND time = $4`;
    const queryParams = [
      confirm,
      patientID,
      formattedDateFrom,
      formattedTimeFrom,
    ];

    // Execute the query
    client
      .query(query, queryParams)
      .then((result) => {
        // Check if any row was updated
        if (result.rowCount > 0) {
          res.json({ message: "Appointment updated successfully" });
        } else {
          res
            .status(404)
            .json({ error: 'No appointment found with confirm status "W"' });
        }
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "An error occurred" });
      });
  }
});

// router.post('/appointShowTime', (req, res) => {
//   const patientID = req.body.patientID;
//   const date = req.body.date; // Assuming date is sent in the request body
//   const startHour = 8; // Start hour for available appointments
//   const endHour = 16; // End hour for available appointments

//   // Query to retrieve therapist_id associated with the provided patientID
//   const therapistQuery = 'SELECT DISTINCT therapist_id FROM public.appointment_new2 WHERE patient_id = $1';
//   const therapistQueryParams = [patientID];

//   client.query(therapistQuery, therapistQueryParams)
//     .then(therapistResult => {
//       const therapistIDs = therapistResult.rows.map(row => row.therapist_id);

//       // Query to retrieve existing appointments for the specified date, therapistID, and confirm column containing "W" or "Y"
//       const query = `SELECT "time" FROM public.appointment_new2 WHERE date = $1 AND therapist_id = ANY($2::int[]) AND confirm IN ($3, $4)`;
//       const queryParams = [date, therapistIDs, "W", "Y"];

//       client.query(query, queryParams)
//         .then(result => {
//           // Extract existing appointment times
//           const existingTimes = result.rows.map(row => row.time);

//           // Generate available appointment times
//           const availableTimes = [];
//           for (let hour = startHour; hour < endHour; hour++) {
//             const startTime = `${hour.toString().padStart(2, '0')}:00`;
//             const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
//             const name = `${startTime}-${endTime} `;
//             // Check if the time range is available, not "12:00", and not already in existing appointments
//             if (startTime !== '12:00' && !existingTimes.find(existingTime => existingTime >= startTime && existingTime < endTime)) {
//               availableTimes.push({ id: availableTimes.length + 1, name, value: startTime });
//             }
//           }

//           // Check if all appointment slots are full
//           const isFull = availableTimes.length === 0;

//           // Send response based on availability
//           if (isFull) {
//             res.json("-");
//           } else {
//             res.json(availableTimes);
//           }
//         })
//         .catch(err => {
//           console.error('Error executing query:', err);
//           res.status(500).json({ error: 'An error occurred' });
//         });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/appointShowTime', (req, res) => {
  const therapistID = req.body.therapistID; // Get therapistID from the request body
  const date = req.body.date; // Assuming date is sent in the request body
  const startHour = 8; // Start hour for available appointments
  const endHour = 16; // End hour for available appointments

  // Query to retrieve existing appointments for the specified date, therapistID, and confirm column containing "W" or "Y"
  const query = `
    SELECT "time" 
    FROM public.appointment_new2 
    WHERE date = $1 AND therapist_id = $2 AND confirm IN ($3, $4)
  `;
  const queryParams = [date, therapistID, "W", "Y"];

  client.query(query, queryParams)
    .then(result => {
      // Extract existing appointment times
      const existingTimes = result.rows.map(row => row.time);

      // Generate available appointment times
      const availableTimes = [];
      for (let hour = startHour; hour < endHour; hour++) {
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
        const name = `${startTime}-${endTime} `;
        // Check if the time range is available, not "12:00", and not already in existing appointments
        if (startTime !== '12:00' && !existingTimes.find(existingTime => existingTime >= startTime && existingTime < endTime)) {
          availableTimes.push({ id: availableTimes.length + 1, name, value: startTime });
        }
      }

      // Check if all appointment slots are full
      const isFull = availableTimes.length === 0;

      // Send response based on availability
      if (isFull) {
        res.json("-");
      } else {
        res.json(availableTimes);
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


module.exports = router;
