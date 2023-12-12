const client = require('./connection.js')
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
  // requireTLS: true,
  host: "smtp.gmail.com.",
  port: 465,
  secure: true,
  auth: {
    user: "desmotest123@gmail.com",
    pass: "uovg pqyt utur dvyz",
  },
});

router.get('/question', (req, res) => {
  const type = req.query.type; // Get the type parameter from the query
  let query = 'SELECT no, question, options, type FROM questionnaire_new';

  // Check if the type parameter is provided
  if (type) {
    query += ' WHERE type LIKE $1';
  }

  const queryParams = type ? [type] : [];

  client.query(query, queryParams)
    .then(result => {
      const formattedResults = result.rows.map(row => {
        let options;

        try {
          // Attempt to parse the options field as JSON
          options = row.options;
        } catch (error) {
          // Handle any parsing errors, e.g., if the data is not valid JSON
          options = null; // Or handle the error in an appropriate way for your use case
        }

        return {
          no: row.no,
          question: row.question,
          options: options,
          type: row.type
        };
      });

      formattedResults.sort((a, b) => a.no - b.no);
      res.json(formattedResults);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});



router.post('/questionAdd', (req, res) => {
  const requestData = req.body; // Assuming req.body is an array of objects
  // const email = req.body;

  if (!Array.isArray(requestData)) {
    return res.status(400).json({ error: 'Request data should be an array of objects.' });
  }

  // Iterate through each item in the array and insert it into the database with auto-generated IDs
  const insertQueries = requestData.map(item => {
    const { no, question, options, type } = item;

    if (!question || !options || !type || !no) {
      return res.status(400).json({ error: 'Each item in the array must have question, options, and type fields.' });
    }

    const id = uuidv4(); // Generate a new UUID for the question
    const optionsString = JSON.stringify(options);

    const insertQuery = 'INSERT INTO questionnaire_new (id, no, question, options, type) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    return client.query(insertQuery, [id, no, question, optionsString, type]);
  });

  // Execute all insert queries concurrently
  Promise.all(insertQueries)
    .then(results => {
      const insertedItems = results.map(result => result.rows[0]);
      // Send an email notification
      const mailOptions = {
        from: 'desmotest123@gmail.com',
        to: 'psho300@gmail.com', //fix this email for next update
        subject: 'New Question',
        text: `Test_text Question`,
        html: `<b>Test_html Question</b>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email notification sent:', info.response);
        }
      });

      res.status(201).json(insertedItems);
    })
    .catch(err => {
      console.error('Error executing queries:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// router.get('/questiontype', (req, res) => {
//   let query = 'SELECT DISTINCT type FROM questionnaire_new';

//   client.query(query)
//     .then(result => {
//       const types = result.rows.map(row => row.type);
//       res.json(types);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/assignment_status_wait', (req, res) => {
  const patientId = req.body.patient_id; // Assuming the patient_id is in the request body

  // Use $1 as a placeholder for the parameter in the query
  let query = 'SELECT test_name FROM assignment WHERE patient_id = $1 AND status = $2';

  // Pass an array of parameter values as the second argument to the query function
  client.query(query, [patientId, 'WAIT'])
    .then(result => {
      const testNames = result.rows.map(row => row.test_name);
      res.json(testNames);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/individual_test_post', (req, res) => {
  const patientId = req.body.patient_id;
  const testName = req.body.test_name;

  // Use $1 and $2 as placeholders for the parameters in the query
  let query = `
    SELECT assignment.*, questionnaire_new2.question, questionnaire_new2.options
    FROM assignment
    LEFT JOIN questionnaire_new2 ON questionnaire_new2.test_name = assignment.test_name
    WHERE assignment.patient_id = $1 AND assignment.test_name = $2 AND assignment.status = 'WAIT'
  `;

  // Pass an array of parameter values as the second argument to the query function
  client.query(query, [patientId, testName])
    .then(result => {
      const testData = result.rows;
      res.json(testData);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// ver use body
router.delete('/questionsDel', (req, res) => {
  const type = req.body.type; // Get the type from the request body

  if (!type) {
    return res.status(400).json({ error: 'Type parameter is required.' });
  }

  const deleteQuery = 'DELETE FROM questionnaire_new WHERE type = $1';

  client.query(deleteQuery, [type])
    .then(result => {
      const deletedRowCount = result.rowCount;
      res.json({ message: `Deleted ${deletedRowCount} questions with type ${type}.` });
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/score_question_post', async (req, res) => {
  const { score, type, patient_id } = req.body;

  if (!score || !type || !patient_id) {
    return res.status(400).json({ error: 'score, type, and patient_id are required fields.' });
  }

  // Use a sequence to generate the score_id
  const generateScoreIdQuery = 'SELECT NEXTVAL(\'score_id_seq\') AS score_id';

  // Insert the new entry
  const insertQuery = 'INSERT INTO test_score (score_id, score, type, date_time, patient_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // To start the month from 1
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  try {
    // Execute the query to generate the score_id
    const scoreIdResult = await client.query(generateScoreIdQuery);

    // Extract the generated score_id from the result
    const generatedScoreId = scoreIdResult.rows[0].score_id;

    // Insert the new entry with the generated score_id
    const insertResult = await client.query(insertQuery, [generatedScoreId, score, type, formattedDate, patient_id]);
    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred while inserting the new entry' });
  }
});

router.get('/score_question_get', (req, res) => {
  const id = req.query.patient_id; // Get the id parameter from the query
  let query = 'SELECT * FROM test_score';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY patient_id';

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

// router.get('/finish_two_latest_question_get', (req, res) => {
//   const id = req.query.patient_id; // Get the id parameter from the query
//   const date = req.query.date_time;
//   let query = 'SELECT * FROM test_score';

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

router.get('/finish_two_latest_question_get', (req, res) => {
  const id = req.query.patient_id; // Get the id parameter from the query
  let query = 'SELECT * FROM test_score';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE patient_id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "date_time" column in descending order
  query += ' ORDER BY date_time DESC';

  // Add a "LIMIT" clause to get only the top 2 rows
  query += ' LIMIT 2';

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