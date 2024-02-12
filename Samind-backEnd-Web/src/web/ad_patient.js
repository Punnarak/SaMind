const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

router.use(bodyParser.json());

// router.post('/adPatientView', (req, res) => {
//     const patient_id = req.query.patient_id;
//     let query = 'SELECT * FROM patient';
  
//     // Check if the id parameter is provided
//     if (patient_id) {
//       query += ' WHERE patient_id = $1';
//     }
  
//     const queryParams = patient_id ? [patient_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });

// router.post('/adPatientView', (req, res) => {
//     const hospitalName = req.body.hospitalName;

//     // First, let's query the patient table to get the patient details
//     let query = `SELECT p.fname || ' ' || p.lname AS patientName, p.age, p.patient_id
//                  FROM public.patient p
//                  WHERE p.hospital_name = $1`;

//     const queryParams = [hospitalName];

//     client.query(query, queryParams)
//         .then(patientResult => {
//             if (patientResult.rows.length === 0) {
//                 res.status(404).json({ error: 'Patient not found' });
//                 return;
//             }

//             // Now, let's fetch the mood data for the patient
//             const patientID = patientResult.rows[0].patient_id;
//             const moodQuery = `SELECT COALESCE(positive, '0%') AS positive,
//                                       COALESCE(negative, '0%') AS negative,
//                                       COALESCE(neutral, '0%') AS neutral
//                                FROM public.avatar_mood_detection
//                                WHERE patient_id = $1`;

//             client.query(moodQuery, [patientID])
//                 .then(moodResult => {
//                     // Determine the most detected mood
//                     const moodData = moodResult.rows[0];
//                     let mood = '';
//                     let maxPercentage = 0;

//                     for (const [key, value] of Object.entries(moodData)) {
//                         const percentage = parseInt(value);
//                         if (percentage > maxPercentage) {
//                             maxPercentage = percentage;
//                             mood = key;
//                         }
//                     }

//                     // Finally, construct the desired output object
//                     const output = {
//                         "No": "01",
//                         "patientID": `PID${patientID}`,
//                         "patientName": patientResult.rows[0].patientName,
//                         "age": patientResult.rows[0].age,
//                         "mood": mood
//                     };

//                     res.json(output);
//                 })
//                 .catch(moodErr => {
//                     console.error('Error fetching mood data:', moodErr);
//                     res.status(500).json({ error: 'An error occurred while fetching mood data' });
//                 });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred while fetching patient data' });
//         });
// });

// router.post('/adPatientView', (req, res) => {
//     const hospitalName = req.body.hospitalName;

//     // First, let's query the patient table to get the patient details
//     let query = `SELECT p.fname || ' ' || p.lname AS patientName, p.age, p.patient_id
//                  FROM public.patient p
//                  WHERE p.hospital_name = $1`;

//     const queryParams = [hospitalName];

//     client.query(query, queryParams)
//         .then(patientResult => {
//             if (patientResult.rows.length === 0) {
//                 res.status(404).json({ error: 'No patients found for the given hospital' });
//                 return;
//             }

//             const output = [];
//             let counter = 1;

//             // Loop through each patient to fetch mood data and construct the output object
//             patientResult.rows.forEach(patient => {
//                 const patientID = patient.patient_id;
//                 const moodQuery = `SELECT COALESCE(positive, '0%') AS positive,
//                                           COALESCE(negative, '0%') AS negative,
//                                           COALESCE(neutral, '0%') AS neutral
//                                    FROM public.avatar_mood_detection
//                                    WHERE patient_id = $1`;

//                 client.query(moodQuery, [patientID])
//                     .then(moodResult => {
//                         // Determine the most detected mood
//                         const moodData = moodResult.rows[0];
//                         let mood = '';
//                         let maxPercentage = 0;

//                         for (const [key, value] of Object.entries(moodData)) {
//                             const percentage = parseInt(value);
//                             if (percentage > maxPercentage) {
//                                 maxPercentage = percentage;
//                                 mood = key;
//                             }
//                         }

//                         // Format the counter to ensure it always has two digits
//                         const paddedCounter = counter.toString().padStart(2, '0');

//                         // Construct the output object for the current patient
//                         const patientOutput = {
//                             "No": paddedCounter,
//                             "patientID": `PID${patientID}`,
//                             "patientName": patient.patientName,
//                             "age": patient.age,
//                             "mood": mood
//                         };

//                         // Push the output object to the array
//                         output.push(patientOutput);

//                         counter++; // Increment the counter for the next patient

//                         // If all patients are processed, send the response
//                         if (output.length === patientResult.rows.length) {
//                             res.json(output);
//                         }
//                     })
//                     .catch(moodErr => {
//                         console.error('Error fetching mood data:', moodErr);
//                         res.status(500).json({ error: 'An error occurred while fetching mood data' });
//                     });
//             });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred while fetching patient data' });
//         });
// });

