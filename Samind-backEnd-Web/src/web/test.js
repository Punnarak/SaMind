const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const auth = require('./auth.js').authorization;

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

// router.post('/allTest', (req, res) => {
//     const therapistId = req.body.therapist_id; // Use req.body to get parameters from the request body
//     let query = `
//         SELECT
//             ROW_NUMBER() OVER (ORDER BY questionnaire_new2.test_name) AS no,
//             questionnaire_new2.test_name AS testName
//         FROM (
//             SELECT DISTINCT ON (questionnaire_new2.test_name)
//                 questionnaire_new2.test_name
//             FROM questionnaire_new2
//             LEFT JOIN therapist ON therapist.therapist_id = questionnaire_new2.create_by
//             ${therapistId ? 'WHERE therapist.therapist_id = $1' : ''}
//         ) AS questionnaire_new2
//     `;

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

router.post('/allTest', auth, (req, res) => {
    const therapistId = req.body.therapist_id; // Use req.body to get parameters from the request body
    let query = `
        SELECT
            ROW_NUMBER() OVER (ORDER BY questionnaire_new2.test_name) AS no,
            questionnaire_new2.test_name AS testName
        FROM (
            SELECT DISTINCT ON (questionnaire_new2.test_name)
                questionnaire_new2.test_name
            FROM questionnaire_new2
            LEFT JOIN therapist ON therapist.therapist_id = CAST(questionnaire_new2.create_by AS INTEGER)
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

// router.post('/viewOneQuestion', (req, res) => {
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

router.post('/viewOneQuestion', auth, (req, res) => {
    const type = req.body.type; // Get the type from the JSON body
    const therapistId = req.body.therapistId; // Get the therapistId from the JSON body

    let query = `
        SELECT no, question, options, test_name, description
        FROM questionnaire_new2
        WHERE test_name = $1
        AND create_by = $2
        ORDER BY no
    `;
  
    const queryParams = [type, therapistId];
  
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
  
//       if (!question || !options || !test_name || !no) {
//         return res.status(400).json({ error: 'Each item in the array must have question, options, and type fields.' });
//       }
  
//       const questionnaire_id = uuidv4(); // Generate a new UUID for the question
//       const optionsString = JSON.stringify(options);
  
//       const insertQuery = 'INSERT INTO questionnaire_new2 (questionnaire_id, no, question, options, test_name) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  
//       return client.query(insertQuery, [id, no, question, optionsString, type]);
//     });
// });

// router.post('/questionAdd', async (req, res) => {
//     const requestData = req.body;

//     if (!Array.isArray(requestData)) {
//         return res.status(400).json({ error: 'Request data should be an array of objects.' });
//     }

//     try {
//         // Iterate through each item in the array and insert it into the database with auto-generated IDs
//         const insertQueries = requestData.map(async item => {
//             const { no, question, options, type } = item;

//             if (!question || !options || !type || !no) {
//                 return res.status(400).json({ error: 'Each item in the array must have question, options, type, and no fields.' });
//             }

//             const optionsString = JSON.stringify(options);

//             const insertQuery = 'INSERT INTO questionnaire_new2 (questionnaire_id, no, question, options, test_name) SELECT NEXTVAL(\'questionnaire_id_seq\') AS questionnaire_id, $1, $2, $3, $4 RETURNING *';

//             const result = await client.query(insertQuery, [no, question, optionsString, type]);
//             return result.rows[0]; // Return the inserted row
//         });

//         const insertedRows = await Promise.all(insertQueries);

//         res.status(200).json({ insertedRows });
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'An error occurred while inserting data.' });
//     }
// });

// router.post('/questionAdd', async (req, res) => {
//     const requestData = req.body;
//     const therapistId = requestData.therapist_id || ''; // Extract therapist_id from request data

//     if (!Array.isArray(requestData.questions)) {
//         return res.status(400).json({ error: 'Request data should contain an array of questions.' });
//     }

//     try {
//         // Check if each question in the array has necessary fields
//         for (const item of requestData.questions) {
//             const { no, question, options, type } = item;
//             if (!question || !options || !type || !no) {
//                 console.error('Question:', item);
//                 throw new Error('Each question must have no, question, options, and type fields.');
//             }
//         }

//         // Iterate through each question in the array and insert it into the database with auto-generated IDs
//         const insertedRows = [];
//         for (const item of requestData.questions) {
//             const { no, question, options, type } = item;
//             const optionsString = JSON.stringify(options);
//             const currentDate = new Date().toISOString(); // Get current date in ISO format

//             const insertQuery = `
//                 INSERT INTO questionnaire_new2 
//                     (questionnaire_id, no, question, options, test_name, active_flag, create_by, create_date, update_by, update_date) 
//                 SELECT 
//                     NEXTVAL('questionnaire_id_seq') AS questionnaire_id, 
//                     $1, $2, $3, $4, 
//                     'Y', $5, $6, $5, $6 
//                 RETURNING *
//             `;

//             const result = await client.query(insertQuery, [no, question, optionsString, type, therapistId, currentDate]);
//             insertedRows.push(result.rows[0]);
//         }

//         res.status(200).json({ insertedRows });
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'An error occurred while inserting data.' });
//     }
// });

