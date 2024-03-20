const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const secret = require("./auth.js").secret;
const auth = require("./auth.js").authorization;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.use(bodyParser.json());

// router.post('/adCarouselEdit', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adCreatePatient', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adtherapistAll', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adAllTestHistory', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adAllTestHistory', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   // Query to retrieve test history for the given patientID
//   const query = `
//     SELECT
//       ROW_NUMBER() OVER () AS "No",
//       CASE
//         WHEN ts.type IN ('PHQ9', '2Q') THEN ts.type
//         ELSE ts.answer->>'test'
//       END AS "testName",
//       CASE
//         WHEN ts.type IN ('PHQ9', '2Q') THEN ts.score::text
//         ELSE jsonb_build_object(
//           '1', ts.answer->>'1',
//           '2', ts.answer->>'2',
//           '3', ts.answer->>'3',
//           '4', ts.answer->>'4',
//           '5', ts.answer->>'5'
//         )::text
//       END AS "result",
//       TO_CHAR(ts.date_time, 'Mon DD, YYYY HH24:MI') AS "date"
//     FROM
//       test_score ts
//     WHERE
//       ts.patient_id = $1
//   `;

//   const queryParams = [numericPatientID];

//   client.query(query, queryParams)
//     .then(result => {
//       const formattedResult = result.rows.map(row => ({
//         No: row.No.toString().padStart(2, '0'),
//         testName: row.testName,
//         result: row.result,
//         date: row.date
//       }));
//       res.json(formattedResult);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adAllTestHistory', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   // Query to retrieve test history for the given patientID
//   const query = `
//     SELECT
//       ROW_NUMBER() OVER () AS "No",
//       CASE
//         WHEN ts.type IN ('PHQ9', '2Q') THEN ts.type
//         ELSE COALESCE(ts.type, ts.answer->>'test')
//       END AS "testName",
//       CASE
//         WHEN ts.type IN ('PHQ9', '2Q') THEN ts.score::text
//         ELSE jsonb_build_object(
//           '1', ts.answer->>'1',
//           '2', ts.answer->>'2',
//           '3', ts.answer->>'3',
//           '4', ts.answer->>'4',
//           '5', ts.answer->>'5'
//         )::text
//       END AS "result",
//       TO_CHAR(ts.date_time, 'Mon DD, YYYY HH24:MI') AS "date"
//     FROM
//       test_score ts
//     WHERE
//       ts.patient_id = $1
//   `;

//   const queryParams = [numericPatientID];

//   client.query(query, queryParams)
//     .then(result => {
//       const formattedResult = result.rows.map(row => ({
//         No: row.No.toString().padStart(2, '0'),
//         testName: row.testName,
//         result: row.result,
//         date: row.date
//       }));
//       res.json(formattedResult);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// this api it work now 20/02/2025
// router.post('/adAllTestHistory', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   // Query to retrieve test history for the given patientID
//   const query = `
//     SELECT
//       ROW_NUMBER() OVER () AS "No",
//       CASE
//         WHEN ts.type IN ('PHQ9', '2Q') THEN ts.type
//         ELSE COALESCE(ts.type, ts.answer->>'test')
//       END AS "testName",
//       CASE
//         WHEN ts.type IN ('PHQ9', '2Q') THEN ts.score::text
//         ELSE ts.answer::text
//       END AS "result",
//       TO_CHAR(ts.date_time, 'Mon DD, YYYY HH24:MI') AS "date"
//     FROM
//       test_score ts
//     WHERE
//       ts.patient_id = $1
//   `;

//   const queryParams = [numericPatientID];

//   client.query(query, queryParams)
//     .then(result => {
//       const formattedResult = result.rows.map(row => {
//         let resultObj;
//         try {
//           resultObj = JSON.parse(row.result);
//         } catch (error) {
//           console.error('Error parsing JSON:', error);
//           resultObj = row.result;
//         }
//         return {
//           No: row.No.toString().padStart(2, '0'),
//           testName: row.testName,
//           result: resultObj,
//           date: row.date
//         };
//       });
//       res.json(formattedResult);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adAllTestHistory', async (req, res) => {
//   try {
//     const { patientID } = req.body;
//     const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//     // Query to retrieve test history for the given patientID
//     const query = `
//       SELECT
//         ROW_NUMBER() OVER () AS "No",
//         CASE
//           WHEN ts.type IN ('PHQ9', '2Q') THEN ts.type
//           ELSE COALESCE(ts.type, ts.answer->>'test')
//         END AS "testName",
//         CASE
//           WHEN ts.type IN ('PHQ9', '2Q') THEN ts.score::text
//           ELSE ts.answer::text
//         END AS "result",
//         TO_CHAR(ts.date_time, 'Mon DD, YYYY HH24:MI') AS "date"
//       FROM
//         test_score ts
//       WHERE
//         ts.patient_id = $1
//     `;

//     const queryParams = [numericPatientID];

//     const testResults = await client.query(query, queryParams);

//     const formattedResult = [];

//     for (const row of testResults.rows) {
//       let resultObj;
//       try {
//         resultObj = JSON.parse(row.result);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         resultObj = row.result;
//       }

//       formattedResult.push({
//         No: row.No.toString().padStart(2, '0'),
//         testName: row.testName,
//         result: resultObj,
//         date: row.date
//       });
//     }

//     const finalResult = [];

//     for (const row of formattedResult) {
//       let description = '';
//       let selectedAnswers = {};

//       if (row.testName === 'aaa') {
//         const queryQuestionnaire = `
//           SELECT description
//           FROM questionnaire_new2
//           WHERE test_name = $1
//         `;

//         const questionnaireResult = await client.query(queryQuestionnaire, [row.testName]);

//         if (questionnaireResult.rows.length > 0) {
//           description = questionnaireResult.rows[0].description;
//         }

//         if (row.result && typeof row.result === 'object') {
//           selectedAnswers = {
//             question: Object.keys(row.result).map((key, index) => ({
//               question: key,
//               options: ["aaa", "bbb"],
//               selectedAnswer: row.result[key]
//             }))
//           };
//         }
//       }

//       finalResult.push({
//         No: row.No,
//         testName: row.testName,
//         result: row.result,
//         date: row.date,
//         description,
//         ...selectedAnswers
//       });
//     }

//     res.json(finalResult);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// router.post('/adAllTestHistory', async (req, res) => {
//   try {
//     const { patientID } = req.body;
//     const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//     // Query to retrieve test history for the given patientID
//     const query = `
//       SELECT
//         ROW_NUMBER() OVER () AS "No",
//         CASE
//           WHEN ts.type IN ('PHQ9', '2Q') THEN ts.type
//           ELSE COALESCE(ts.type, ts.answer->>'test')
//         END AS "testName",
//         CASE
//           WHEN ts.type IN ('PHQ9', '2Q') THEN ts.score::text
//           ELSE ts.answer::text
//         END AS "result",
//         TO_CHAR(ts.date_time, 'Mon DD, YYYY HH24:MI') AS "date"
//       FROM
//         test_score ts
//       WHERE
//         ts.patient_id = $1
//     `;

