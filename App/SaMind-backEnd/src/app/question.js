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

// router.post('/questionAdd', (req, res) => {
//   const requestData = req.body; // Assuming req.body is an array of objects
//   // const email = req.body;

//   if (!Array.isArray(requestData)) {
//     return res.status(400).json({ error: 'Request data should be an array of objects.' });
//   }

//   // Iterate through each item in the array and insert it into the database with auto-generated IDs
//   const insertQueries = requestData.map(item => {
//     const { no, question, options, type } = item;

//     if (!question || !options || !type || !no) {
//       return res.status(400).json({ error: 'Each item in the array must have question, options, and type fields.' });
//     }

//     const id = uuidv4(); // Generate a new UUID for the question
//     const optionsString = JSON.stringify(options);

//     const insertQuery = 'INSERT INTO questionnaire_new (id, no, question, options, type) VALUES ($1, $2, $3, $4, $5) RETURNING *';

//     return client.query(insertQuery, [id, no, question, optionsString, type]);
//   });

//   // Execute all insert queries concurrently
//   Promise.all(insertQueries)
//     .then(results => {
//       const insertedItems = results.map(result => result.rows[0]);
//       // Send an email notification
//       const mailOptions = {
//         from: 'desmotest123@gmail.com',
//         to: 'psho300@gmail.com', //fix this email for next update
//         subject: 'New Question',
//         text: `Test_text Question`,
//         html: `<b>Test_html Question</b>`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//         } else {
//           console.log('Email notification sent:', info.response);
//         }
//       });

//       res.status(201).json(insertedItems);
//     })
//     .catch(err => {
//       console.error('Error executing queries:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

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

// router.post('/assignment_status_wait', (req, res) => {
//   const patientId = req.body.patient_id; // Assuming the patient_id is in the request body

//   // Use $1 as a placeholder for the parameter in the query
//   let query = 'SELECT test_name FROM assignment WHERE patient_id = $1 AND status = $2';

//   // Pass an array of parameter values as the second argument to the query function
//   client.query(query, [patientId, 'WAIT'])
//     .then(result => {
//       const testNames = result.rows.map(row => row.test_name);
//       res.json(testNames);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/assignment_status_wait', (req, res) => {
//   const patientId = req.body.patient_id; // Assuming the patient_id is in the request body

//   // Use $1 as a placeholder for the parameter in the query
//   let query = 'SELECT test_name, detail, turn_in_before FROM assignment WHERE patient_id = $1 AND status = $2';

//   // Pass an array of parameter values as the second argument to the query function
//   client.query(query, [patientId, 'WAIT'])
//     .then(result => {
//       // Assuming your result.rows has the columns test_name, detail, turn_in_before
//       const assignments = result.rows.map(row => ({
//         test_name: row.test_name,
//         detail: row.detail,
//         turn_in_before: row.turn_in_before
//       }));

//       res.json(assignments);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/assignment_status_wait', (req, res) => {
//   const patientId = req.body.patient_id; // Assuming the patient_id is in the request body

//   // Use $1 as a placeholder for the parameter in the query
//   let query = 'SELECT test_name, detail, turn_in_before, create_by FROM assignment WHERE patient_id = $1 AND status = $2';

//   // Pass an array of parameter values as the second argument to the query function
//   client.query(query, [patientId, 'WAIT'])
//     .then(result => {
//       // Assuming your result.rows has the columns test_name, detail, turn_in_before
//       const assignments = result.rows.map(row => ({
//         testName: row.test_name, // Change property name from test_name to testName
//         detail: row.detail,
//         createBy: row.create_by,
//         turnInBefore: formatDate(row.turn_in_before), // Format date as "DD-MM-YYYY"
//       }));

