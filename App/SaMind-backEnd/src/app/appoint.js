const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const auth = require('./auth.js').authorization;

// Use bodyParser middleware to parse JSON in the request body
router.use(bodyParser.json());

// router.post('/appoint_post_byAdmin', (req, res) => {
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


//API get data appointment
// router.post('/appointConfig', (req, res) => {
//   const patient_id = req.query.patient_id;
//   let query = 'SELECT * FROM patient';

//   // Check if the id parameter is provided
//   if (patient_id) {
//     query += ' WHERE patient_id = $1';
//   }

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

router.post('/appointConfig', auth, (req, res) => {
  const patientId = req.body.patientId; // Accessing patientId from req.body
  let query = `
    SELECT 
      CONCAT(p.fname, ' ', p.lname) AS "patientName",
      CONCAT(t.fname, ' ', t.lname) AS "therapistName",
      p.phone AS "patientPhone"
    FROM 
      patient p
    LEFT JOIN 
      therapist t ON p.therapist_id = t.therapist_id
    WHERE p.patient_id = $1`; // Moved condition to WHERE clause

  const queryParams = [patientId]; // Always use an array for parameters

  client.query(query, queryParams)
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]); // Return the first row only
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Show time 
// router.post('/appointShowTime', (req, res) => {
//   const date = req.body.date; // Assuming date is sent in the request body
//   const startHour = 8; // Start hour for available appointments
//   const endHour = 16; // End hour for available appointments

//   // Query to retrieve existing appointments for the specified date
//   const query = 'SELECT "time" FROM public.appointment_new2 WHERE date = $1';
//   const queryParams = [date];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract existing appointment times
//       const existingTimes = result.rows.map(row => row.time);

//       // Generate available appointment times
//       const availableTimes = [];
//       for (let hour = startHour; hour < endHour; hour++) {
//         const time = `${hour.toString().padStart(2, '0')}:00`;
//         // Check if the time is available and not already in existing appointments
//         if (time !== '12:00' && !existingTimes.includes(time)) {
//           availableTimes.push(time);
//         }
//       }

//       // Check if all appointment slots are full
//       const isFull = availableTimes.length === 0;

//       // Send response based on availability
//       if (isFull) {
//         res.json({ time: "Time is full" });
//       } else {
//         res.json({ time: availableTimes });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appointShowTime', (req, res) => {
//   const date = req.body.date; // Assuming date is sent in the request body
//   const startHour = 8; // Start hour for available appointments
//   const endHour = 16; // End hour for available appointments

//   // Query to retrieve existing appointments for the specified date and confirm column containing "W"
//   const query = 'SELECT "time" FROM public.appointment_new2 WHERE date = $1 AND confirm = $2';
//   const queryParams = [date, "W"];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract existing appointment times
//       const existingTimes = result.rows.map(row => row.time);

//       // Generate available appointment times
//       const availableTimes = [];
//       for (let hour = startHour; hour < endHour; hour++) {
//         const time = `${hour.toString().padStart(2, '0')}:00`;
//         // Check if the time is available and not already in existing appointments
//         if (time !== '12:00' && !existingTimes.includes(time)) {
//           availableTimes.push(time);
//         }
//       }

//       // Check if all appointment slots are full
//       const isFull = availableTimes.length === 0;

//       // Send response based on availability
//       if (isFull) {
//         res.json({ time: "Time is full" });
//       } else {
//         res.json({ time: availableTimes });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appointShowTime', (req, res) => {
//   const date = req.body.date; // Assuming date is sent in the request body
//   const startHour = 8; // Start hour for available appointments
//   const endHour = 16; // End hour for available appointments

//   // Query to retrieve existing appointments for the specified date and confirm column containing "W"
//   const query = 'SELECT "time" FROM public.appointment_new2 WHERE date = $1 AND confirm = $2';
//   const queryParams = [date, "W"];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract existing appointment times
//       const existingTimes = result.rows.map(row => row.time);

//       // Generate available appointment times
//       const availableTimes = [];
//       for (let hour = startHour; hour < endHour; hour++) {
//         const time = `${hour.toString().padStart(2, '0')}:00`;
//         // Check if the time is available and not already in existing appointments
//         if (time !== '12:00' && !existingTimes.find(existingTime => existingTime.startsWith(time))) {
//           availableTimes.push(time);
//         }
//       }