// router.post('/questionAdd', async (req, res) => {
//     const requestData = req.body;
//     const therapistId = requestData.therapist_id || ''; // Extract therapist_id from request data

//     if (!Array.isArray(requestData.questions)) {
//         return res.status(400).json({ error: 'Request data should contain an array of questions.' });
//     }

//     try {
//         // Check if each question in the array has necessary fields
//         for (const item of requestData.questions) {
//             const { no, question, options, type } = item;
//             if (!question || !options || !type || !no) {
//                 console.error('Question:', item);
//                 throw new Error('Each question must have no, question, options, and type fields.');
//             }
//         }

//         // Get current date in ISO format
//         const currentDate = new Date();
//         currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time

//         // Format the date to match the desired format "YYYY-MM-DD HH:mm:ss"
//         const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//         // Iterate through each question in the array and insert it into the database with auto-generated IDs
//         const insertedRows = [];
//         for (const item of requestData.questions) {
//             const { no, question, options, type } = item;
//             const optionsString = JSON.stringify(options);

//             const insertQuery = `
//                 INSERT INTO questionnaire_new2 
//                     (questionnaire_id, no, question, options, test_name, active_flag, create_by, create_date, update_by, update_date) 
//                 SELECT 
//                     NEXTVAL('questionnaire_id_seq') AS questionnaire_id, 
//                     $1, $2, $3, $4, 
//                     'Y', $5, $6, $5, $6 
//                 RETURNING *
//             `;

//             const result = await client.query(insertQuery, [no, question, optionsString, type, therapistId, formattedDate]);
//             insertedRows.push(result.rows[0]);
//         }

//         res.status(200).json({ insertedRows });
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'An error occurred while inserting data.' });
//     }
// });

router.post('/questionAdd', auth, async (req, res) => {
    const requestData = req.body;
    const therapistId = requestData.therapist_id || ''; // Extract therapist_id from request data
    const description = requestData.description || ''; // Extract description from request data

    if (!Array.isArray(requestData.questions)) {
        return res.status(400).json({ error: 'Request data should contain an array of questions.' });
    }

    try {
        // Check if each question in the array has necessary fields
        for (const item of requestData.questions) {
            const { no, question, options, type } = item;
            if (!question || !options || !type || !no) {
                console.error('Question:', item);
                throw new Error('Each question must have no, question, options, and type fields.');
            }
        }

        // Get current date in ISO format
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time

        // Format the date to match the desired format "YYYY-MM-DD HH:mm:ss"
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        // Iterate through each question in the array and insert it into the database with auto-generated IDs
        const insertedRows = [];
        for (const item of requestData.questions) {
            const { no, question, options, type } = item;
            const optionsString = JSON.stringify(options);

            const insertQuery = `
                INSERT INTO questionnaire_new2 
                    (questionnaire_id, no, question, options, test_name, active_flag, create_by, create_date, update_by, update_date, description) 
                SELECT 
                    NEXTVAL('questionnaire_id_seq') AS questionnaire_id, 
                    $1, $2, $3, $4, 
                    'Y', $5, $6, $5, $6, $7
                RETURNING *
            `;

            const result = await client.query(insertQuery, [no, question, optionsString, type, therapistId, formattedDate, description]);
            insertedRows.push(result.rows[0]);
        }

        res.status(200).json({ insertedRows });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred while inserting data.' });
    }
});