//       res.json(assignments);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/assignment_status_wait', (req, res) => {
  const patientId = req.body.patient_id; // Assuming the patient_id is in the request body

  // Use $1 as a placeholder for the parameter in the query
  let query = `
    SELECT a.test_name, a.detail, a.turn_in_before, t.fname
    FROM assignment AS a
    LEFT JOIN therapist AS t ON CAST(a.create_by AS INTEGER) = t.therapist_id
    WHERE a.patient_id = $1 AND a.status = $2
  `;

  // Pass an array of parameter values as the second argument to the query function
  client.query(query, [patientId, 'WAIT'])
    .then(result => {
      // Assuming your result.rows has the columns test_name, detail, turn_in_before, and fname
      const assignments = result.rows.map(row => ({
        testName: row.test_name,
        detail: row.detail,
        createBy: row.fname, // Concatenate "Dr. " with the therapist's first name
        turnInBefore: formatDate(row.turn_in_before), // Format date as "DD-MM-YYYY"
      }));

      res.json(assignments);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});



// Function to format date as "DD-MM-YYYY"
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

// router.post('/individual_test_post', (req, res) => {
//   const patientId = req.body.patient_id;
//   const testName = req.body.test_name;

//   // Use $1 and $2 as placeholders for the parameters in the query
//   let query = `
//     SELECT assignment.*, questionnaire_new2.question, questionnaire_new2.options
//     FROM assignment
//     LEFT JOIN questionnaire_new2 ON questionnaire_new2.test_name = assignment.test_name
//     WHERE assignment.patient_id = $1 AND assignment.test_name = $2 AND assignment.status = 'WAIT'
//     ORDER BY questionnaire_new2.no
//   `;

//   // Pass an array of parameter values as the second argument to the query function
//   client.query(query, [patientId, testName])
//     .then(result => {
//       const testData = result.rows;
//       res.json(testData);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/individual_test_post', (req, res) => {
  const patientId = req.body.patient_id;
  const testName = req.body.test_name;

  // Use $1 and $2 as placeholders for the parameters in the query
  let query = `
    SELECT assignment.*, questionnaire_new2.no, questionnaire_new2.question, questionnaire_new2.options
    FROM assignment
    LEFT JOIN questionnaire_new2 ON questionnaire_new2.test_name = assignment.test_name
    WHERE assignment.patient_id = $1 AND assignment.test_name = $2 AND assignment.status = 'WAIT'
    ORDER BY questionnaire_new2.no
  `;

  // Log the generated SQL query
  console.log(query);

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

// router.post('/map_answer_individual_test', (req, res) => {
//   const patientId = req.body.patient_id; // Assuming the patient_id is in the request body

//   // Use $1 as a placeholder for the parameter in the query
//   let query = 'SELECT test_name, detail, turn_in_before, create_by FROM assignment WHERE patient_id = $1 AND status = $2';

//   // Pass an array of parameter values as the second argument to the query function
//   client.query(query, [patientId, 'WAIT'])
//     .then(result => {
//       // Assuming your result.rows has the columns test_name, detail, turn_in_before
//       const assignments = result.rows.map(row => ({
//         testName: row.test_name, // Change property name from test_name to testName
//         detail: row.detail,
//         createBy: row.create_by,
//         turnInBefore: formatDate(row.turn_in_before), // Format date as "DD-MM-YYYY"
//       }));

//       res.json(assignments);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/receive_answer_individual_post', (req, res) => {
//   const { patient_id, type, answer } = req.body;

//   if (!patient_id || !type || !answer) {
//     return res.status(400).json({ error: 'Both patient_id, type, answer are required fields.' });
//   }

//   const insertQuery = 'INSERT INTO test_score (patient_id, type, answer) VALUES ($1, $2, $3) RETURNING *';

//   client.query(insertQuery, [patient_id, type, answer])
//     .then(result => {
//       res.status(201).json(result.rows[0]);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/receive_answer_individual_post', async (req, res) => {
//   const { type, patientId, answer } = req.body;

//   if (!type || !patientId || !answer) {
//     return res.status(400).json({ error: 'type, patientId, and answer are required fields.' });
//   }

//   // Use a sequence to generate the score_id
//   const generateScoreIdQuery = 'SELECT NEXTVAL(\'score_id_seq\') AS score_id';

//   // Insert the new entry
//   const insertQuery = 'INSERT INTO test_score (score_id, type, date_time, patient_id, answer) VALUES ($1, $2, $3, $4, $5) RETURNING *';

  // var currentDate = new Date();
  // var day = currentDate.getDate();
  // var month = currentDate.getMonth() + 1; // To start the month from 1
  // var year = currentDate.getFullYear();
  // var hours = currentDate.getHours();
  // var minutes = currentDate.getMinutes();
  // var seconds = currentDate.getSeconds();
  // var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//   try {
