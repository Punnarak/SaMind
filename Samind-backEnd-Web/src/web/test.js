const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

router.use(bodyParser.json());

// router.post('/allTest', (req, res) => {
//     const therapistId = req.body.therapist_id; // Use req.body to get parameters from the request body
//     let query = `
//         SELECT questionnaire_new2.*, therapist.fname AS therapist_name
//         FROM questionnaire_new2
//         LEFT JOIN therapist ON therapist.fname = questionnaire_new2.create_by
//     `;
  
//     // Check if the therapist_id parameter is provided
//     if (therapistId) {
//         query += ' WHERE therapist.therapist_id = $1';
//     }
  
//     const queryParams = therapistId ? [therapistId] : [];
  
//     client.query(query, queryParams)
//         .then(result => {
//             res.json(result.rows);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/allTest', (req, res) => {
//     const therapistId = req.body.therapist_id; // Use req.body to get parameters from the request body
//     let query = `
//         SELECT
//             ROW_NUMBER() OVER (ORDER BY questionnaire_new2.questionnaire_id) AS no,
//             questionnaire_new2.test_name AS testName
//         FROM questionnaire_new2
//         LEFT JOIN therapist ON therapist.fname = questionnaire_new2.create_by
//     `;

//     // Check if the therapist_id parameter is provided
//     if (therapistId) {
//         query += ' WHERE therapist.therapist_id = $1';
//     }

//     const queryParams = therapistId ? [therapistId] : [];

//     client.query(query, queryParams)
//         .then(result => {
//             res.json(result.rows);
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/allTest', (req, res) => {
    const therapistId = req.body.therapist_id; // Use req.body to get parameters from the request body
    let query = `
        SELECT
            ROW_NUMBER() OVER (ORDER BY questionnaire_new2.test_name) AS no,
            questionnaire_new2.test_name AS testName
        FROM (
            SELECT DISTINCT ON (questionnaire_new2.test_name)
                questionnaire_new2.test_name
            FROM questionnaire_new2
            LEFT JOIN therapist ON therapist.fname = questionnaire_new2.create_by
            ${therapistId ? 'WHERE therapist.therapist_id = $1' : ''}
        ) AS questionnaire_new2
    `;

    const queryParams = therapistId ? [therapistId] : [];

    client.query(query, queryParams)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

// router.post('/viewOneQuestion', (req, res) => {
//     const type = req.query.test_name; // Get the id parameter from the query
//     let query = 'SELECT no, question, options, test_name FROM questionnaire_new2';
  
//     // Check if the id parameter is provided
//     if (type) {
//       query += ' WHERE test_name = $1';
//     }
  
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

router.post('/viewOneQuestion', (req, res) => {
    const type = req.body.type; // Get the type from the JSON body
    let query = 'SELECT no, question, options, test_name FROM questionnaire_new2';
  
    // Check if the type is provided
    if (type) {
      query += ' WHERE test_name = $1';
    }
  
    query += ' ORDER BY no'; // Order by the "no" column
  
    const queryParams = type ? [type] : [];
  
    client.query(query, queryParams)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});

// router.post('/questionAdd', (req, res) => {
//     const requestData = req.body; // Assuming req.body is an array of objects
//     // const email = req.body;
  
//     if (!Array.isArray(requestData)) {
//       return res.status(400).json({ error: 'Request data should be an array of objects.' });
//     }
  
//     // Iterate through each item in the array and insert it into the database with auto-generated IDs
//     const insertQueries = requestData.map(item => {
//       const { no, question, options, type } = item;
  
//       if (!question || !options || !type || !no) {
//         return res.status(400).json({ error: 'Each item in the array must have question, options, and type fields.' });
//       }
  
//       const id = uuidv4(); // Generate a new UUID for the question
//       const optionsString = JSON.stringify(options);
  
//       const insertQuery = 'INSERT INTO questionnaire_new (id, no, question, options, type) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  
//       return client.query(insertQuery, [id, no, question, optionsString, type]);
//     });

// // ver use body
// router.delete('/questionsDel', (req, res) => {
//     const type = req.body.type; // Get the type from the request body
  
//     if (!type) {
//       return res.status(400).json({ error: 'Type parameter is required.' });
//     }
  
//     const deleteQuery = 'DELETE FROM questionnaire_new WHERE type = $1';
  
//     client.query(deleteQuery, [type])
//       .then(result => {
//         const deletedRowCount = result.rowCount;
//         res.json({ message: `Deleted ${deletedRowCount} questions with type ${type}.` });
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
// });
  

module.exports = router;