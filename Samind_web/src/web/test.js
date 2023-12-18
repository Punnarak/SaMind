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



module.exports = router;