// router.post('/questionUpdate', async (req, res) => {
//     const requestData = req.body;
//     const therapistId = requestData.therapist_id || '';

//     if (!Array.isArray(requestData.questions)) {
//         return res.status(400).json({ error: 'Request data should contain an array of questions.' });
//     }

//     try {
//         const currentDate = new Date();
//         currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time
//         const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//         const insertedRows = [];
//         const updatedRows = [];

//         for (const item of requestData.questions) {
//             const { no, question, options, type } = item;
//             const optionsString = JSON.stringify(options);

//             const selectQuery = `
//                 SELECT * FROM questionnaire_new2 
//                 WHERE test_name = $1
//             `;
//             const selectResult = await client.query(selectQuery, [requestData.oldType]);

//             if (selectResult.rows.length > 0) {
//                 const updateQuery = `
//                     UPDATE questionnaire_new2 
//                     SET no = $1, question = $2, options = $3, test_name = $4, update_by = $5, update_date = $6
//                     WHERE test_name = $7
//                     RETURNING *
//                 `;
//                 const updateResult = await client.query(updateQuery, [no, question, optionsString, type, therapistId, formattedDate, requestData.oldType]);
//                 updatedRows.push(updateResult.rows[0]);
//             } else {
//                 const insertQuery = `
//                     INSERT INTO questionnaire_new2 
//                         (questionnaire_id, no, question, options, test_name, active_flag, create_by, create_date, update_by, update_date) 
//                     SELECT 
//                         NEXTVAL('questionnaire_id_seq') AS questionnaire_id, 
//                         $1, $2, $3, $4, 
//                         'Y', $5, $6, $5, $6 
//                     RETURNING *
//                 `;
//                 const insertResult = await client.query(insertQuery, [no, question, optionsString, type, therapistId, formattedDate]);
//                 insertedRows.push(insertResult.rows[0]);
//             }
//         }

//         res.status(200).json({ insertedRows, updatedRows });
//     } catch (error) {
//         console.error('Error inserting/updating data:', error);
//         res.status(500).json({ error: 'An error occurred while inserting/updating data.' });
//     }
// });

// router.post('/questionUpdate', async (req, res) => {
//     const requestData = req.body;
//     const therapistId = requestData.therapist_id || '';

//     if (!Array.isArray(requestData.questions)) {
//         return res.status(400).json({ error: 'Request data should contain an array of questions.' });
//     }

//     try {
//         const currentDate = new Date();
//         currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time
//         const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//         const updatedRows = [];

//         for (const item of requestData.questions) {
//             const { no, question, options, type } = item;
//             const optionsString = JSON.stringify(options);

//             // Check if there's an existing record with the same test_name and no
//             const selectQuery = `
//                 SELECT * FROM questionnaire_new2 
//                 WHERE test_name = $1 AND no = $2
//             `;
//             const selectResult = await client.query(selectQuery, [requestData.oldType, no]);

//             if (selectResult.rows.length > 0) {
//                 // Update the existing record
//                 const updateQuery = `
//                     UPDATE questionnaire_new2 
//                     SET question = $1, options = $2, test_name = $3, update_by = $4, update_date = $5
//                     WHERE test_name = $6 AND no = $7
//                     RETURNING *
//                 `;
//                 const updateResult = await client.query(updateQuery, [question, optionsString, type, therapistId, formattedDate, requestData.oldType, no]);
//                 updatedRows.push(updateResult.rows[0]);
//             } 
//         }

