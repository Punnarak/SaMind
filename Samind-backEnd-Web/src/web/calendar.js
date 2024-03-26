const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const auth = require('./auth.js').authorization;

router.use(bodyParser.json());

//old api can use
// router.post('/calendar_view'/*, auth*/, (req, res) => {
//     const therapist_id = req.body.therapist_id; // Access therapist_id from request body
//     if (!therapist_id) {
//         return res.status(400).json({ error: 'Therapist ID is required' });
//     }

//     const query = `
//         SELECT 
//             p.fname || ' ' || p.lname AS patientName, 
//             to_char(a.date, 'DD-MM-YYYY') AS date, 
//             to_char(a.time, 'HH24:MI') AS time 
//         FROM 
//             appointment_new2 a 
//             LEFT JOIN patient p ON a.patient_id = p.patient_id 
//         WHERE 
//             a.therapist_id = $1
//         ORDER BY 
//             a.date DESC, 
//             a.time DESC
//     `;
//     const queryParams = [therapist_id];

//     client.query(query, queryParams)
//         .then(result => {
//             if (result.rows.length === 0) {
//                 return res.status(404).json({ error: 'No appointments found for this therapist' });
//             }
//             res.json(result.rows.map(row => ({
//                 patientName: row.patientname,
//                 date: row.date,
//                 time: row.time
//             })));
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/calendar_view', auth, (req, res) => {
    const therapist_id = req.body.therapist_id; // Access therapist_id from request body
    if (!therapist_id) {
        return res.status(400).json({ error: 'Therapist ID is required' });
    }

    const query = `
        SELECT 
            p.fname || ' ' || p.lname AS patientName, 
            to_char(a.date, 'DD-MM-YYYY') AS date, 
            to_char(a.time, 'HH24:MI') AS time 
        FROM 
            appointment_new2 a 
            LEFT JOIN patient p ON a.patient_id = p.patient_id 
        WHERE 
            a.therapist_id = $1
            AND a.confirm IN ('Y', 'PP')
        ORDER BY 
            a.date DESC, 
            a.time DESC
    `;
    const queryParams = [therapist_id];

    client.query(query, queryParams)
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'No appointments found for this therapist' });
            }
            res.json(result.rows.map(row => ({
                patientName: row.patientname,
                date: row.date,
                time: row.time
            })));
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

//old api can use
// router.post('/calendarDay'/*, auth*/, (req, res) => {
//     const therapist_id = req.body.therapist_id; // Access therapist_id from request body
//     let date = req.body.date; // Access date from request body

//     if (!therapist_id || !date) {
//         return res.status(400).json({ error: 'Therapist ID and date are required' });
//     }

//     // Convert date format from 'dd-mm-yyyy' to 'yyyy-mm-dd'
//     const parts = date.split('-');
//     if (parts.length === 3) {
//         date = `${parts[2]}-${parts[1]}-${parts[0]}`;
//     } else {
//         return res.status(400).json({ error: 'Invalid date format. Please provide date in dd-mm-yyyy format' });
//     }

//     const query = `
//       SELECT
//         appointment_id,
//         time,
//         patient_id
//       FROM
//         appointment_new2
//       WHERE
//         therapist_id = $1
//         AND date = $2
//     `;
//     const queryParams = [therapist_id, date];

//     client.query(query, queryParams)
//         .then(result => {
//             if (result.rows.length === 0) {
//                 return res.status(404).json({ error: 'No appointments found for this therapist and date' });
//             }

//             const appointments = {};
//             result.rows.forEach(row => {
//                 const appointment_id = row.appointment_id;
//                 const time = row.time;
//                 const patient_id = row.patient_id;

//                 const timeA = time.slice(0, 5); // Slice to get 'hh:mm'
//                 const timeB = addOneHour(time.slice(0, 5)); // Slice to get 'hh:mm' and add one hour

//                 // Query patient details
//                 const patientQuery = 'SELECT fname, lname FROM patient WHERE patient_id = $1';
//                 const patientParams = [patient_id];

//                 client.query(patientQuery, patientParams)
//                     .then(patientResult => {
//                         const patient = patientResult.rows[0];
//                         const patientName = `${patient.fname} ${patient.lname}`;

//                         appointments[timeA] = {
//                             patientName: patientName,
//                             timeA: timeA,
//                             timeB: timeB
//                         };

//                         if (Object.keys(appointments).length === result.rows.length) {
//                             res.json(appointments);
//                         }
//                     })
//                     .catch(err => {
//                         console.error('Error fetching patient details:', err);
//                         res.status(500).json({ error: 'An error occurred while fetching patient details' });
//                     });
//             });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/calendarDay', auth, (req, res) => {
    const therapist_id = req.body.therapist_id; // Access therapist_id from request body
    let date = req.body.date; // Access date from request body

    if (!therapist_id || !date) {
        return res.status(400).json({ error: 'Therapist ID and date are required' });
    }

    // Convert date format from 'dd-mm-yyyy' to 'yyyy-mm-dd'
    const parts = date.split('-');
    if (parts.length === 3) {
        date = `${parts[2]}-${parts[1]}-${parts[0]}`;
    } else {
        return res.status(400).json({ error: 'Invalid date format. Please provide date in dd-mm-yyyy format' });
    }

    const query = `
      SELECT
        appointment_id,
        time,
        patient_id
      FROM
        appointment_new2
      WHERE
        therapist_id = $1
        AND date = $2
        AND confirm IN ('Y', 'PP')
    `;
    const queryParams = [therapist_id, date];

    client.query(query, queryParams)
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'No appointments found for this therapist and date' });
            }

            const appointments = {};
            result.rows.forEach(row => {
                const appointment_id = row.appointment_id;
                const time = row.time;
                const patient_id = row.patient_id;

                const timeA = time.slice(0, 5); // Slice to get 'hh:mm'
                const timeB = addOneHour(time.slice(0, 5)); // Slice to get 'hh:mm' and add one hour

                // Query patient details
                const patientQuery = 'SELECT fname, lname FROM patient WHERE patient_id = $1';
                const patientParams = [patient_id];

                client.query(patientQuery, patientParams)
                    .then(patientResult => {
                        const patient = patientResult.rows[0];
                        const patientName = `${patient.fname} ${patient.lname}`;

                        appointments[timeA] = {
                            patientName: patientName,
                            timeA: timeA,
                            timeB: timeB
                        };

                        if (Object.keys(appointments).length === result.rows.length) {
                            res.json(appointments);
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching patient details:', err);
                        res.status(500).json({ error: 'An error occurred while fetching patient details' });
                    });
            });
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

function addOneHour(time) {
    // Parse time string and add one hour
    const [hours, minutes] = time.split(':').map(Number);
    const newHours = (hours + 1) % 24; // Add one hour, mod 24 to handle overflow
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

module.exports = router;