//     // Execute the query to generate the score_id
//     const scoreIdResult = await client.query(generateScoreIdQuery);

//     // Extract the generated score_id from the result
//     const generatedScoreId = scoreIdResult.rows[0].score_id;

//     // Insert the new entry with the generated score_id
//     const insertResult = await client.query(insertQuery, [generatedScoreId, type, formattedDate, patientId, answer]);
//     res.status(201).json(insertResult.rows[0]);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: `An error occurred while inserting the new entry: ${error.message}` });
//   }
// });

router.post('/receive_answer_individual_post', async (req, res) => {
  const { type, patientId, answer } = req.body;

  if (!type || !patientId || !answer) {
    return res.status(400).json({ error: 'type, patientId, and answer are required fields.' });
  }

  // const currentDate = new Date();
  // const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // To start the month from 1
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  try {
    // Insert into the test_score table
    const generateScoreIdQuery = 'SELECT NEXTVAL(\'score_id_seq\') AS score_id';
    const insertQuery = 'INSERT INTO test_score (score_id, type, date_time, patient_id, answer) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    const scoreIdResult = await client.query(generateScoreIdQuery);
    const generatedScoreId = scoreIdResult.rows[0].score_id;
    const insertResult = await client.query(insertQuery, [generatedScoreId, type, formattedDate, patientId, answer]);

    // Update the assignment table
    const updateQuery = `
      UPDATE assignment
      SET status = 'DONE'
      WHERE patient_id = $1 AND test_name = $2 AND status = 'WAIT'
    `;

    const updateResult = await client.query(updateQuery, [patientId, type]);

    res.status(201).json({ insertResult: insertResult.rows[0], updateResult: updateResult.rows[0] });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: `An error occurred while processing the request: ${error.message}` });
  }
});

// router.post('/map_answer_individual_test', (req, res) => {
//   const patientId = req.body.patient_id;
//   const testType = JSON.parse(req.body.type); // Parse the testType JSON string

//   let query = `
//     SELECT ts.answer, qn.no, qn.question, qn.options, qn.type
//     FROM test_score ts
//     LEFT JOIN questionnaire_new2 qn ON ts.type = qn.test_name
//     WHERE ts.patient_id = $1 AND ts.status = $2 AND ts.type = $3
//   `;

//   client.query(query, [patientId, testType.type, testType.type])
//     .then(result => {
//       const mappedResults = result.rows.map(row => {
//         const answerData = JSON.parse(row.answer);
//         const answer = answerData[row.no.toString()];

//         return {
//           no: row.no,
//           question: row.question,
//           options: row.options,
//           answer: answer,
//           type: row.type,
//         };
//       });

//       res.json(mappedResults);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/map_answer_individual_test', (req, res) => {
//   const patientId = req.body.patientId;
//   const testType = req.body.type;

//   let query = `
//     SELECT ts.answer, qn.no, qn.question, qn.options, qn.type
//     FROM test_score ts
//     LEFT JOIN questionnaire_new2 qn ON ts.type = qn.test_name AND ts.type = $1
//     WHERE ts.patient_id = $2
//   `;

//   client.query(query, [testType, patientId])
//     .then(result => {
//       const mappedResults = result.rows.map(row => {
//         const answerData = row.answer || {};
//         const answerKeys = Object.keys(answerData);
        
//         // Assuming that options is an array
//         const optionsArray = Array.isArray(row.options) ? row.options : [];
//         const mappedOptions = answerKeys.map(key => {
//           const selectedOption = optionsArray[key - 1] || null; // Adjusting for 0-based index
//           return {
//             no: row.no,
//             question: row.question,
//             options: optionsArray,
//             selectedOption: selectedOption,
//             type: row.type,
//           };
//         });

//         return mappedOptions;
//       });

//       const flattenedResults = [].concat(...mappedResults);