//       // Check if all appointment slots are full
//       const isFull = availableTimes.length === 0;

//       // Send response based on availability
//       if (isFull) {
//         res.json({ time: "Time is full" });
//       } else {
//         res.json({ time: availableTimes });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appointShowTime', (req, res) => {
//   const date = req.body.date; // Assuming date is sent in the request body
//   const startHour = 8; // Start hour for available appointments
//   const endHour = 16; // End hour for available appointments

//   // Query to retrieve existing appointments for the specified date and confirm column containing "W" or "Y"
//   const query = 'SELECT "time" FROM public.appointment_new2 WHERE date = $1 AND confirm IN ($2, $3)';
//   const queryParams = [date, "W", "Y"];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract existing appointment times
//       const existingTimes = result.rows.map(row => row.time);

//       // Generate available appointment times
//       const availableTimes = [];
//       for (let hour = startHour; hour < endHour; hour++) {
//         const time = `${hour.toString().padStart(2, '0')}:00`;
//         // Check if the time is available and not already in existing appointments
//         if (time !== '12:00' && !existingTimes.find(existingTime => existingTime.startsWith(time))) {
//           availableTimes.push(time);
//         }
//       }

//       // Check if all appointment slots are full
//       const isFull = availableTimes.length === 0;

//       // Send response based on availability
//       if (isFull) {
//         res.json({ time: "Time is full" });
//       } else {
//         res.json({ time: availableTimes });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// old api can use
// router.post('/appointShowTime', (req, res) => {
//   const date = req.body.date; // Assuming date is sent in the request body
//   const startHour = 8; // Start hour for available appointments
//   const endHour = 16; // End hour for available appointments

//   // Query to retrieve existing appointments for the specified date and confirm column containing "W" or "Y"
//   const query = 'SELECT "time" FROM public.appointment_new2 WHERE date = $1 AND confirm IN ($2, $3)';
//   const queryParams = [date, "W", "Y"];

//   client.query(query, queryParams)
//     .then(result => {
//       // Extract existing appointment times
//       const existingTimes = result.rows.map(row => row.time);

//       // Generate available appointment times
//       const availableTimes = [];
//       for (let hour = startHour; hour < endHour; hour++) {
//         const startTime = `${hour.toString().padStart(2, '0')}:00`;
//         const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
//         const name = `${startTime}-${endTime} `;
//         // Check if the time range is available, not "12:00", and not already in existing appointments
//         if (startTime !== '12:00' && !existingTimes.find(existingTime => existingTime >= startTime && existingTime < endTime)) {
//           availableTimes.push({ id: availableTimes.length + 1, name, value: startTime });
//         }
//       }

//       // Check if all appointment slots are full
//       const isFull = availableTimes.length === 0;

