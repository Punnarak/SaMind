const client = require('./connection.js');
const express = require('express');
const router = express.Router();
const auth = require('./auth.js').authorization;


// router.post('/notiAssign', (req, res) => {
//     const id = req.query.patient_id; 
//     let query = 'SELECT * FROM assignment';
  
//     if (id) {
//       query += ' WHERE patient_id = $1';
//     }
  
//     const queryParams = id ? [id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });

// router.post('/notiAssign', (req, res) => {
//     const patientId = req.body.patientId; // Get patientId from the request body
//     if (!patientId) {
//         return res.status(400).json({ error: 'Patient ID is required in the request body' });
//     }

//     let query = 'SELECT test_name, detail, turn_in_before FROM assignment WHERE status = $1 AND patient_id = $2';
//     const queryParams = ['WAIT', patientId];

//     client.query(query, queryParams)
//         .then(result => {
//             const notifications = result.rows.map(row => {
//                 const turninDate = row.turn_in_before ? new Date(row.turn_in_before).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
//                 return {
//                     title: `มีการมอบหมาย ${row.test_name}`,
//                     detail: row.detail,
//                     turnin: turninDate,
//                     target: "Testscreen"
//                 };
//             });
//             res.json(notifications);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/notiAssign', (req, res) => {
    const patientId = req.body.patientId; // Get patientId from the request body
    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required in the request body' });
    }

    let query = 'SELECT test_name, detail, turn_in_before FROM assignment WHERE status = $1 AND patient_id = $2';
    const queryParams = ['WAIT', patientId];

    client.query(query, queryParams)
        .then(result => {
            const notifications = result.rows.map(row => {
                const turninDate = row.turn_in_before ? new Date(row.turn_in_before).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
                return {
                    title: `มีการมอบหมาย ${row.test_name}`,
                    detail: row.detail,
                    turnin: turninDate,
                    target: "Testscreen"
                };
            });

            // Sort notifications by turnin date
            notifications.sort((a, b) => {
                const dateA = new Date(a.turnin);
                const dateB = new Date(b.turnin);
                return dateA - dateB;
            });

            res.json(notifications);
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// router.post('/notiAppoint', (req, res) => {
//     const id = req.body.patientId; // Use req.body.patientId instead of req.query.patient_id
//     const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
//     let query = `
//         SELECT 
//             t.fname as therapist_fname, 
//             a.date, 
//             a."time",
//             a.description 
//         FROM 
//             public.appointment_new2 AS a 
//         LEFT JOIN 
//             public.therapist AS t 
//         ON 
//             a.therapist_id = t.therapist_id`;

//     // If patient_id is provided, filter by patient_id
//     if (id) {
//         query += ' WHERE a.patient_id = $1';
//     }
  
//     // Add condition to filter out past appointments
//     query += ' AND a.date >= $2';
//     // Add condition to filter out appointments with confirm column not equal to 'N'
//     query += ' AND a.confirm <> \'N\'';

//     const queryParams = id ? [id, currentDate] : [currentDate];
  
//     client.query(query, queryParams)
//         .then(result => {
//             // Transform result to match the desired format
//             const notifications = result.rows.map(row => {
//                 // Format date from "YYYY-MM-DD" to "DD MMM YYYY"
//                 const formattedDate = new Date(row.date).toLocaleDateString('en-GB', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric'
//                 });
//                 // Format time from "HH:MM:SS" to "HH:MM"
//                 const formattedTime = row.time.substring(0, 5);

//                 return {
//                     title: `${row.therapist_fname} คุณมีการนัดหมายวันที่ ${formattedDate} เวลา ${formattedTime} น.`,
//                     detail: row.description,
//                     target: "Calendarscreen"
//                 };
//             });
//             res.json(notifications);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/notiAppoint', (req, res) => {
    const id = req.body.patientId; // Use req.body.patientId instead of req.query.patient_id
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
    let query = `
        SELECT 
            t.fname as therapist_fname, 
            a.date, 
            a."time",
            a.description 
        FROM 
            public.appointment_new2 AS a 
        LEFT JOIN 
            public.therapist AS t 
        ON 
            a.therapist_id = t.therapist_id`;

    // If patient_id is provided, filter by patient_id
    if (id) {
        query += ' WHERE a.patient_id = $1';
    }
  
    // Add condition to filter out past appointments
    query += ' AND a.date >= $2';
    // Add condition to filter out appointments with confirm column not equal to 'N'
    query += ' AND a.confirm <> \'N\'';
    // Order the results by the date column in ascending order
    query += ' ORDER BY a.date ASC';

    const queryParams = id ? [id, currentDate] : [currentDate];
  
    client.query(query, queryParams)
        .then(result => {
            // Transform result to match the desired format
            const notifications = result.rows.map(row => {
                // Format date from "YYYY-MM-DD" to "DD MMM YYYY"
                const formattedDate = new Date(row.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
                // Format time from "HH:MM:SS" to "HH:MM"
                const formattedTime = row.time.substring(0, 5);

                return {
                    title: `${row.therapist_fname} คุณมีการนัดหมายวันที่ ${formattedDate} เวลา ${formattedTime} น.`,
                    detail: row.description,
                    target: "Calendarscreen"
                };
            });
            res.json(notifications);
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

router.post('/notiApp', (req, res) => {
    const patientId = req.body.patientId;
    const currentDate = new Date().toISOString().split('T')[0];

    let assignQuery = `
        SELECT 
            test_name,
            detail,
            turn_in_before 
        FROM 
            assignment 
        WHERE 
            status = $1 
            AND patient_id = $2`;
    const assignQueryParams = ['WAIT', patientId];

    let appointQuery = `
        SELECT 
            t.fname as therapist_fname, 
            a.date, 
            a."time",
            a.description 
        FROM 
            public.appointment_new2 AS a 
        LEFT JOIN 
            public.therapist AS t 
        ON 
            a.therapist_id = t.therapist_id`;

    if (patientId) {
        appointQuery += ' WHERE a.patient_id = $1'; // Changed from $3 to $1
    }
  
    appointQuery += ' AND a.date >= $2'; // Changed from $4 to $2
    appointQuery += ' AND a.confirm <> \'N\'';
    appointQuery += ' ORDER BY a.date ASC';

    const appointQueryParams = patientId ? [patientId, currentDate] : [currentDate]; // Changed to match the correct number of parameters

    let assignments = [];
    let appointments = [];

    client.query(assignQuery, assignQueryParams)
        .then(assignResult => {
            assignments = assignResult.rows.map(row => {
                const turninDate = row.turn_in_before ? new Date(row.turn_in_before).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
                return {
                    title: `มีการมอบหมาย ${row.test_name}`,
                    detail: row.detail,
                    turnin: turninDate,
                    target: "Testscreen"
                };
            });
            return client.query(appointQuery, appointQueryParams);
        })
        .then(appointResult => {
            appointments = appointResult.rows.map(row => {
                const formattedDate = new Date(row.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
                const formattedTime = row.time.substring(0, 5);

                return {
                    title: `${row.therapist_fname} คุณมีการนัดหมายวันที่ ${formattedDate} เวลา ${formattedTime} น.`,
                    detail: row.description,
                    target: "Calendarscreen"
                };
            });

            const mergedResult = assignments.concat(appointments);
            res.json(mergedResult);
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});




module.exports = router;