//       res.json(flattenedResults);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/map_answer_individual_test', (req, res) => {
  const patientId = req.body.patientId;
  const testType = req.body.type;

  let query = `
    SELECT ts.answer, qn.no, qn.question, qn.options, qn.type
    FROM test_score ts
    LEFT JOIN questionnaire_new2 qn ON ts.type = qn.test_name AND ts.type = $1
    WHERE ts.patient_id = $2
  `;

  client.query(query, [testType, patientId])
    .then(result => {
      const mappedResults = result.rows.map(row => {
        const answerData = row.answer || {};
        const answerKeys = Object.keys(answerData);
        
        // Assuming that options is an array
        const optionsArray = Array.isArray(row.options) ? row.options : [];
        const mappedOptions = answerKeys.map(key => {
          const selectedOption = optionsArray[key] || null; // Corrected array access
          return {
            no: row.no,
            question: row.question,
            options: selectedOption, // Corrected options mapping
            selectedOption: selectedOption,
            type: row.type,
          };
        });

        return mappedOptions;
      });

      const flattenedResults = [].concat(...mappedResults);

      res.json(flattenedResults);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/get_question_for_map', (req, res) => {
  const type = req.query.test_name; // Get the id parameter from the query
  let query = 'SELECT no, question, options, test_name FROM questionnaire_new2';

  // Check if the id parameter is provided
  if (type) {
    query += ' WHERE test_name = $1';
  }

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

router.post('/get_answer_for_map', (req, res) => {
  const patientId = req.body.patientId;
  const type = req.body.type;
  let query = 'SELECT patient_id, type, answer FROM test_score WHERE';
  const queryParams = [];

  // Check if either patientId or type is provided
  if (patientId) {
    query += ' patient_id = $1';
    queryParams.push(patientId);
  }

  if (type) {
    if (patientId) {
      query += ' AND';
    }
    query += ' type = $2';
    queryParams.push(type);
  }

  client.query(query, queryParams)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// router.post('/get_question_and_answer_for_map', async (req, res) => {
//   const testType = req.body.type;
//   const patientId = req.body.patientId;

//   // Query to fetch questions
//   let questionQuery = 'SELECT no, question, options, test_name FROM questionnaire_new2 WHERE test_name = $1';
//   const questionParams = [testType];

//   try {
//     const questionResult = await client.query(questionQuery, questionParams);
//     const questions = questionResult.rows;

//     // Query to fetch answers
//     let answerQuery = 'SELECT patient_id, type, answer FROM test_score WHERE patient_id = $1 AND type = $2';
//     const answerParams = [patientId, testType];

//     const answerResult = await client.query(answerQuery, answerParams);
//     const answers = answerResult.rows;

//     // Merge questions and answers
//     const mergedResult = questions.map((question, index) => {
//       // Check if answers[index] exists before accessing its properties
//       const answer = answers[index] && answers[index].answer;

//       // Parse the JSON string into an object
//       const parsedAnswer = answer ? JSON.parse(answer) : null;

//       // Check if parsedAnswer is defined and has keys before accessing its properties
//       const answerKey = parsedAnswer ? Object.keys(parsedAnswer)[0] : null;

//       return {
//         no: question.no,
//         question: question.question,
//         options: question.options,
//         answer: answerKey ? parsedAnswer[answerKey] : null,
//         type: question.test_name,
//       };
//     });

//     res.json(mergedResult);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// router.post('/get_question_and_answer_for_map', async (req, res) => {
//   const testType = req.body.type;
//   const patientId = req.body.patientId;

//   // Query to fetch questions
//   let questionQuery = 'SELECT no, question, options, test_name FROM questionnaire_new2 WHERE test_name = $1';
//   const questionParams = [testType];

//   try {
//     const questionResult = await client.query(questionQuery, questionParams);
//     const questions = questionResult.rows;

//     // Query to fetch answers
//     let answerQuery = 'SELECT patient_id, type, answer FROM test_score WHERE';
//     const answerParams = [];

//     // Check if either patientId or type is provided
//     if (patientId) {
//       answerQuery += ' patient_id = $1';
//       answerParams.push(patientId);
//     }

//     if (type) {
//       if (patientId) {
//         answerQuery += ' AND';
//       }
//       answerQuery += ' type = $2';
//       answerParams.push(type);
//     }

//     const answerResult = await client.query(answerQuery, answerParams);
//     const answers = answerResult.rows;

//     // Merge questions and answers
//     const mergedResult = questions.map((question, index) => {
//       // Check if answers[index] exists before accessing its properties
//       const answer = answers[index] && answers[index].answer;

//       // Parse the JSON string into an object
//       const parsedAnswer = answer ? JSON.parse(answer) : null;

//       // Check if parsedAnswer is defined and has keys before accessing its properties
//       const answerKey = parsedAnswer ? Object.keys(parsedAnswer)[0] : null;

//       return {
//         no: question.no,
//         question: question.question,
//         options: question.options,
//         answer: answerKey ? parsedAnswer[answerKey] : null,
//         type: question.test_name,
//       };
//     });

//     res.json(mergedResult);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// router.post('/merge_apis', async (req, res) => {
//   const type = req.body.type;
//   const patientId = req.body.patientId;

//   // Fetch data from the first API
//   const questionQuery = 'SELECT no, question, options, test_name FROM questionnaire_new2 WHERE test_name = $1';
//   const questionResult = await client.query(questionQuery, [type]);

//   // Fetch data from the second API
//   const answerQuery = 'SELECT patient_id, type, answer FROM test_score WHERE patient_id = $1 AND type = $2';
//   const answerResult = await client.query(answerQuery, [patientId, type]);

//   // Merge the results
//   const mergedResults = questionResult.rows.map(questionRow => {
//     const matchingAnswer = answerResult.rows.find(answerRow => answerRow.answer[questionRow.no.toString()] !== undefined);
//     const mergedResult = {
//       no: questionRow.no,
//       question: questionRow.question,
//       options: questionRow.options,
//       answer: matchingAnswer ? matchingAnswer.answer[questionRow.no.toString()] : null,
//       type: type,
//     };
//     return mergedResult;
//   });

//   res.json(mergedResults);
// });

// router.post('/answer_map_question_from_user', async (req, res) => {
//   const type = req.body.type;
//   const patientId = req.body.patient_id;

//   // Fetch data from the first API
//   const questionQuery = 'SELECT no, question, options, test_name FROM questionnaire_new2 WHERE test_name = $1';
//   const questionResult = await client.query(questionQuery, [type]);

//   // Fetch data from the second API
//   const answerQuery = 'SELECT patient_id, type, answer FROM test_score WHERE patient_id = $1 AND type = $2';
//   const answerResult = await client.query(answerQuery, [patientId, type]);

//   // Merge the results
//   const mergedResults = questionResult.rows.map(questionRow => {
//     const matchingAnswer = answerResult.rows.find(answerRow => {
//       const answerData = answerRow.answer; // No need for JSON.parse here
//       return answerData[questionRow.no.toString()] !== undefined;
//     });

//     const mergedResult = {
//       no: questionRow.no,
//       question: questionRow.question,
//       options: questionRow.options,
//       answer: matchingAnswer ? matchingAnswer.answer[questionRow.no.toString()] : null,
//       type: type,
//     };

//     return mergedResult;
//   });

//   res.json(mergedResults);
// });

router.post('/answer_map_question_from_user', async (req, res) => {
  const type = req.body.type;
  const patientId = req.body.patient_id;

  // Fetch data from the first API
  const questionQuery = 'SELECT no, question, options, test_name FROM questionnaire_new2 WHERE test_name = $1';
  const questionResult = await client.query(questionQuery, [type]);

  // Fetch data from the second API
  const answerQuery = 'SELECT patient_id, type, answer FROM test_score WHERE patient_id = $1 AND type = $2';
  const answerResult = await client.query(answerQuery, [patientId, type]);

  // Merge the results
  const mergedResults = questionResult.rows.map(questionRow => {
    const matchingAnswer = answerResult.rows.find(answerRow => {
      const answerData = answerRow.answer; // No need for JSON.parse here
      return answerData[questionRow.no.toString()] !== undefined;
    });

    const mergedResult = {
      no: questionRow.no,
      question: questionRow.question,
      options: questionRow.options,
      answer: matchingAnswer ? matchingAnswer.answer[questionRow.no.toString()] : null,
      type: type,
    };

    return mergedResult;
  });

  // Sort the mergedResults array by the "no" property
  mergedResults.sort((a, b) => a.no - b.no);

  res.json(mergedResults);
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