//       // Send response based on availability
//       if (isFull) {
//         res.json("-");
//       } else {
//         res.json(availableTimes);
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/appointShowTime', (req, res) => {
  const patientID = req.body.patientID;
  const date = req.body.date; // Assuming date is sent in the request body
  const startHour = 8; // Start hour for available appointments
  const endHour = 16; // End hour for available appointments

  // Query to retrieve therapist_id associated with the provided patientID
  const therapistQuery = 'SELECT DISTINCT therapist_id FROM public.appointment_new2 WHERE patient_id = $1';
  const therapistQueryParams = [patientID];

  client.query(therapistQuery, therapistQueryParams)
    .then(therapistResult => {
      const therapistIDs = therapistResult.rows.map(row => row.therapist_id);
      console.log(therapistIDs)
      // Query to retrieve existing appointments for the specified date, therapistID, and confirm column containing "W" or "Y"
      const query = `SELECT "time" FROM public.appointment_new2 WHERE date = $1 AND therapist_id = ANY($2::int[]) AND confirm IN ($3, $4, $5)`;
      const queryParams = [date, therapistIDs, "PP","NA", "Y"];

      client.query(query, queryParams)
        .then(result => {
          // Extract existing appointment times
          const existingTimes = result.rows.map(row => row.time);
          console.log(existingTimes)
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
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/appointShowTimeChange',auth, (req, res) => {
  const patientID = req.body.patientID;
  const date = req.body.date;
  const predefinedTimes = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
  let therapistIDs; // Declare therapistIDs in the outer scope

  // Step 1: Retrieve therapist_id associated with the patientID
  const therapistQuery = 'SELECT DISTINCT therapist_id FROM public.appointment_new2 WHERE patient_id = $1';
  const therapistQueryParams = [patientID];

  client.query(therapistQuery, therapistQueryParams)
    .then(therapistResult => {
      therapistIDs = therapistResult.rows.map(row => row.therapist_id); // Assign therapistIDs

      // Step 2: Query regular appointment times for the specified date and therapistIDs
      const regularQuery = `
        SELECT "time" FROM public.appointment_new2 
        WHERE date = $1 AND therapist_id = ANY($2::int[])
      `;
      const regularQueryParams = [date, therapistIDs];

      // Step 3: Execute the query for regular appointment times
      return client.query(regularQuery, regularQueryParams);
    })
    .then(regularResult => {
      const regularTimes = regularResult.rows.map(row => row.time).filter(time => time !== null);

      // Step 4: Query changed appointment times for the specified date and therapistIDs
      const changedQuery = `
        SELECT "change_time" FROM public.appointment_new2 
        WHERE change_date = $1 AND therapist_id = ANY($2::int[])
      `;
      const changedQueryParams = [date, therapistIDs];

      // Step 5: Execute the query for changed appointment times
      return client.query(changedQuery, changedQueryParams)
        .then(changedResult => {
          const changedTimes = changedResult.rows.map(row => row.change_time).filter(time => time !== null);

          // Step 6: Combine regular and changed appointment times
          const existingTimes = [...regularTimes, ...changedTimes]
            .map(time => time.split(":").slice(0, 2).join(":")); // Extract HH:MM

          // Step 7: Find available appointment times
          const availableTimes = predefinedTimes.filter(time => !existingTimes.includes(time))
            .map((time, index) => ({
              id: index + 1,
              name: `${time}-${parseInt(time) + 1}:00 `,
              value: time
            }));

          // Step 8: Respond with available appointment times or "-"
          if (availableTimes.length > 0) {
            res.json(availableTimes);
          } else {
            res.json("-");
          }
        });
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// select appointmet
// router.post('/appointSelect', (req, res) => {
//   const patient_id = req.query.patient_id;
//   let query = 'SELECT * FROM patient';

//   // Check if the id parameter is provided
//   if (patient_id) {
//     query += ' WHERE patient_id = $1';
//   }

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

// router.post('/appointSelect', (req, res) => {
//   // Extract data from the request body
//   const { patientId, patientName, therapistName, patientPhone, date, time } = req.body;

//   // Convert date format to 'YYYY-MM-DD'
//   const formattedDate = formatDate(date);

//   // Prepare the INSERT query for appointment_new2 table
//   const query = `
//     INSERT INTO public.appointment_new2 (
//       appointment_id, therapist_id, patient_id, date, time, location,
//       description, confirm, active_flag, create_by, create_date, update_by, update_date
//     )
//     VALUES (
//       NEXTVAL('appointment_id_seq'), 
//       (SELECT therapist_id FROM public.patient WHERE fname || ' ' || lname = $1), 
//       $2, $3, $4, 
//       (SELECT hospital_name FROM public.patient WHERE patient_id = $2), 
//       null, 'W', 'Y', $1, 
//       NOW() + interval '7 hours', 
//       $1, 
//       NOW() + interval '7 hours'
//     )`;

//   // Execute the query
//   client.query(query, [therapistName, patientId, formattedDate, time])
//     .then(result => {
//       res.status(201).json({ message: 'Appointment created successfully' });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Function to format date as 'YYYY-MM-DD'
// function formatDate(date) {
//   const parts = date.split('-');
//   return `${parts[2]}-${parts[1]}-${parts[0]}`;
// }

// router.post('/appointSelect', (req, res) => {
//   // Extract data from the request body
//   const { patientId, date, time } = req.body;

//   // Validate time format
//   if (!isValidTimeFormat(time)) {
//     return res.status(400).json({ error: "Invalid time format provided" });
//   }

//   // Convert date format to 'YYYY-MM-DD'
//   const formattedDate = formatDate(date);

//   // Convert time format to 'HH:MM:SS'
//   const formattedTime = formatTime(time);

//   // Check if formattedTime is valid
//   if (!formattedTime) {
//     return res.status(400).json({ error: "Invalid time provided" });
//   }

//   // Prepare the INSERT query for appointment_new2 table
//   // Prepare the INSERT query for appointment_new2 table
//   const query = `
//     INSERT INTO public.appointment_new2 (
//       appointment_id, therapist_id, patient_id, date, time, location,
//       description, confirm, active_flag, create_by, create_date, update_by, update_date
//     )
//     VALUES (
//       NEXTVAL('appointment_id_seq'), 
//       (SELECT therapist_id FROM public.patient WHERE patient_id = $1), 
//       $2, $3, $4, 
//       (SELECT hospital_name FROM public.patient WHERE patient_id = $2), 
//       null, 'W', 'Y', $1, 
//       TO_CHAR(NOW() + interval '7 hours', 'YYYY-MM-DD HH24:MI:SS'), -- Adjusted to add 7 hours and format
//       $1, 
//       TO_CHAR(NOW() + interval '7 hours', 'YYYY-MM-DD HH24:MI:SS') -- Adjusted to add 7 hours and format
//     )`;

//   // Execute the query
//   client
//     .query(query, [patientId, patientId, formattedDate, formattedTime])
//     .then((result) => {
//       res.status(201).json({ message: "Appointment created successfully" });
//     })
//     .catch((err) => {
//       console.error("Error executing query:", err);
//       res.status(500).json({ error: "An error occurred" });
//     });
// });

// // Function to validate time format (expects format like "11.00")
// function isValidTimeFormat(time) {
//   return /^\d{1,2}:\d{2}$/.test(time);
// }


// // Function to format date as 'YYYY-MM-DD'
// function formatDate(date) {
//   const parts = date.split('-');
//   return `${parts[2]}-${parts[1]}-${parts[0]}`;
// }

// function formatTime(time) {
//   return `${time}:00`; // Append seconds to match the 'HH:MM:SS' format
// }

// router.post('/appointSelect', (req, res) => {
//   // Extract data from the request body
//   const { patientId, date, time } = req.body;

//   // Validate time format
//   if (!isValidTimeFormat(time)) {
//     return res.status(400).json({ error: "Invalid time format provided" });
//   }

//   // Convert date format to 'YYYY-MM-DD'
//   const formattedDate = formatDate(date);

//   // Convert time format to 'HH:MM:SS'
//   const formattedTime = formatTime(time);

//   // Check if formattedTime is valid
//   if (!formattedTime) {
//     return res.status(400).json({ error: "Invalid time provided" });
//   }

//   // Prepare the INSERT query for appointment_new2 table
//   const query = `
//     INSERT INTO public.appointment_new2 (
//       appointment_id, therapist_id, patient_id, date, time, location,
//       description, confirm, active_flag, create_by, create_date, update_by, update_date
//     )
//     VALUES (
//       NEXTVAL('appointment_id_seq'), 
//       (SELECT therapist_id FROM public.patient WHERE patient_id = $1), 
//       $2, $3, $4, 
//       (SELECT hospital_name FROM public.patient WHERE patient_id = $2), 
//       null, 'W', 'Y', $1, 
//       NOW() + interval '7 hours', -- Adjusted to add 7 hours
//       $1, 
//       NOW() + interval '7 hours'   -- Adjusted to add 7 hours
//     )`;

//   // Execute the query
//   client
//     .query(query, [patientId, patientId, formattedDate, formattedTime])
//     .then((result) => {
//       res.status(201).json({ message: "Appointment created successfully" });
//     })
//     .catch((err) => {
//       console.error("Error executing query:", err);
//       res.status(500).json({ error: "An error occurred" });
//     });
// });

// // Function to validate time format (expects format like "11:00")
// function isValidTimeFormat(time) {
//   return /^\d{1,2}:\d{2}$/.test(time);
// }

// // Function to format date as 'YYYY-MM-DD'
// function formatDate(date) {
//   const parts = date.split('-');
//   return `${parts[2]}-${parts[1]}-${parts[0]}`;
// }

// function formatTime(time) {
//   return `${time}:00`; // Append seconds to match the 'HH:MM:SS' format
// }

router.post('/appointSelect',auth, (req, res) => {
  // Extract data from the request body
  const { patientId, date, time } = req.body;

  // Validate time format
  if (!isValidTimeFormat(time)) {
    return res.status(400).json({ error: "Invalid time format provided" });
  }

  // Convert date format to 'YYYY-MM-DD'
  const formattedDate = formatDate(date);

  // Convert time format to 'HH:MM:SS'
  const formattedTime = formatTime(time);

  // Check if formattedTime is valid
  if (!formattedTime) {
    return res.status(400).json({ error: "Invalid time provided" });
  }

  // Get the current timestamp in the desired time zone
  const currentDateTime = getCurrentDateTime();

  // Prepare the INSERT query for appointment_new2 table
  const query = `
    INSERT INTO public.appointment_new2 (
      appointment_id, therapist_id, patient_id, date, time, location,
      description, confirm, active_flag, create_by, create_date, update_by, update_date
    )
    VALUES (
      NEXTVAL('appointment_id_seq'), 
      (SELECT therapist_id FROM public.patient WHERE patient_id = $1), 
      $2, $3, $4, 
      (SELECT hospital_name FROM public.patient WHERE patient_id = $2), 
      null, 'NA', 'Y', $1, 
      $5, 
      $1, 
      $5
    )`;

  // Execute the query
  client
    .query(query, [patientId, patientId, formattedDate, formattedTime, currentDateTime])
    .then((result) => {
      res.status(201).json({ message: "Appointment created successfully" });
    })
    .catch((err) => {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Function to validate time format (expects format like "11:00")
function isValidTimeFormat(time) {
  return /^\d{1,2}:\d{2}$/.test(time);
}

// Function to format date as 'YYYY-MM-DD'
function formatDate(date) {
  const parts = date.split('-');
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function formatTime(time) {
  return `${time}:00`; // Append seconds to match the 'HH:MM:SS' format
}

// Function to get the current date and time adjusted to the desired time zone
function getCurrentDateTime() {
  const currentDate = new Date();
  // Adjust to the desired time zone offset (e.g., +7 hours)
  currentDate.setHours(currentDate.getHours() + 7);
  const formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  return formattedDateTime;
}

// router.post('/appointChangeDateTime', (req, res) => {
//   const id = req.query.id; // Get the id parameter from the query
//   let query = 'SELECT * FROM library';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE id = $1';
//   }

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

// router.post('/appointChangeDateTime', (req, res) => {
//   const { patientID, oldDate, newDate, newTime } = req.body;
  
//   // Check if patientID, oldDate, newDate, and newTime are provided
//   if (!patientID || !oldDate || !newDate || !newTime) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   // Check if newTime is in the correct format (HH:MM)
//   if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTime)) {
//     return res.status(400).json({ error: 'Invalid time format. Please use HH:MM format' });
//   }

//   // Check if oldDate is in the correct format (YYYY-MM-DD)
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(oldDate)) {
//     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
//   }

//   // Check if newDate is in the correct format (YYYY-MM-DD)
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
//     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
//   }

//   // Update data in the database
//   const updateQuery = `
//     UPDATE public.appointment_new2
//     SET change_date = $1, change_time = $2
//     WHERE patient_id = $3 AND date = $4
//   `;
  
//   const values = [newDate, newTime, patientID, oldDate];
  
//   client.query(updateQuery, values)
//     .then(result => {
//       res.json({ message: 'Data updated successfully' });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appointChangeDateTime', (req, res) => {
//   const { patientID, oldDate, newDate, newTime } = req.body;
  
//   // Check if patientID, oldDate, newDate, and newTime are provided
//   if (!patientID || !oldDate || !newDate || !newTime) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   // Check if newTime is in the correct format (HH:MM)
//   if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTime)) {
//     return res.status(400).json({ error: 'Invalid time format. Please use HH:MM format' });
//   }

//   // Check if oldDate is in the correct format (YYYY-MM-DD)
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(oldDate)) {
//     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
//   }

//   // Check if newDate is in the correct format (YYYY-MM-DD)
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
//     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
//   }

//   // Update data in the database
//   const updateQuery = `
//     UPDATE public.appointment_new2
//     SET 
//       change_date = $1, 
//       change_time = $2,
//       confirm = CASE 
//                   WHEN confirm = 'Y' THEN 'W' 
//                   ELSE confirm 
//                 END
//     WHERE patient_id = $3 AND date = $4 AND confirm != 'W'
//   `;
  
//   const values = [newDate, newTime, patientID, oldDate];
  
//   client.query(updateQuery, values)
//     .then(result => {
//       res.json({ message: 'Data updated successfully' });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/appointChangeDateTime', (req, res) => {
//   const { patientID, oldDate, newDate, newTime } = req.body;
  
//   // Check if patientID, oldDate, newDate, and newTime are provided
//   if (!patientID || !oldDate || !newDate || !newTime) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   // Check if newTime is in the correct format (HH:MM)
//   if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTime)) {
//     return res.status(400).json({ error: 'Invalid time format. Please use HH:MM format' });
//   }

//   // Check if oldDate is in the correct format (YYYY-MM-DD)
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(oldDate)) {
//     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
//   }

//   // Check if newDate is in the correct format (YYYY-MM-DD)
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
//     return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
//   }

//   // Get current date and time
//   const currentDate = getCurrentDateTime();

//   // Update data in the database
//   const updateQuery = `
//     UPDATE public.appointment_new2
//     SET 
//       change_date = $1, 
//       change_time = $2,
//       confirm = CASE 
//                   WHEN confirm = 'Y' THEN 'W' 
//                   ELSE confirm 
//                 END,
//       update_by = $3,
//       update_date = $4
//     WHERE patient_id = $5 AND date = $6 AND confirm != 'W'
//   `;
  
//   const values = [newDate, newTime, patientID, currentDate, patientID, oldDate];
  
//   client.query(updateQuery, values)
//     .then(result => {
//       res.json({ message: 'Data updated successfully' });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/appointChangeDateTime', (req, res) => {
  const { patientID, oldDate, newDate, newTime } = req.body;
  
  // Check if patientID, oldDate, newDate, and newTime are provided
  if (!patientID || !oldDate || !newDate || !newTime) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Check if newTime is in the correct format (HH:MM)
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTime)) {
    return res.status(400).json({ error: 'Invalid time format. Please use HH:MM format' });
  }

  // Check if oldDate is in the correct format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(oldDate)) {
    return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
  }

  // Check if newDate is in the correct format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
    return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format' });
  }

  // Get current date and time
  const currentDate = getCurrentDateTime();

  // Update data in the database
  const updateQuery = `
    UPDATE public.appointment_new2
    SET 
      change_date = $1, 
      change_time = $2,
      confirm = CASE 
                  WHEN confirm = 'Y' THEN 'PP'
                  ELSE confirm
                END,
      update_by = $3,
      update_date = $4
    WHERE patient_id = $5 AND date = $6 AND confirm IN ('Y', 'PP')
  `;
  
  const values = [newDate, newTime, patientID, currentDate, patientID, oldDate];
  
  client.query(updateQuery, values)
    .then(result => {
      res.json({ message: 'Data updated successfully' });
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Function to get current date and time
// function getCurrentDateTime() {
//   const currentDate = new Date();
//   // Adjust to the desired time zone offset (e.g., +7 hours)
//   currentDate.setHours(currentDate.getHours() + 7);
//   const formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
//   return formattedDateTime;
// }



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

// router.post('/appoint_post', auth, (req, res) => {
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
//     // Continue with the appointment creation using the provided appointment_id
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

//         // Use the provided appointment_id in the INSERT statement
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
// }

// router.post('/appoint_post', (req, res) => {
//   let { therapist_id, patient_id, date, time, create_by, confirm, type_appoint } = req.body;

//   if (!therapist_id || !patient_id || !date || !time) {
//     return res.status(400).json({ error: 'therapist_id, patient_id, date, and time are required fields.' });
//   }
 
//   // Continue with the appointment creation
//   generateAppointmentIdAndContinueCreation(therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
// });

// // Function to generate appointment_id and continue with the appointment creation
// function generateAppointmentIdAndContinueCreation(therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res) {
//   const generateAppointmentIdQuery = 'SELECT NEXTVAL(\'appointment_id_seq\') AS appointment_id';

//   client.query(generateAppointmentIdQuery)
//     .then(result => {
//       const appointment_id = result.rows[0].appointment_id;

//       // Continue with the appointment creation
//       continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res);
//     })
//     .catch(err => {
//       console.error('Error generating appointment_id:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// }

// // Function to continue with the appointment creation
// function continueAppointmentCreation(appointment_id, therapist_id, patient_id, date, time, create_by, confirm, type_appoint, res) {
//   // Fetch hospital_name from patient table based on patient_id
//   const selectPatientQuery = 'SELECT hospital_name FROM patient WHERE patient_id = $1';

//   client.query(selectPatientQuery, [patient_id])
//     .then(patientResult => {
//       if (patientResult.rows.length > 0) {
//         const hospital_name = patientResult.rows[0].hospital_name;

//         // Use the provided appointment_id in the INSERT statement
//         const insertQuery = 'INSERT INTO appointment_new2 (appointment_id, therapist_id, patient_id, date, "time", location, description, confirm, active_flag, create_by, create_date, update_by, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, $11, CURRENT_TIMESTAMP) RETURNING *';

//         client.query(insertQuery, [appointment_id, therapist_id, patient_id, date, time, hospital_name, null, confirm, 'Y', create_by, create_by])
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
// }




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

router.post('/appoint_patient_post', auth, (req, res) => {
  const { patient_id } = req.body;

  let query = 'SELECT to_char(date, \'YYYY-MM-DD\') as date FROM appointment_new2';
  
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

// router.post('/upcoming_date_post', (req, res) => {
//   // Access data directly from req.body
//   const { patient_id, date } = req.body;

//   // Check if both patient_id and date parameters are provided
//   if (!patient_id || !date) {
//     return res.status(400).json({ error: 'Both patient_id and date are required parameters' });
//   }

//   // Define the base query with parameterized placeholders
//   const query = `
//     SELECT 
//       appointment_new.*, 
//       therapist.fname AS therapist_fname,
//       therapist.lname AS therapist_lname
//     FROM 
//       appointment_new2
//     LEFT JOIN 
//       therapist ON appointment_new.therapist_id = therapist.therapist_id
//     WHERE 
//       appointment_new.patient_id = $1 
//       AND appointment_new.date = $2::date 
//     ORDER BY 
//       appointment_new.time`;

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

router.post('/upcoming_date_post', auth, (req, res) => {
  // Access data directly from req.body
  const { patient_id, date } = req.body;

  // Check if both patient_id and date parameters are provided
  if (!patient_id || !date) {
    return res.status(400).json({ error: 'Both patient_id and date are required parameters' });
  }

  // Define the base query with parameterized placeholders
  const query = `
    SELECT 
      appointment_new2.appointment_id,
      appointment_new2.therapist_id,
      appointment_new2.patient_id,
      appointment_new2.date,
      appointment_new2."time",
      appointment_new2.location,
      appointment_new2.description,
      appointment_new2.confirm,
      appointment_new2.create_by,
      appointment_new2.create_date,
      appointment_new2.update_by,
      appointment_new2.update_date,
      therapist.fname AS therapist_fname,
      therapist.lname AS therapist_lname
    FROM 
      appointment_new2
    LEFT JOIN 
      therapist ON appointment_new2.therapist_id = therapist.therapist_id
    WHERE 
      appointment_new2.patient_id = $1 
      AND appointment_new2.date = $2
    ORDER BY 
      appointment_new2."time"`;

  // Define query parameters
  const queryParams = [patient_id, date];

  client.query(query, queryParams)
    .then(result => {
      // Extract the data values from the rows and store them in an array
      const appointments = result.rows.map(appointment => ({
        ...appointment,
        time: formatTime(appointment.time)
      }));
      res.json(appointments);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Function to format time from "HH:MM:SS" to "h:mm am/pm"
function formatTime(timeString) {
  const [hour, minute] = timeString.split(':').map(Number);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;
}

router.get('/appoint_therapist_get', auth, (req, res) => {
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