//         res.status(200).json({ updatedRows });
//     } catch (error) {
//         console.error('Error updating data:', error);
//         res.status(500).json({ error: 'An error occurred while updating data.' });
//     }
// });

router.post('/questionUpdate', auth, async (req, res) => {
    const requestData = req.body;
    const therapistId = requestData.therapist_id || '';
    const description = requestData.description || '';

    if (!Array.isArray(requestData.questions)) {
        return res.status(400).json({ error: 'Request data should contain an array of questions.' });
    }

    try {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 7); // Adding 7 hours to the current time
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        const updatedRows = [];

        // Update description if provided
        if (description) {
            const updateDescriptionQuery = `
                UPDATE questionnaire_new2 
                SET description = $1, update_by = $2, update_date = $3
                WHERE test_name = $4
                RETURNING *
            `;
            const updateDescriptionResult = await client.query(updateDescriptionQuery, [description, therapistId, formattedDate, requestData.oldType]);
            updatedRows.push(updateDescriptionResult.rows[0]);
        }

        for (const item of requestData.questions) {
            const { no, question, options, type } = item;
            const optionsString = JSON.stringify(options);

            // Check if there's an existing record with the same test_name and no
            const selectQuery = `
                SELECT * FROM questionnaire_new2 
                WHERE test_name = $1 AND no = $2
            `;
            const selectResult = await client.query(selectQuery, [requestData.oldType, no]);

            if (selectResult.rows.length > 0) {
                // Update the existing record
                const updateQuery = `
                    UPDATE questionnaire_new2 
                    SET question = $1, options = $2, test_name = $3, update_by = $4, update_date = $5
                    WHERE test_name = $6 AND no = $7
                    RETURNING *
                `;
                const updateResult = await client.query(updateQuery, [question, optionsString, type, therapistId, formattedDate, requestData.oldType, no]);
                updatedRows.push(updateResult.rows[0]);
            } 
        }

        res.status(200).json({ updatedRows });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'An error occurred while updating data.' });
    }
});

router.delete('/questionsDel', auth, (req, res) => {
    const type = req.body.type; // Get the type from the request body
    const therapistId = req.body.therapistId; // Get the therapist_id from the request body
  
    if (!type || !therapistId) {
      return res.status(400).json({ error: 'Type and therapist_id parameters are required.' });
    }
  
    // Check if therapist_id matches create_by column
    const checkQuery = 'SELECT COUNT(*) AS count FROM questionnaire_new2 WHERE test_name = $1 AND create_by = $2';
    client.query(checkQuery, [type, therapistId])
      .then(result => {
        const count = result.rows[0].count;
        if (count === 0) {
          return res.status(404).json({ error: 'No matching records found.' });
        }
  
        const deleteQuery = 'DELETE FROM questionnaire_new2 WHERE test_name = $1';
        client.query(deleteQuery, [type])
          .then(result => {
            const deletedRowCount = result.rowCount;
            res.json({ message: `Deleted ${deletedRowCount} questions with type ${type}.` });
          })
          .catch(err => {
            console.error('Error executing delete query:', err);
            res.status(500).json({ error: 'An error occurred during delete operation.' });
          });
      })
      .catch(err => {
        console.error('Error executing check query:', err);
        res.status(500).json({ error: 'An error occurred while checking records.' });
      });
  });
  
// router.post('/therapistSendTest', (req, res) => {
//     const therapistId = req.body.therapistId;
//     const testName = req.body.testName;
//     const patientIds = req.body.patientId;
//     const createBy = therapistId;
//     const createDate = new Date();
//     const updateBy = therapistId;
//     const updateDate = new Date(createDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days

//     // Prepare an array to store promises for each patient insertion
//     const insertionPromises = [];

//     // Iterate through each patient ID and create a promise for each insertion
//     patientIds.forEach(patientId => {
//         const query = `
//             INSERT INTO public.assignment (
//                 assign_id, 
//                 patient_id, 
//                 test_name, 
//                 status, 
//                 active_flag, 
//                 create_by, 
//                 create_date, 
//                 update_by, 
//                 update_date
//             ) VALUES (
//                 NEXTVAL('assign_id_seq'), 
//                 $1, 
//                 $2, 
//                 'WAIT', 
//                 'Y', 
//                 $3, 
//                 $4, 
//                 $5, 
//                 $6
//             )
//         `;