//     const queryParams = [numericPatientID];

//     const testResults = await client.query(query, queryParams);

//     const formattedResult = [];

//     for (const row of testResults.rows) {
//       let resultObj;
//       try {
//         resultObj = JSON.parse(row.result);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         resultObj = row.result;
//       }

//       formattedResult.push({
//         No: row.No.toString().padStart(2, '0'),
//         testName: row.testName,
//         result: resultObj,
//         date: row.date
//       });
//     }

//     const finalResult = [];

//     for (const row of formattedResult) {
//       let description = '';
//       let selectedAnswers = {};
//       let questions = [];

//       const queryQuestionnaire = `
//         SELECT description, no, question
//         FROM questionnaire_new2
//         WHERE test_name = $1
//       `;

//       const questionnaireResult = await client.query(queryQuestionnaire, [row.testName]);

//       if (questionnaireResult.rows.length > 0) {
//         description = questionnaireResult.rows[0].description;
//         questions = questionnaireResult.rows.map(q => ({
//           question: q.question,
//           options: ["aaa", "bbb"], // Default options, you can modify this to fetch options from the database
//           selectedAnswer: row.result[q.no.toString()] || '' // Default selected answer
//         }));
//       }

//       finalResult.push({
//         No: row.No,
//         testName: row.testName,
//         result: row.result,
//         date: row.date,
//         description,
//         question: questions
//       });
//     }

//     res.json(finalResult);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