// router.post('/adPatientView', (req, res) => {
//     const hospitalName = req.body.hospitalName;

//     // First, let's query the patient table to get the patient details
//     let query = `SELECT p.fname, p.lname, p.age, p.patient_id
//                  FROM public.patient p
//                  WHERE p.hospital_name = $1`;

//     const queryParams = [hospitalName];

//     client.query(query, queryParams)
//         .then(patientResult => {
//             if (patientResult.rows.length === 0) {
//                 res.status(404).json({ error: 'No patients found for the given hospital' });
//                 return;
//             }

//             const output = [];
//             let counter = 1;

//             // Loop through each patient to fetch mood data and construct the output object
//             patientResult.rows.forEach(patient => {
//                 const patientID = patient.patient_id;
//                 const moodQuery = `SELECT COALESCE(positive, '0%') AS positive,
//                                           COALESCE(negative, '0%') AS negative,
//                                           COALESCE(neutral, '0%') AS neutral
//                                    FROM public.avatar_mood_detection
//                                    WHERE patient_id = $1`;

//                 client.query(moodQuery, [patientID])
//                     .then(moodResult => {
//                         // Determine the most detected mood
//                         const moodData = moodResult.rows[0];
//                         let mood = '';
//                         let maxPercentage = 0;

//                         for (const [key, value] of Object.entries(moodData)) {
//                             const percentage = parseInt(value);
//                             if (percentage > maxPercentage) {
//                                 maxPercentage = percentage;
//                                 mood = key;
//                             }
//                         }

//                         // Format the counter to ensure it always has two digits
//                         const paddedCounter = counter.toString().padStart(2, '0');

//                         // Construct the patient's full name
//                         const patientName = `${patient.fname} ${patient.lname}`;

//                         // Construct the output object for the current patient
//                         const patientOutput = {
//                             "No": paddedCounter,
//                             "patientID": `PID${patientID}`,
//                             "patientName": patientName,
//                             "age": patient.age,
//                             "mood": mood
//                         };

//                         // Push the output object to the array
//                         output.push(patientOutput);

//                         counter++; // Increment the counter for the next patient

//                         // If all patients are processed, send the response
//                         if (output.length === patientResult.rows.length) {
//                             res.json(output);
//                         }
//                     })
//                     .catch(moodErr => {
//                         console.error('Error fetching mood data:', moodErr);
//                         res.status(500).json({ error: 'An error occurred while fetching mood data' });
//                     });
//             });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred while fetching patient data' });
//         });
// });

router.post('/adPatientView', (req, res) => {
    const hospitalName = req.body.hospitalName;

    // First, let's query the patient table to get the patient details
    let query = `SELECT p.fname, p.lname, p.age, p.patient_id
                 FROM public.patient p
                 WHERE p.hospital_name = $1`;

    const queryParams = [hospitalName];

    client.query(query, queryParams)
        .then(patientResult => {
            if (patientResult.rows.length === 0) {
                res.status(404).json({ error: 'No patients found for the given hospital' });
                return;
            }

            const output = [];
            let counter = 1;

            // Loop through each patient to fetch mood data and construct the output object
            patientResult.rows.forEach(patient => {
                const patientID = patient.patient_id;
                const moodQuery = `SELECT COALESCE(positive, '0%') AS positive,
                                          COALESCE(negative, '0%') AS negative,
                                          COALESCE(neutral, '0%') AS neutral
                                   FROM public.avatar_mood_detection
                                   WHERE patient_id = $1`;

                client.query(moodQuery, [patientID])
                    .then(moodResult => {
                        let mood = '-'; // Default mood to '-' if no mood data is available

                        if (moodResult.rows.length > 0) {
                            // Determine the most detected mood
                            const moodData = moodResult.rows[0];
                            let maxPercentage = 0;

                            for (const [key, value] of Object.entries(moodData)) {
                                const percentage = parseInt(value);
                                if (percentage > maxPercentage) {
                                    maxPercentage = percentage;
                                    mood = key;
                                }
                            }
                        }

                        // Format the counter to ensure it always has two digits
                        const paddedCounter = counter.toString().padStart(2, '0');

                        // Construct the patient's full name
                        const patientName = `${patient.fname} ${patient.lname}`;

                        // Construct the output object for the current patient
                        const patientOutput = {
                            "No": paddedCounter,
                            "patientID": `PID${patientID}`,
                            "patientName": patientName,
                            "age": patient.age,
                            "mood": mood
                        };

                        // Push the output object to the array
                        output.push(patientOutput);

                        counter++; // Increment the counter for the next patient

                        // If all patients are processed, send the response
                        if (output.length === patientResult.rows.length) {
                            res.json(output);
                        }
                    })
                    .catch(moodErr => {
                        console.error('Error fetching mood data:', moodErr);
                        res.status(500).json({ error: 'An error occurred while fetching mood data' });
                    });
            });
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred while fetching patient data' });
        });
});













module.exports = router;