//         const values = [patientId, testName, createBy, createDate, updateBy, updateDate];

//         const insertionPromise = client.query(query, values);
//         insertionPromises.push(insertionPromise);
//     });

//     // Execute all insertion promises
//     Promise.all(insertionPromises)
//         .then(() => {
//             res.json({ message: 'Data inserted successfully' });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// router.post('/therapistSendTest', (req, res) => {
//     const therapistId = req.body.therapistId;
//     const testName = req.body.testName;
//     const patientIds = req.body.patientId;
//     const createBy = therapistId;
//     const createDate = new Date();
//     // Remove milliseconds from the createDate
//     createDate.setMilliseconds(0);
//     const updateBy = therapistId;
//     const updateDate = new Date(createDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days
//     // Remove milliseconds from the updateDate
//     updateDate.setMilliseconds(0);

//     // Prepare an array to store promises for each patient insertion
//     const insertionPromises = [];

//     // Iterate through each patient ID and create a promise for each insertion
//     patientIds.forEach(patientId => {
//         const query = `
//             INSERT INTO public.assignment (
//                 assign_id, 
//                 patient_id, 
//                 test_name, 
//                 status, 
//                 active_flag, 
//                 create_by, 
//                 create_date, 
//                 update_by, 
//                 update_date
//             ) VALUES (
//                 NEXTVAL('assign_id_seq'), 
//                 $1, 
//                 $2, 
//                 'WAIT', 
//                 'Y', 
//                 $3, 
//                 $4, 
//                 $5, 
//                 $6
//             )
//         `;

//         const values = [patientId, testName, createBy, createDate, updateBy, updateDate];

//         const insertionPromise = client.query(query, values);
//         insertionPromises.push(insertionPromise);
//     });

//     // Execute all insertion promises
//     Promise.all(insertionPromises)
//         .then(() => {
//             res.json({ message: 'Data inserted successfully' });
//         })
//         .catch(err => {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.post('/therapistSendTest', auth, (req, res) => {
    const therapistId = req.body.therapistId;
    const testName = req.body.testName;
    const patientIds = req.body.patientId;
    const detail = req.body.detail; // Adding detail from request body
    const dueDate = req.body.dueDate; // Adding dueDate from request body

    // Parse dueDate string to a valid Date object
    const dueDateParts = dueDate.split('/');
    const dueDateFormatted = new Date(`${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`);

    const createBy = therapistId;
    const createDate = new Date();
    // Remove milliseconds from the createDate
    createDate.setMilliseconds(0);
    const updateBy = therapistId;
    const updateDate = new Date(createDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days
    // Remove milliseconds from the updateDate
    updateDate.setMilliseconds(0);

    // Prepare an array to store promises for each patient insertion
    const insertionPromises = [];

    // Iterate through each patient ID and create a promise for each insertion
    patientIds.forEach(patientId => {
        const query = `
            INSERT INTO public.assignment (
                assign_id, 
                patient_id, 
                test_name, 
                status, 
                active_flag, 
                create_by, 
                create_date, 
                update_by, 
                update_date,
                detail, -- Adding detail column
                turn_in_before -- Adding turn_in_before column
            ) VALUES (
                NEXTVAL('assign_id_seq'), 
                $1, 
                $2, 
                'WAIT', 
                'Y', 
                $3, 
                $4, 
                $5, 
                $6,
                $7, -- Placeholder for detail
                $8  -- Placeholder for dueDate
            )
        `;

        const values = [patientId, testName, createBy, createDate, updateBy, updateDate, detail, dueDateFormatted]; // Adding detail and dueDate to values

        const insertionPromise = client.query(query, values);
        insertionPromises.push(insertionPromise);
    });

    // Execute all insertion promises
    Promise.all(insertionPromises)
        .then(() => {
            res.json({ message: 'Data inserted successfully' });
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;