router.post('/adAllTestHistory', auth, async (req, res) => {
  try {
    const { patientID } = req.body;
    const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

    // Query to retrieve test history for the given patientID
    const query = `
      SELECT
        ROW_NUMBER() OVER () AS "No",
        CASE
          WHEN ts.type IN ('PHQ9', '2Q') THEN ts.type
          ELSE COALESCE(ts.type, ts.answer->>'test')
        END AS "testName",
        CASE
          WHEN ts.type IN ('PHQ9', '2Q') THEN ts.score::text
          ELSE ts.answer::text
        END AS "result",
        TO_CHAR(ts.date_time, 'Mon DD, YYYY HH24:MI') AS "date"
      FROM
        test_score ts
      WHERE
        ts.patient_id = $1
    `;

    const queryParams = [numericPatientID];

    const testResults = await client.query(query, queryParams);

    const formattedResult = [];

    for (const row of testResults.rows) {
      let resultObj;
      try {
        resultObj = JSON.parse(row.result);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        resultObj = row.result;
      }

      formattedResult.push({
        No: row.No.toString().padStart(2, '0'),
        testName: row.testName,
        result: resultObj,
        date: row.date
      });
    }

    const finalResult = [];

    for (const row of formattedResult) {
      let description = '';
      let selectedAnswers = {};
      let questions = [];

      const queryQuestionnaire = `
        SELECT description, no, question, options
        FROM questionnaire_new2
        WHERE test_name = $1
      `;

      const questionnaireResult = await client.query(queryQuestionnaire, [row.testName]);

      if (questionnaireResult.rows.length > 0) {
        description = questionnaireResult.rows[0].description;
        questions = questionnaireResult.rows.map(q => ({
          question: q.question,
          options: q.options, // Fetch options from the database
          selectedAnswer: row.result[q.no.toString()] || '' // Default selected answer
        }));
      }

      finalResult.push({
        No: row.No,
        testName: row.testName,
        result: row.result,
        date: row.date,
        description,
        question: questions
      });
    }

    res.json(finalResult);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/adTherapistAll', auth, (req, res) => {
  const { hospitalName } = req.body;

  let query = 'SELECT fname, lname FROM therapist WHERE admin = $1 AND hospital_name = $2';
  const queryParams = ['N', hospitalName];

  client.query(query, queryParams)
    .then(result => {
      const therapistAll = result.rows.map(row => `${row.fname} ${row.lname}`);
      res.json({ therapistAll });
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// router.post('/adCreatePatient', async (req, res) => {
//   try {
//     const {
//       fname,
//       lname,
//       phone,
//       gender,
//       born,
//       email,
//       password,
//       therapistName
//     } = req.body;

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Calculate age from date of birth
//     const dob = new Date(born);
//     const ageDate = new Date(Date.now() - dob.getTime());
//     const age = Math.abs(ageDate.getUTCFullYear() - 1970);

//     // Fetch therapist data
//     const therapistQuery = `
//       SELECT therapist_id, hospital_name 
//       FROM therapist 
//       WHERE fname = $1 AND lname = $2`;
//     const therapistResult = await client.query(therapistQuery, [
//       therapistName.split(' ')[0],
//       therapistName.split(' ')[1]
//     ]);

//     const therapistData = therapistResult.rows[0];
//     if (!therapistData) {
//       return res.status(404).json({ error: 'Therapist not found' });
//     }

//     // Convert gender to boolean
//     const isMale = gender.toLowerCase() === 'male';

//     // Insert patient data
//     const insertPatientQuery = `
//       INSERT INTO public.patient (
//         patient_id,
//         email,
//         fname,
//         lname,
//         age,
//         gender,
//         phone,
//         level,
//         hospital_name,
//         therapist_id,
//         start_date,
//         born
//       ) VALUES (
//         NEXTVAL('patient_id_seq'),
//         $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_DATE, $10
//       ) RETURNING patient_id`;

//     const insertPatientParams = [
//       email,
//       fname,
//       lname,
//       age,
//       isMale,
//       phone,
//       'level', // Adjust this accordingly
//       therapistData.hospital_name,
//       therapistData.therapist_id,
//       dob
//     ];

//     const insertedPatient = await client.query(insertPatientQuery, insertPatientParams);
//     const patientId = insertedPatient.rows[0].patient_id;

//     // Insert user data
//     const insertUserQuery = `
//       INSERT INTO public.users (
//         users_id,
//         email,
//         password,
//         patient_id,
//         verify_user
//       ) VALUES (
//         NEXTVAL('users_id_seq'),
//         $1, $2, $3, 'N'
//       )`;

//     const insertUserParams = [
//       email,
//       hashedPassword,
//       patientId
//     ];

//     await client.query(insertUserQuery, insertUserParams);

//     res.status(201).json({ patient_id: patientId });
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

router.post('/adCreatePatient', auth, async (req, res) => {
  try {
    const {
      fname,
      lname,
      phone,
      gender,
      born,
      email,
      password,
      therapistName
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert frontend date format to database date format
    const [month, day, year] = born.split('/');
    const formattedBorn = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Calculate age from date of birth
    const dob = new Date(formattedBorn);
    const ageDate = new Date(Date.now() - dob.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Fetch therapist data
    const therapistQuery = `
      SELECT therapist_id, hospital_name 
      FROM therapist 
      WHERE fname = $1 AND lname = $2`;
    const therapistResult = await client.query(therapistQuery, [
      therapistName.split(' ')[0],
      therapistName.split(' ')[1]
    ]);

    const therapistData = therapistResult.rows[0];
    if (!therapistData) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    // Convert gender to boolean
    const isMale = gender.toLowerCase() === 'male';

    // Insert patient data
    const insertPatientQuery = `
      INSERT INTO public.patient (
        patient_id,
        email,
        fname,
        lname,
        age,
        gender,
        phone,
        level,
        hospital_name,
        therapist_id,
        start_date,
        born
      ) VALUES (
        NEXTVAL('patient_id_seq'),
        $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_DATE, $10
      ) RETURNING patient_id`;

    const insertPatientParams = [
      email,
      fname,
      lname,
      age,
      isMale,
      phone,
      'level', // Adjust this accordingly
      therapistData.hospital_name,
      therapistData.therapist_id,
      formattedBorn // Use formattedBorn here
    ];

    const insertedPatient = await client.query(insertPatientQuery, insertPatientParams);
    const patientId = insertedPatient.rows[0].patient_id;

    // Insert user data
    const insertUserQuery = `
      INSERT INTO public.users (
        users_id,
        email,
        password,
        patient_id,
        verify_user
      ) VALUES (
        NEXTVAL('users_id_seq'),
        $1, $2, $3, 'N'
      )`;

    const insertUserParams = [
      email,
      hashedPassword,
      patientId
    ];

    await client.query(insertUserQuery, insertUserParams);

    res.status(201).json({ patient_id: patientId });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


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
//                         let mood = '-'; // Default mood to '-' if no mood data is available

//                         if (moodResult.rows.length > 0) {
//                             // Determine the most detected mood
//                             const moodData = moodResult.rows[0];
//                             let maxPercentage = 0;

//                             for (const [key, value] of Object.entries(moodData)) {
//                                 const percentage = parseInt(value);
//                                 if (percentage > maxPercentage) {
//                                     maxPercentage = percentage;
//                                     mood = key;
//                                 }
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

// router.post('/adPatientView', (req, res) => {
//     const hospitalName = req.body.hospitalName;

//     // Query to get patient details along with therapist's name
//     let query = `SELECT p.fname AS patient_fname, p.lname AS patient_lname, p.age, p.patient_id, t.fname AS therapist_fname, t.lname AS therapist_lname
//                  FROM public.patient p
//                  LEFT JOIN public.therapist t ON p.therapist_id = t.therapist_id
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
//                         let mood = '-'; // Default mood to '-' if no mood data is available

//                         if (moodResult.rows.length > 0) {
//                             // Determine the most detected mood
//                             const moodData = moodResult.rows[0];
//                             let maxPercentage = 0;

//                             for (const [key, value] of Object.entries(moodData)) {
//                                 const percentage = parseInt(value);
//                                 if (percentage > maxPercentage) {
//                                     maxPercentage = percentage;
//                                     mood = key;
//                                 }
//                             }
//                         }

//                         // Format the counter to ensure it always has two digits
//                         const paddedCounter = counter.toString().padStart(2, '0');

//                         // Construct the output object for the current patient
//                         const patientOutput = {
//                             "No": paddedCounter,
//                             "therapistName": `${patient.therapist_fname} ${patient.therapist_lname}`,
//                             "patientID": `PID${patientID}`,
//                             "patientName": `${patient.patient_fname} ${patient.patient_lname}`,
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
//   const hospitalName = req.body.hospitalName;

//   // Query to get patient details along with therapist's name, gender, and email
//   let query = `SELECT p.fname AS patient_fname, p.lname AS patient_lname, p.age, p.patient_id, p.gender, p.email, t.fname AS therapist_fname, t.lname AS therapist_lname
//                FROM public.patient p
//                LEFT JOIN public.therapist t ON p.therapist_id = t.therapist_id
//                WHERE p.hospital_name = $1`;

//   const queryParams = [hospitalName];

//   client.query(query, queryParams)
//       .then(patientResult => {
//           if (patientResult.rows.length === 0) {
//               res.status(404).json({ error: 'No patients found for the given hospital' });
//               return;
//           }

//           const output = [];
//           let counter = 1;

//           // Loop through each patient to fetch mood data and construct the output object
//           patientResult.rows.forEach(patient => {
//               const patientID = patient.patient_id;
//               const moodQuery = `SELECT COALESCE(positive, '0%') AS positive,
//                                         COALESCE(negative, '0%') AS negative,
//                                         COALESCE(neutral, '0%') AS neutral
//                                  FROM public.avatar_mood_detection
//                                  WHERE patient_id = $1`;

//               client.query(moodQuery, [patientID])
//                   .then(moodResult => {
//                       let mood = '-'; // Default mood to '-' if no mood data is available

//                       if (moodResult.rows.length > 0) {
//                           // Determine the most detected mood
//                           const moodData = moodResult.rows[0];
//                           let maxPercentage = 0;

//                           for (const [key, value] of Object.entries(moodData)) {
//                               const percentage = parseInt(value);
//                               if (percentage > maxPercentage) {
//                                   maxPercentage = percentage;
//                                   mood = key;
//                               }
//                           }
//                       }

//                       // Format the counter to ensure it always has two digits
//                       const paddedCounter = counter.toString().padStart(2, '0');

//                       // Construct the output object for the current patient
//                       const patientOutput = {
//                           "No": paddedCounter,
//                           "therapistName": `${patient.therapist_fname} ${patient.therapist_lname}`,
//                           "patientID": `PID${patientID}`,
//                           "patientName": `${patient.patient_fname} ${patient.patient_lname}`,
//                           "gender": patient.gender ? "male" : "female",
//                           "age": patient.age,
//                           "email": patient.email,
//                           "mood": mood
//                       };

//                       // Push the output object to the array
//                       output.push(patientOutput);

//                       counter++; // Increment the counter for the next patient

//                       // If all patients are processed, send the response
//                       if (output.length === patientResult.rows.length) {
//                           res.json(output);
//                       }
//                   })
//                   .catch(moodErr => {
//                       console.error('Error fetching mood data:', moodErr);
//                       res.status(500).json({ error: 'An error occurred while fetching mood data' });
//                   });
//           });
//       })
//       .catch(err => {
//           console.error('Error executing query:', err);
//           res.status(500).json({ error: 'An error occurred while fetching patient data' });
//       });
// });

router.post('/adPatientView', auth, (req, res) => {
  const hospitalName = req.body.hospitalName;

  // Query to get patient details along with therapist's name, gender, email, born, and phone
  let query = `SELECT p.fname AS patient_fname, p.lname AS patient_lname, p.age, p.patient_id, p.gender, p.email, p.born, p.phone, t.fname AS therapist_fname, t.lname AS therapist_lname
               FROM public.patient p
               LEFT JOIN public.therapist t ON p.therapist_id = t.therapist_id
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
              const moodQuery = `SELECT COALESCE(positive_percent, '0') AS positive,
                                        COALESCE(nagative_percent, '0') AS negative,
                                        COALESCE(neutral_percent, '0') AS neutral
                                 FROM public.avatar
                                 WHERE patient_id = $1 ORDER BY date DESC LIMIT 1`;

              client
                .query(moodQuery, [patientID])
                .then((moodResult) => {
                  let mood = "-"; // Default mood to '-' if no mood data is available

                  if (moodResult.rows.length > 0) {
                    // Determine the most detected mood
                    const moodData = moodResult.rows[0];
                    let highestValue = Math.max(
                      parseFloat(moodData.positive),
                      parseFloat(moodData.negative),
                      parseFloat(moodData.neutral)
                    );

                    if (highestValue === parseFloat(moodData.positive)) {
                      mood = "positive";
                    } else if (highestValue === parseFloat(moodData.negative)) {
                      mood = "negative";
                    } else {
                      mood = "neutral";
                    }
                  }

                  // Format the born date to DD/MM/YYYY format
                  const bornDate = patient.born
                    ? new Date(patient.born).toLocaleDateString("en-GB")
                    : "";

                  // Construct the output object for the current patient
                  const patientOutput = {
                    No: counter.toString().padStart(2, "0"),
                    therapistName: `${patient.therapist_fname} ${patient.therapist_lname}`,
                    patientID: `PID${patientID}`,
                    patientName: `${patient.patient_fname} ${patient.patient_lname}`,
                    gender: patient.gender ? "male" : "female",
                    age: patient.age,
                    born: bornDate,
                    phone: patient.phone,
                    email: patient.email,
                    mood: mood,
                  };

                  // Push the output object to the array
                  output.push(patientOutput);

                  counter++; // Increment the counter for the next patient

                  // If all patients are processed, send the response
                  if (output.length === patientResult.rows.length) {
                    res.json(output);
                  }
                })
                .catch((moodErr) => {
                  console.error("Error fetching mood data:", moodErr);
                  res
                    .status(500)
                    .json({
                      error: "An error occurred while fetching mood data",
                    });
                });
          });
      })
      .catch(err => {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'An error occurred while fetching patient data' });
      });
});



//first api for merge
// router.post('/personalData', (req, res) => {
//     const therapist_id = req.query.therapist_id;
//     let query = 'SELECT * FROM therapist';
  
//     // Check if the id parameter is provided
//     if (therapist_id) {
//       query += ' WHERE therapist_id = $1';
//     }
  
//     const queryParams = therapist_id ? [therapist_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });



// router.post('/personalData', async (req, res) => {
//     const { patientID } = req.body;
//     const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//     try {
//         // Query to fetch patient data
//         const patientQuery = `
//             SELECT 
//                 p.fname,
//                 p.lname,
//                 p.gender,
//                 p.born,
//                 p.start_date AS start,
//                 p.email,
//                 p.phone AS tel,
//                 (SELECT date FROM appointment_new2 WHERE patient_id = p.patient_id AND date <= CURRENT_DATE AND confirm = 'Y' AND active_flag = 'Y' ORDER BY date DESC LIMIT 1) AS lastAppointment,
//                 (SELECT date FROM appointment_new2 WHERE patient_id = p.patient_id AND date > CURRENT_DATE AND confirm = 'Y' AND active_flag = 'Y' ORDER BY date ASC LIMIT 1) AS nextAppointment,
//                 (
//                     SELECT CASE 
//                         WHEN COUNT(positive) >= COUNT(negative) AND COUNT(positive) >= COUNT(neutral) THEN 'positive'
//                         WHEN COUNT(negative) >= COUNT(positive) AND COUNT(negative) >= COUNT(neutral) THEN 'negative'
//                         ELSE 'neutral'
//                     END
//                     FROM avatar_mood_detection 
//                     WHERE patient_id = p.patient_id
//                       AND date <= CURRENT_DATE  -- Use only records up to the current date
//                 ) AS mood
//             FROM 
//                 public.patient AS p
//             LEFT JOIN 
//                 public.avatar_mood_detection AS m ON p.patient_id = m.patient_id
//             WHERE 
//                 p.patient_id = $1`;

//         const patientResult = await client.query(patientQuery, [numericPatientID]);
//         const patientData = patientResult.rows[0];

//         if (!patientData) {
//             return res.status(404).json({ error: 'Patient not found' });
//         }

//         // Log the retrieved data for debugging
//         console.log('Retrieved patient data:', patientData);

//         // Calculate age
//         const dob = new Date(patientData.born);
//         const age = Math.floor(
//           (new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000)
//         );

//         // Format date function
//         const formatDate = (dateString) => {
//             const date = new Date(dateString);
//             const day = date.getDate();
//             const month = date.toLocaleString("en-US", { month: "long" });
//             const year = date.getFullYear();
//             return `${day} ${month} ${year}`;
//         };

//         // Format gender
//         const gender = patientData.gender ? "male" : "female";

//         // Format born date
//         const born = formatDate(patientData.born);

//         // Format start date
//         const start = formatDate(patientData.start);

//         // Extract last appointment and next appointment
//         const lastAppointment = patientData.lastappointment; // Change to lowercase 'lastappointment'
//         const nextAppointment = patientData.nextappointment; // Change to lowercase 'nextappointment'

//         // Log the raw values of last and next appointment
//         console.log("Raw last appointment:", lastAppointment);
//         console.log("Raw next appointment:", nextAppointment);

//         // Format last appointment
//         const formattedLastAppointment = lastAppointment
//             ? formatDate(lastAppointment)
//             : "-";

//         // Format next appointment
//         const formattedNextAppointment = nextAppointment
//             ? formatDate(nextAppointment)
//             : "-";

//         // Extract mood from the data
//         const mood = patientData.mood ? patientData.mood : "-";

//         // Prepare the response
//         const responseData = {
//             patientID,
//             name: `${patientData.fname} ${patientData.lname}`,
//             gender,
//             age,
//             born,
//             start,
//             lastAppointment: formattedLastAppointment,
//             nextAppointment: formattedNextAppointment,
//             tel: patientData.tel,
//             email: patientData.email,
//             mood,
//         };

//         // Send the response
//         res.json(responseData);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// this api it work
// router.post("/personalData", async (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ""); // Extract numeric part of patientID

//   try {
//     // Query to fetch patient data
//     const patientQuery = `
//             SELECT 
//                 p.fname,
//                 p.lname,
//                 p.gender,
//                 p.born,
//                 p.start_date AS start,
//                 p.email,
//                 p.phone AS tel,
//                 (SELECT date FROM appointment_new2 WHERE patient_id = p.patient_id AND date <= CURRENT_DATE AND confirm = 'Y' AND active_flag = 'Y' ORDER BY date DESC LIMIT 1) AS lastAppointment,
//                 (SELECT date FROM appointment_new2 WHERE patient_id = p.patient_id AND date > CURRENT_DATE AND confirm = 'Y' AND active_flag = 'Y' ORDER BY date ASC LIMIT 1) AS nextAppointment,
//                 (
//                     SELECT 
//                         CASE 
//                             WHEN m.positive >= m.negative AND m.positive >= m.neutral THEN 'positive'
//                             WHEN m.negative >= m.positive AND m.negative >= m.neutral THEN 'negative'
//                             ELSE 'neutral'
//                         END
//                     FROM avatar_mood_detection AS m 
//                     WHERE m.patient_id = p.patient_id
//                       AND m.date <= CURRENT_DATE  -- Use only records up to the current date
//                     ORDER BY m.date DESC
//                     LIMIT 1
//                 ) AS mood
//             FROM 
//                 public.patient AS p
//             WHERE 
//                 p.patient_id = $1`;

//     const patientResult = await client.query(patientQuery, [numericPatientID]);
//     const patientData = patientResult.rows[0];

//     if (!patientData) {
//       return res.status(404).json({ error: "Patient not found" });
//     }

//     // Log the retrieved data for debugging
//     console.log("Retrieved patient data:", patientData);

//     // Calculate age
//     const dob = new Date(patientData.born);
//     const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));

//     // Format date function
//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       const day = date.getDate();
//       const month = date.toLocaleString("en-US", { month: "long" });
//       const year = date.getFullYear();
//       return `${day} ${month} ${year}`;
//     };

//     // Format gender
//     const gender = patientData.gender ? "male" : "female";

//     // Format born date
//     const born = formatDate(patientData.born);

//     // Format start date
//     const start = formatDate(patientData.start);

//     // Extract last appointment and next appointment
//     const lastAppointment = patientData.lastappointment; // Change to lowercase 'lastappointment'
//     const nextAppointment = patientData.nextappointment; // Change to lowercase 'nextappointment'

//     // Log the raw values of last and next appointment
//     console.log("Raw last appointment:", lastAppointment);
//     console.log("Raw next appointment:", nextAppointment);

//     // Format last appointment
//     const formattedLastAppointment = lastAppointment
//       ? formatDate(lastAppointment)
//       : "-";

//     // Format next appointment
//     const formattedNextAppointment = nextAppointment
//       ? formatDate(nextAppointment)
//       : "-";

//     // Extract mood from the data
//     const mood = patientData.mood ? patientData.mood : "-";

//     // Prepare the response
//     const responseData = {
//       patientID,
//       name: `${patientData.fname} ${patientData.lname}`,
//       gender,
//       age,
//       born,
//       start,
//       lastAppointment: formattedLastAppointment,
//       nextAppointment: formattedNextAppointment,
//       tel: patientData.tel,
//       email: patientData.email,
//       mood
//     };

//     // Send the response
//     res.json(responseData);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

router.post('/adPersonalData', auth, async (req, res) => {
    const { patientID } = req.body;
    const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

    try {
        // Query to fetch patient data
        const patientQuery = `
            SELECT 
                p.fname,
                p.lname,
                p.gender,
                p.born,
                p.start_date AS start,
                p.email,
                p.phone AS tel,
                (SELECT date FROM appointment_new2 WHERE patient_id = p.patient_id AND date <= CURRENT_DATE AND confirm = 'Y' AND active_flag = 'Y' ORDER BY date DESC LIMIT 1) AS lastAppointment,
                (SELECT date FROM appointment_new2 WHERE patient_id = p.patient_id AND date > CURRENT_DATE AND confirm = 'Y' AND active_flag = 'Y' ORDER BY date ASC LIMIT 1) AS nextAppointment,
                (
                    SELECT 
                        CASE 
                            WHEN m.positive >= m.negative AND m.positive >= m.neutral THEN 'positive'
                            WHEN m.negative >= m.positive AND m.negative >= m.neutral THEN 'negative'
                            ELSE 'neutral'
                        END
                    FROM avatar_mood_detection AS m 
                    WHERE m.patient_id = p.patient_id
                      AND m.date <= CURRENT_DATE  -- Use only records up to the current date
                    ORDER BY m.date DESC
                    LIMIT 1
                ) AS mood
            FROM 
                public.patient AS p
            WHERE 
                p.patient_id = $1`;

        const patientResult = await client.query(patientQuery, [numericPatientID]);
        const patientData = patientResult.rows[0];

        if (!patientData) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Log the retrieved data for debugging
        console.log('Retrieved patient data:', patientData);

        // Calculate age
        const dob = new Date(patientData.born);
        const age = Math.floor(
          (new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000)
        );

        // Format date function
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString("en-US", { month: "long" });
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        };

        // Format gender
        const gender = patientData.gender ? "male" : "female";

        // Format born date
        const born = formatDate(patientData.born);

        // Format start date
        const start = formatDate(patientData.start);

        // Extract last appointment and next appointment
        const lastAppointment = patientData.lastappointment; // Change to lowercase 'lastappointment'
        const nextAppointment = patientData.nextappointment; // Change to lowercase 'nextappointment'

        // Log the raw values of last and next appointment
        console.log("Raw last appointment:", lastAppointment);
        console.log("Raw next appointment:", nextAppointment);

        // Format last appointment
        const formattedLastAppointment = lastAppointment
            ? formatDate(lastAppointment)
            : "-";

        // Format next appointment
        const formattedNextAppointment = nextAppointment
            ? formatDate(nextAppointment)
            : "-";

        // Extract mood from the data
        let mood = "-";
        let avatarMood = "-";
        if (patientData.mood) {
            const moodData = await getAvatarMoodDetection(numericPatientID);
            mood = moodData ? getHighestMood(moodData.avatarMoodDetec) : "-";
            avatarMood = moodData ? moodData.mood : "-";
        }

        // Fetch additional data
        const avgMoodResult = await getAverageScores(numericPatientID);
        const historyTestResult = await getHistoryTest(numericPatientID);
        const avatarMoodDetectionResult = await getAvatarMoodDetection(numericPatientID);

        // Determine the mood text based on the average mood score
        let moodText = "";
        if (avgMoodResult.avgMood === null) {
            moodText = "Unknown"; // Set a default mood text if the average mood is not available
        } else if (avgMoodResult.avgMood < 2) {
            moodText = "terrible";
        } else if (avgMoodResult.avgMood >= 2 && avgMoodResult.avgMood < 3) {
            moodText = "bad";
        } else if (avgMoodResult.avgMood >= 3 && avgMoodResult.avgMood < 4) {
            moodText = "soso";
        } else if (avgMoodResult.avgMood >= 4 && avgMoodResult.avgMood < 5) {
            moodText = "happy";
        } else {
            moodText = "cheerful";
        }

        // Prepare the response
        const responseData = {
            patientID,
            name: `${patientData.fname} ${patientData.lname}`,
            gender,
            age,
            born,
            start,
            lastAppointment: formattedLastAppointment,
            nextAppointment: formattedNextAppointment,
            tel: patientData.tel,
            email: patientData.email,
            mood: avatarMood,
            avgMood: moodText,
            dateBetween: avgMoodResult.dateBetween,
            historyTest: historyTestResult.historyTest,
            dateAvatarMoodDetec: avatarMoodDetectionResult.date,
            avatarMood,
        };

        // Send the response
        res.json(responseData);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

//function getAverageScores
async function getAverageScores(patient_id) {
  const avgScoreQuery = `
      SELECT AVG(score)::numeric(10, 2) AS average_score,
             MIN(date_time) AS earliest_date
      FROM mood_tracker
      WHERE patient_id = $1
      GROUP BY patient_id
      ORDER BY earliest_date DESC
      LIMIT 7;
    `;

  try {
    const result = await client.query(avgScoreQuery, [patient_id]);
    if (result.rows.length === 0 || !result.rows[0].earliest_date) {
      return { avgMood: null, dateBetween: null };
    }

    const average_score = result.rows[0].average_score;

    const startDate = new Date(result.rows[0].earliest_date);

    const endDate = new Date();

    const formattedStartDate = `${startDate.getDate()} ${getMonthName(
      startDate.getMonth()
    )} ${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()} ${getMonthName(
      endDate.getMonth()
    )} ${endDate.getFullYear()}`;

    const dateBetween = `${formattedStartDate} - ${formattedEndDate}`;

    return { avgMood: average_score, dateBetween };
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

// function getMonthName(month) {
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   return months[month];
// }

function getMonthName(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  }

//function getHistoryTest
// async function getHistoryTest(patientId) {
//   const query = `
//       SELECT score, type, date_time
//       FROM test_score
//       WHERE answer IS NULL
//       ORDER BY date_time DESC
//       LIMIT 2
//     `;
//   const queryParams = [];

//   try {
//     const result = await client.query(query, queryParams);

//     if (result.rows.length === 0) {
//       return { error: "No history test data found." };
//     }

//     const modifiedResult = {
//       historyTest: {},
//     };

//     result.rows.forEach((row, index) => {
//       const { type, date_time } = row;
//       let resultText = "";

//       if (type === "PHQ9") {
//         const resultValue = parseInt(row.score, 10);
//         if (resultValue < 7) {
//           resultText =
//             "ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก";
//         } else if (resultValue >= 7 && resultValue <= 12) {
//           resultText = "ท่านมีอาการซึมเศร้าในระดับน้อย";
//         } else if (resultValue >= 13 && resultValue <= 18) {
//           resultText = "ท่านมีอาการซึมเศร้าในระดับปานกลาง";
//         } else if (resultValue >= 19) {
//           resultText = "ท่านมีอาการซึมเศร้าในระดับรุนแรง";
//         }
//       } else if (type === "2Q") {
//         const resultValue = parseInt(row.score, 10);
//         resultText =
//           resultValue !== 0
//             ? "ท่านมีแนวโน้มเป็นโรคซึมเศร้า"
//             : "ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า";
//       }

//       const formattedDate = `${date_time.getDate()} ${getMonthName(
//         date_time.getMonth()
//       )} ${date_time.getFullYear()}`;

//       modifiedResult.historyTest[`type${index + 1}`] = type;
//       modifiedResult.historyTest[`result${index + 1}`] = resultText;
//       modifiedResult.historyTest[`date${index + 1}`] = formattedDate;
//     });

//     // Include dateAvatar information
//     if (result.rows.length > 0) {
//       const dateAvatar = result.rows[0].date_time;
//       modifiedResult.dateAvatar = `${dateAvatar.getDate()} ${getMonthName(
//         dateAvatar.getMonth()
//       )} ${dateAvatar.getFullYear()} at ${dateAvatar.getHours()}:${dateAvatar.getMinutes()}:${dateAvatar.getSeconds()}`;
//     }

//     return modifiedResult;
//   } catch (err) {
//     console.error("Error executing query:", err);
//     return { error: "An error occurred while fetching history test data." };
//   }
// }

async function getHistoryTest(patientId) {
  const query = `
      SELECT score, type, date_time
      FROM test_score
      WHERE answer IS NULL
      AND patient_id = $1  -- Filter by patient_id
      ORDER BY date_time DESC
      LIMIT 2
    `;
  const queryParams = [patientId];

  try {
    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      return { error: "No history test data found." };
    }

    const modifiedResult = {
      historyTest: {},
    };

    result.rows.forEach((row, index) => {
      const { type, date_time } = row;
      let resultText = "";

      if (type === "PHQ9") {
        const resultValue = parseInt(row.score, 10);
        if (resultValue < 7) {
          resultText =
            "ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก";
        } else if (resultValue >= 7 && resultValue <= 12) {
          resultText = "ท่านมีอาการซึมเศร้าในระดับน้อย";
        } else if (resultValue >= 13 && resultValue <= 18) {
          resultText = "ท่านมีอาการซึมเศร้าในระดับปานกลาง";
        } else if (resultValue >= 19) {
          resultText = "ท่านมีอาการซึมเศร้าในระดับรุนแรง";
        }
      } else if (type === "2Q") {
        const resultValue = parseInt(row.score, 10);
        resultText =
          resultValue !== 0
            ? "ท่านมีแนวโน้มเป็นโรคซึมเศร้า"
            : "ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า";
      }

      const formattedDate = `${date_time.getDate()} ${getMonthName(
        date_time.getMonth()
      )} ${date_time.getFullYear()}`;

      modifiedResult.historyTest[`type${index + 1}`] = type;
      modifiedResult.historyTest[`result${index + 1}`] = resultText;
      modifiedResult.historyTest[`date${index + 1}`] = formattedDate;
    });

    // Include dateAvatar information
    if (result.rows.length > 0) {
      const dateAvatar = result.rows[0].date_time;
      modifiedResult.dateAvatar = `${dateAvatar.getDate()} ${getMonthName(
        dateAvatar.getMonth()
      )} ${dateAvatar.getFullYear()} at ${dateAvatar.getHours()}:${dateAvatar.getMinutes()}:${dateAvatar.getSeconds()}`;
    }

    return modifiedResult;
  } catch (err) {
    console.error("Error executing query:", err);
    return { error: "An error occurred while fetching history test data." };
  }
}

//function getMood
// async function getAvatarMoodDetection(patientId) {
//     const query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection WHERE patient_id = $1 ORDER BY date DESC LIMIT 1';
//     const queryParams = [patientId];

//     try {
//         const result = await client.query(query, queryParams);

//         // Check if there is no data returned
//         if (result.rows.length === 0) {
//             // If no data is found, return a default mood
//             return { date: null, avatarMoodDetec: null, mood: 'neutral' };
//         }

//         const { date, positive, negative, neutral } = result.rows[0];

//         // Determine the mood with the highest value
//         let avatarMood = '';
//         let highestValue = Math.max(parseFloat(positive), parseFloat(negative), parseFloat(neutral));
//         if (positive === highestValue) {
//             avatarMood = 'positive';
//         } else if (negative === highestValue) {
//             avatarMood = 'negative';
//         } else {
//             avatarMood = 'neutral';
//         }

//         // Format the date
//         const formattedDate = formatDate(date);

//         return { date: formattedDate, avatarMoodDetec: `${highestValue}%`, mood: avatarMood };
//     } catch (err) {
//         console.error('Error executing query:', err);
//         return { error: 'An error occurred while fetching avatar mood detection data.' };
//     }
// }

async function getAvatarMoodDetection(patientId) {
  const query = 'SELECT date, positive_percent, nagative_percent, neutral_percent FROM avatar WHERE patient_id = $1 ORDER BY date DESC LIMIT 1';
  const queryParams = [patientId];

  try {
    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      // If no data is found, return a default mood
      return { date: null, avatarMoodDetec: null, mood: 'neutral' };
    }

    const { date, positive_percent, nagative_percent, neutral_percent } = result.rows[0];

    // Determine the mood with the highest value
    let avatarMood = '';
    let highestValue = Math.max(parseFloat(positive_percent), parseFloat(nagative_percent), parseFloat(neutral_percent));
    if (highestValue === positive_percent) {
      avatarMood = 'positive';
    } else if (highestValue === nagative_percent) {
      avatarMood = 'negative';
    } else {
      avatarMood = 'neutral';
    }

    // Format the date using the formatDate function
    const formattedDate = formatDate(date);

    return { date: formattedDate, avatarMoodDetec: `${highestValue}%`, mood: avatarMood };
  } catch (err) {
    console.error('Error executing query:', err);
    return { error: 'An error occurred while fetching avatar mood detection data.' };
  }
}

// Modified formatDate function to remove the time part
function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = getMonthName(dateObj.getMonth());
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
}

// router.post('/editPersonalData', (req, res) => {
//     const { patientID } = req.body;
//     const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//     let query = 'SELECT * FROM therapist';
  
//     // Check if the id parameter is provided
//     if (therapist_id) {
//       query += ' WHERE therapist_id = $1';
//     }
  
//     const queryParams = therapist_id ? [therapist_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });

// router.post('/editPersonalData', (req, res) => {
//     const { patientID, fname, lname, phone, email, password, therapistName } = req.body;

//     // Extract numeric part of patientID
//     const numericPatientID = patientID.replace(/\D/g, '');

//     // Update patient data
//     let query = `UPDATE public.patient 
//                  SET fname = $1, lname = $2, phone = $3, email = $4 
//                  WHERE patient_id = $5`;

//     const params = [fname, lname, phone, email, numericPatientID];

//     client.query(query, params)
//         .then(() => {
//             // Update email and password in users table if provided
//             if (email && password) {
//                 const userQuery = `UPDATE public.users 
//                                    SET email = $1, password = $2 
//                                    WHERE patient_id = $3`;

//                 const userParams = [email, password, numericPatientID];

//                 client.query(userQuery, userParams)
//                     .then(() => {
//                         // Map therapistName to therapist_id
//                         const therapistQuery = `SELECT therapist_id 
//                                                 FROM public.therapist 
//                                                 WHERE fname || ' ' || lname = $1`;

//                         const therapistParams = [therapistName];

//                         client.query(therapistQuery, therapistParams)
//                             .then(result => {
//                                 if (result.rows.length > 0) {
//                                     const therapist_id = result.rows[0].therapist_id;

//                                     // Update therapist_id in patient table
//                                     const updateTherapistQuery = `UPDATE public.patient 
//                                                                   SET therapist_id = $1 
//                                                                   WHERE patient_id = $2`;

//                                     const updateTherapistParams = [therapist_id, numericPatientID];

//                                     client.query(updateTherapistQuery, updateTherapistParams)
//                                         .then(() => {
//                                             res.json({ success: true, message: 'Personal data updated successfully' });
//                                         })
//                                         .catch(err => {
//                                             console.error('Error updating therapist_id in patient table:', err);
//                                             res.status(500).json({ error: 'An error occurred' });
//                                         });
//                                 } else {
//                                     res.status(400).json({ error: 'Therapist not found' });
//                                 }
//                             })
//                             .catch(err => {
//                                 console.error('Error querying therapist table:', err);
//                                 res.status(500).json({ error: 'An error occurred' });
//                             });
//                     })
//                     .catch(err => {
//                         console.error('Error updating email and password in users table:', err);
//                         res.status(500).json({ error: 'An error occurred' });
//                     });
//             } else {
//                 res.json({ success: true, message: 'Personal data updated successfully' });
//             }
//         })
//         .catch(err => {
//             console.error('Error updating patient data:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/adEditPersonalData', async (req, res) => {
//     const { patientID, fname, lname, phone, email, password, therapistName } = req.body;

//     // Extract numeric part of patientID
//     const numericPatientID = patientID.replace(/\D/g, '');

//     try {
//         // Update patient data
//         let query = `UPDATE public.patient 
//                      SET fname = $1, lname = $2, phone = $3, email = $4 
//                      WHERE patient_id = $5`;

//         const params = [fname, lname, phone, email, numericPatientID];

//         await client.query(query, params);

//         // Update email and password in users table if provided
//         if (email && password) {
//             // Hash the password
//             const passwordString = String(password);
//             const hashedPassword = await bcrypt.hash(passwordString, 10);

//             const userQuery = `UPDATE public.users 
//                                SET email = $1, password = $2 
//                                WHERE patient_id = $3`;

//             const userParams = [email, hashedPassword, numericPatientID];

//             await client.query(userQuery, userParams);
//         }

//         // Map therapistName to therapist_id
//         if (therapistName) {
//             const therapistQuery = `SELECT therapist_id 
//                                     FROM public.therapist 
//                                     WHERE fname || ' ' || lname = $1`;

//             const therapistParams = [therapistName];

//             const therapistResult = await client.query(therapistQuery, therapistParams);

//             if (therapistResult.rows.length > 0) {
//                 const therapist_id = therapistResult.rows[0].therapist_id;

//                 // Update therapist_id in patient table
//                 const updateTherapistQuery = `UPDATE public.patient 
//                                               SET therapist_id = $1 
//                                               WHERE patient_id = $2`;

//                 const updateTherapistParams = [therapist_id, numericPatientID];

//                 await client.query(updateTherapistQuery, updateTherapistParams);
//             } else {
//                 return res.status(400).json({ error: 'Therapist not found' });
//             }
//         }

//         res.json({ success: true, message: 'Personal data updated successfully' });
//     } catch (err) {
//         console.error('Error updating personal data:', err);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

router.post('/adEditPersonalData', auth, async (req, res) => {
  const { patientID, fname, lname, phone, email, password, therapistName, gender } = req.body;

  // Extract numeric part of patientID
  const numericPatientID = patientID.replace(/\D/g, '');

  // Convert gender string to boolean
  const genderBoolean = (gender.toLowerCase() === 'male');

  try {
      // Update patient data including gender
      let query = `UPDATE public.patient 
                   SET fname = $1, lname = $2, phone = $3, email = $4, gender = $5
                   WHERE patient_id = $6`;

      const params = [fname, lname, phone, email, genderBoolean, numericPatientID];

      await client.query(query, params);

      // Update email and password in users table if provided
      if (email) {
          let userParams;
          let userQuery;

          if (password) {
              // Hash the new password
              const hashedPassword = await bcrypt.hash(String(password), 10);
              userQuery = `UPDATE public.users 
                           SET email = $1, password = $2 
                           WHERE patient_id = $3`;
              userParams = [email, hashedPassword, numericPatientID];
          } else {
              // Keep the old password
              userQuery = `UPDATE public.users 
                           SET email = $1
                           WHERE patient_id = $2`;
              userParams = [email, numericPatientID];
          }

          await client.query(userQuery, userParams);
      }

      // Map therapistName to therapist_id
      if (therapistName) {
          const therapistQuery = `SELECT therapist_id 
                                  FROM public.therapist 
                                  WHERE fname || ' ' || lname = $1`;

          const therapistParams = [therapistName];

          const therapistResult = await client.query(therapistQuery, therapistParams);

          if (therapistResult.rows.length > 0) {
              const therapist_id = therapistResult.rows[0].therapist_id;

              // Update therapist_id in patient table
              const updateTherapistQuery = `UPDATE public.patient 
                                            SET therapist_id = $1 
                                            WHERE patient_id = $2`;

              const updateTherapistParams = [therapist_id, numericPatientID];

              await client.query(updateTherapistQuery, updateTherapistParams);
          } else {
              return res.status(400).json({ error: 'Therapist not found' });
          }
      }

      res.json({ success: true, message: 'Personal data updated successfully' });
  } catch (err) {
      console.error('Error updating personal data:', err);
      res.status(500).json({ error: 'An error occurred' });
  }
});


// router.post('/viewPersonalData', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID
//   const formattedPatientID = `PID${numericPatientID}`;

//   let query = `
//       SELECT p.patient_id, p.fname AS patient_fname, p.lname AS patient_lname, p.phone AS patient_phone, p.email AS patient_email,
//              t.fname AS therapist_fname, t.lname AS therapist_lname
//       FROM public.patient p
//       INNER JOIN public.therapist t ON p.hospital_name = t.hospital_name
//       WHERE p.patient_id = $1
//   `;

//   const queryParams = [numericPatientID];

//   client.query(query, queryParams)
//     .then(result => {
//       const therapists = result.rows.map(row => `${row.therapist_fname} ${row.therapist_lname}`);

//       const formattedResult = {
//         patientID: formattedPatientID,
//         fname: result.rows[0].patient_fname,
//         lname: result.rows[0].patient_lname,
//         phone: result.rows[0].patient_phone,
//         email: result.rows[0].patient_email,
//         therapistAll: therapists
//       };
//       res.json(formattedResult);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adViewPersonalData', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID
//   const formattedPatientID = `PID${numericPatientID}`;

//   let query = `
//       SELECT p.patient_id, p.fname AS patient_fname, p.lname AS patient_lname, p.phone AS patient_phone, p.email AS patient_email,
//              t.fname AS therapist_fname, t.lname AS therapist_lname
//       FROM public.patient p
//       INNER JOIN public.therapist t ON p.hospital_name = t.hospital_name
//       WHERE p.patient_id = $1
//         AND t.admin = 'N' -- Add condition to filter therapists with admin value 'N'
//   `;

//   const queryParams = [numericPatientID];

//   client.query(query, queryParams)
//     .then(result => {
//       const therapists = result.rows.map(row => `${row.therapist_fname} ${row.therapist_lname}`);

//       const formattedResult = {
//         patientID: formattedPatientID,
//         fname: result.rows[0].patient_fname,
//         lname: result.rows[0].patient_lname,
//         phone: result.rows[0].patient_phone,
//         email: result.rows[0].patient_email,
//         therapistAll: therapists
//       };
//       res.json(formattedResult);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/adViewPersonalData', auth, (req, res) => {
  const { patientID } = req.body;
  const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID
  const formattedPatientID = `PID${numericPatientID}`;

  let query = `
      SELECT p.patient_id, p.fname AS patient_fname, p.lname AS patient_lname, p.phone AS patient_phone, p.email AS patient_email,
             t.fname AS therapist_fname, t.lname AS therapist_lname
      FROM public.patient p
      INNER JOIN public.therapist t ON p.therapist_id = t.therapist_id
      WHERE p.patient_id = $1
  `;

  const queryParams = [numericPatientID];

  client.query(query, queryParams)
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const formattedResult = {
        patientID: formattedPatientID,
        fname: result.rows[0].patient_fname,
        lname: result.rows[0].patient_lname,
        phone: result.rows[0].patient_phone,
        email: result.rows[0].patient_email,
        therapist: `${result.rows[0].therapist_fname} ${result.rows[0].therapist_lname}`
      };
      res.json(formattedResult);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// router.post('/deletePatient', (req, res) => {
//     const { patientID } = req.body;
//     const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//     let query = 'SELECT * FROM therapist';
  
//     // Check if the id parameter is provided
//     if (therapist_id) {
//       query += ' WHERE therapist_id = $1';
//     }
  
//     const queryParams = therapist_id ? [therapist_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });

router.post('/adDeletePatient', auth, (req, res) => {
  const { patientID } = req.body;
  const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

  // Start a transaction
  client.query('BEGIN', (err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Define queries to delete data from both tables
    const deleteUserQuery = 'DELETE FROM public.users WHERE patient_id = $1';
    const deletePatientQuery = 'DELETE FROM public.patient WHERE patient_id = $1';

    // Execute both delete queries with the same parameter
    client.query(deleteUserQuery, [numericPatientID], (err, result) => {
      if (err) {
        // Rollback transaction and handle error
        console.error('Error deleting user:', err);
        client.query('ROLLBACK', () => {
          res.status(500).json({ error: 'An error occurred' });
        });
      } else {
        // Execute delete query for patient
        client.query(deletePatientQuery, [numericPatientID], (err, result) => {
          if (err) {
            // Rollback transaction and handle error
            console.error('Error deleting patient:', err);
            client.query('ROLLBACK', () => {
              res.status(500).json({ error: 'An error occurred' });
            });
          } else {
            // Commit transaction if both delete operations succeed
            client.query('COMMIT', (err) => {
              if (err) {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'An error occurred' });
              } else {
                // Send success response
                res.json({ message: 'User and patient deleted successfully' });
              }
            });
          }
        });
      }
    });
  });
});


module.exports = router;