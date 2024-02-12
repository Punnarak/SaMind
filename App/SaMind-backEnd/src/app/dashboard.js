const client = require('./connection.js');
const express = require('express');
const router = express.Router();
const auth = require('./auth.js').authorization;


// router.post('/mood_tracker_post', async (req, res) => {
//   const { mood_tracker_id, patient_id, score } = req.body;

//   if (!mood_tracker_id || !patient_id || !score) {
//     return res.status(400).json({ error: 'Both mood_tracker_id, patient_id, score are required fields.' });
//   }

//   // Check the number of entries for the patient
//   const countQuery = 'SELECT COUNT(*) FROM mood_tracker WHERE patient_id = $1';
//   const countResult = await client.query(countQuery, [patient_id]);

//   const entryCount = parseInt(countResult.rows[0].count, 10);

//   // If the patient already has 7 entries, delete the oldest one
//   if (entryCount >= 7) {
//     const deleteQuery = `
//       DELETE FROM mood_tracker
//       WHERE ctid IN (
//         SELECT ctid
//         FROM mood_tracker
//         WHERE patient_id = $1
//         ORDER BY date_time ASC
//         LIMIT 1
//       )
//       RETURNING *
//     `;
  
//     try {
//       const deleteResult = await client.query(deleteQuery, [patient_id]);
//       console.log('Deleted oldest entry:', deleteResult.rows[0]);
//     } catch (deleteErr) {
//       console.error('Error deleting oldest entry:', deleteErr);
//       return res.status(500).json({ error: 'An error occurred while deleting the oldest entry' });
//     }
//   }

//   // Insert the new entry
//   const insertQuery = 'INSERT INTO mood_tracker (id, patient_id, score, date_time) VALUES ($1, $2, $3, $4) RETURNING *';

//   var currentDate = new Date();

//   var day = currentDate.getDate();
//   var month = currentDate.getMonth() + 1; // เพื่อให้เดือนเริ่มต้นที่ 1
//   var year = currentDate.getFullYear();
//   var hours = currentDate.getHours();
//   var minutes = currentDate.getMinutes();
//   var seconds = currentDate.getSeconds();

//   var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//   try {
//     const insertResult = await client.query(insertQuery, [id, patient_id, score, formattedDate]);
//     res.status(201).json(insertResult.rows[0]);
//   } catch (insertErr) {
//     console.error('Error executing query:', insertErr);
//     res.status(500).json({ error: 'An error occurred while inserting the new entry' });
//   }
// });

router.post('/mood_tracker_post', async (req, res) => {
  const { patient_id, score } = req.body;

  if (!patient_id || !score) {
    return res.status(400).json({ error: 'Both patient_id and score are required fields.' });
  }

  // Check the number of entries for the patient
  const countQuery = 'SELECT COUNT(*) FROM mood_tracker WHERE patient_id = $1';
  const countResult = await client.query(countQuery, [patient_id]);

  const entryCount = parseInt(countResult.rows[0].count, 10);

  // If the patient already has 7 entries, delete the oldest one
  if (entryCount >= 7) {
    const deleteQuery = `
      DELETE FROM mood_tracker
      WHERE ctid IN (
        SELECT ctid
        FROM mood_tracker
        WHERE patient_id = $1
        ORDER BY date_time ASC
        LIMIT 1
      )
      RETURNING *
    `;
  
    try {
      const deleteResult = await client.query(deleteQuery, [patient_id]);
      console.log('Deleted oldest entry:', deleteResult.rows[0]);
    } catch (deleteErr) {
      console.error('Error deleting oldest entry:', deleteErr);
      return res.status(500).json({ error: 'An error occurred while deleting the oldest entry' });
    }
  }

  // Format the date in the desired format
  var currentDate = new Date();

  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // เพื่อให้เดือนเริ่มต้นที่ 1
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  // Insert the new entry
  const insertQuery = 'INSERT INTO mood_tracker (mood_tracker_id, patient_id, score, date_time) VALUES (nextval(\'mood_tracker_id_seq\'), $1, $2, $3::timestamp) RETURNING *';

  try {
    const insertResult = await client.query(insertQuery, [patient_id, score, formattedDate]);
    res.status(201).json(insertResult.rows[0]);
  } catch (insertErr) {
    console.error('Error executing query:', insertErr);
    res.status(500).json({ error: 'An error occurred while inserting the new entry' });
  }
});

// router.post('/get_name_user', (req, res) => {
//   const id = req.query.id; // Get the id parameter from the query
//   let query = 'SELECT * FROM patient';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE patient_id = $1';
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


//latest change 17/12/2566
// router.post('/get_name_user', (req, res) => {
//   const requestBody = req.body;
//   const idFromBody = requestBody.patient_id;

//   // Check if the patient_id is provided in the JSON body
//   if (!idFromBody) {
//     return res.status(400).json({ error: 'patient_id is required in the request body' });
//   }

//   const query = 'SELECT fname FROM patient WHERE patient_id = $1';
//   const queryParams = [idFromBody];

//   client.query(query, queryParams)
//     .then(result => {
//       // Check if there are any rows in the result
//       if (result.rows.length > 0) {
//         // Modify the key from "fname" to "name"
//         const modifiedResult = { name: result.rows[0].fname };
//         res.json(modifiedResult);
//       } else {
//         // If no rows found, return an empty object or any desired response
//         res.json({});
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

//function getNameUser
async function getNameUser(patientId) {
  const query = 'SELECT fname FROM patient WHERE patient_id = $1';
  const queryParams = [patientId];

  try {
    const result = await client.query(query, queryParams);

    if (result.rows.length > 0) {
      return { name: result.rows[0].fname };
    } else {
      return {};
    }
  } catch (err) {
    console.error('Error executing query:', err);
    return { error: 'An error occurred while fetching user name.' };
  }
}


//least fix 17/12/2023
// router.post('/average_scores', async (req, res) => {
//   const { patient_id } = req.body;

//   // Check if patient_id is provided in the request body
//   if (!patient_id) {
//     return res.status(400).json({ error: 'Patient ID is required in the request body.' });
//   }

//   const avgScoreQuery = `
//     SELECT AVG(score)::numeric(10, 2) AS average_score
//     FROM mood_tracker
//     WHERE patient_id = $1
//       AND date_time >= CURRENT_DATE - INTERVAL '6 days'
//       AND date_time < CURRENT_DATE + INTERVAL '1 day';
//   `;

//   try {
//     const result = await client.query(avgScoreQuery, [patient_id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Patient not found or has no mood tracker entries.' });
//     }

//     const average_score = result.rows[0].average_score;

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - 6);

//     const endDate = new Date();

//     const formattedStartDate = `${startDate.getDate()} ${getMonthName(startDate.getMonth())} ${startDate.getFullYear()}`;
//     const formattedEndDate = `${endDate.getDate()} ${getMonthName(endDate.getMonth())} ${endDate.getFullYear()}`;

//     const dateBetween = `${formattedStartDate} - ${formattedEndDate}`;

//     res.status(200).json({ average_score, dateBetween });
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred while fetching average scores' });
//   }
// });

//function getAverageScores
// async function getAverageScores(patientId) {
//   const avgScoreQuery = `
//     SELECT AVG(score)::numeric(10, 2) AS average_score
//     FROM mood_tracker
//     WHERE patient_id = $1
//       AND date_time >= CURRENT_DATE - INTERVAL '6 days'
//       AND date_time < CURRENT_DATE + INTERVAL '1 day';
//   `;

//   try {
//     const result = await client.query(avgScoreQuery, [patientId]);

//     if (result.rows.length === 0 || result.rows[0].average_score === null || result.rows[0].average_score === undefined) {
//       return { error: 'Patient not found or has no mood tracker entries.' };
//     }

//     const average_score = Number(result.rows[0].average_score); // Ensure it's a number

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - 6);

//     const endDate = new Date();

//     const formattedStartDate = `${startDate.getDate()} ${getMonthName(startDate.getMonth())} ${startDate.getFullYear()}`;
//     const formattedEndDate = `${endDate.getDate()} ${getMonthName(endDate.getMonth())} ${endDate.getFullYear()}`;

//     const dateBetween = `${formattedStartDate} - ${formattedEndDate}`;

//     return {
//       avgMood: average_score.toFixed(2),
//       dateBetween,
//     };
//   } catch (err) {
//     console.error('Error executing query:', err);
//     return { error: 'An error occurred while fetching average scores' };
//   }
// }

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

    const formattedStartDate = `${startDate.getDate()} ${getMonthName(startDate.getMonth())} ${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()} ${getMonthName(endDate.getMonth())} ${endDate.getFullYear()}`;

    const dateBetween = `${formattedStartDate} - ${formattedEndDate}`;

    return { avgMood: average_score, dateBetween };
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

function getMonthName(month) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month];
}


// function getMonthName(month) {
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   return months[month];
// }

//least fix 17/12/2023
// router.post('/two_latest_question', (req, res) => {
//   const id = req.query.patient_id; // Get the id parameter from the query
//   let query = 'SELECT score, type, date_time FROM test_score'; // Include the date_time column in the query

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE patient_id = $1';
//   }

//   // Move the condition to check if the "answer" column is null inside the WHERE clause
//   if (id) {
//     query += ' AND (answer IS NULL)';
//   } else {
//     query += ' WHERE (answer IS NULL)';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "date_time" column in descending order
//   query += ' ORDER BY date_time DESC';

//   // Add a "LIMIT" clause to get only the top 2 rows
//   query += ' LIMIT 2';

//   const queryParams = id ? [id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       const modifiedResult = {};

//       result.rows.forEach((row, index) => {
//         const { type, date_time } = row;
//         let resultText = '';

//         // Check the condition based on the "type"
//         if (type === 'PHQ9') {
//           const resultValue = parseInt(row.score, 10);
//           if (resultValue < 7) {
//             resultText = 'ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก';
//           } else if (resultValue >= 7 && resultValue <= 12) {
//             resultText = 'ท่านมีอาการซึมเศร้าในระดับน้อย';
//           } else if (resultValue >= 13 && resultValue <= 18) {
//             resultText = 'ท่านมีอาการซึมเศร้าในระดับปานกลาง';
//           } else if (resultValue >= 19) {
//             resultText = 'ท่านมีอาการซึมเศร้าในระดับรุนแรง';
//           }
//         } else if (type === '2Q') {
//           const resultValue = parseInt(row.score, 10);
//           if (resultValue != 0) {
//             resultText = 'ท่านมีแนวโน้มเป็นโรคซึมเศร้า';
//           } else {
//             resultText = 'ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า';
//           }
//         }

//         // Use the getMonthName function to format the date
//         const formattedDate = `${date_time.getDate()} ${getMonthName(date_time.getMonth())} ${date_time.getFullYear()}`;

//         // Add date to the modified result
//         modifiedResult[`type${index + 1}`] = type;
//         modifiedResult[`result${index + 1}`] = resultText;
//         modifiedResult[`date${index + 1}`] = formattedDate;
//       });

//       res.json({ historyTest: modifiedResult });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });


//function getHistoryTest
async function getHistoryTest(patientId) {
  const query = `
    SELECT score, type, date_time
    FROM test_score
    WHERE answer IS NULL
    ORDER BY date_time DESC
    LIMIT 2
  `;
  const queryParams = [];

  try {
    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      return { error: 'No history test data found.' };
    }

    const modifiedResult = {
      historyTest: {},
    };

    result.rows.forEach((row, index) => {
      const { type, date_time } = row;
      let resultText = '';

      if (type === 'PHQ9') {
        const resultValue = parseInt(row.score, 10);
        if (resultValue < 7) {
          resultText = 'ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก';
        } else if (resultValue >= 7 && resultValue <= 12) {
          resultText = 'ท่านมีอาการซึมเศร้าในระดับน้อย';
        } else if (resultValue >= 13 && resultValue <= 18) {
          resultText = 'ท่านมีอาการซึมเศร้าในระดับปานกลาง';
        } else if (resultValue >= 19) {
          resultText = 'ท่านมีอาการซึมเศร้าในระดับรุนแรง';
        }
      } else if (type === '2Q') {
        const resultValue = parseInt(row.score, 10);
        resultText = resultValue !== 0 ? 'ท่านมีแนวโน้มเป็นโรคซึมเศร้า' : 'ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า';
      }

      const formattedDate = `${date_time.getDate()} ${getMonthName(date_time.getMonth())} ${date_time.getFullYear()}`;

      modifiedResult.historyTest[`type${index + 1}`] = type;
      modifiedResult.historyTest[`result${index + 1}`] = resultText;
      modifiedResult.historyTest[`date${index + 1}`] = formattedDate;
    });

    // Include dateAvatar information
    if (result.rows.length > 0) {
      const dateAvatar = result.rows[0].date_time;
      modifiedResult.dateAvatar = `${dateAvatar.getDate()} ${getMonthName(dateAvatar.getMonth())} ${dateAvatar.getFullYear()} at ${dateAvatar.getHours()}:${dateAvatar.getMinutes()}:${dateAvatar.getSeconds()}`;
    }

    return modifiedResult;
  } catch (err) {
    console.error('Error executing query:', err);
    return { error: 'An error occurred while fetching history test data.' };
  }
}


//least fix 12/17/2023
// router.post('/dash_mood_detection', (req, res) => {
//   const patientId = req.body.patient_id; // Get the patient_id from the JSON body
//   let query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection';

//   // Check if the patient_id is provided in the JSON body
//   if (patientId !== undefined) {
//     query += ' WHERE patient_id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "mood_detection_id" column
//   query += ' ORDER BY mood_detection_id';

//   const queryParams = patientId !== undefined ? [patientId] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       // Transform the response format
//       const transformedResult = result.rows.map(row => ({
//         date: formatDate(row.date),
//         avatarMoodDetec: {
//           positive: row.positive,
//           negative: row.negative,
//           neutral: row.neutral
//         }
//       }))[0]; // Get the first item in the array

//       res.json(transformedResult);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

//function getMood
async function getAvatarMoodDetection(patientId) {
  const query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection';
  const queryParams = patientId !== undefined ? [patientId] : [];;

  try {
    // const result = await client.query(query, queryParams);
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return { error: 'No avatar mood detection data found.' };
    }

    const transformedResult = result.rows.map(row => ({
      date: formatDate(row.date),
      avatarMoodDetec: {
        positive: row.positive,
        negative: row.negative,
        neutral: row.neutral
      }
    }))[0];

    return transformedResult;
  } catch (err) {
    console.error('Error executing query:', err);
    return { error: 'An error occurred while fetching avatar mood detection data.' };
  }
}


// Function to format date as "2 December 2023 at 23:37:57"
function formatDate(timestamp) {
  const dateObj = new Date(timestamp);
  const day = dateObj.getDate();
  const month = getMonthName(dateObj.getMonth());
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  return `${day} ${month} ${year} at ${hours}:${minutes}:${seconds}`;
}


//merge api
// router.post('/dashboard_api', async (req, res) => {
//   const { patient_id } = req.body;

//   // Check if patient_id is provided in the request body
//   if (!patient_id) {
//     return res.status(400).json({ error: 'Patient ID is required in the request body.' });
//   }

//   try {
//     // API 1: Get average score
//     const avgScoreQuery = `
//       SELECT patient_id, AVG(score)::numeric(10, 2) AS average_score
//       FROM mood_tracker
//       WHERE patient_id = $1
//       GROUP BY patient_id;
//     `;

//     const avgScoreResult = await client.query(avgScoreQuery, [patient_id]);

//     let avgMood = null; // Default value for avgMood

//     if (avgScoreResult.rows.length > 0) {
//       // If there's a mood tracker entry, calculate and set avgMood
//       const { average_score } = avgScoreResult.rows[0];
//       avgMood = avgMood = average_score;
//     }

//     // API 2: Get two latest questions
//     const twoLatestQuery = `
//       SELECT score, type FROM test_score
//       WHERE patient_id = $1 AND (answer IS NULL)
//       ORDER BY date_time DESC
//       LIMIT 2;
//     `;
//     const twoLatestResult = await client.query(twoLatestQuery, [patient_id]);

//     const historyTest = {};
//     twoLatestResult.rows.forEach((row, index) => {
//       const { type, score } = row;
//       let resultText = '';

//       if (type === 'PHQ9') {
//         const resultValue = parseInt(score, 10);
//         if (resultValue < 7) {
//           resultText = 'ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก';
//         } else if (resultValue >= 7 && resultValue <= 12) {
//           resultText = 'ท่านมีอาการซึมเศร้าในระดับน้อย';
//         } else if (resultValue >= 13 && resultValue <= 18) {
//           resultText = 'ท่านมีอาการซึมเศร้าในระดับปานกลาง';
//         } else if (resultValue >= 19) {
//           resultText = 'ท่านมีอาการซึมเศร้าในระดับรุนแรง';
//         }
//       } else if (type === '2Q') {
//         const resultValue = parseInt(score, 10);
//         resultText = resultValue !== 0 ? 'ท่านมีแนวโน้มเป็นโรคซึมเศร้า' : 'ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า';
//       }

//       historyTest[`type${index + 1}`] = type;
//       historyTest[`result${index + 1}`] = resultText;
//     });

//     // API 3: Get mood detection
//     const moodDetectionQuery = `
//       SELECT * FROM avatar_mood_detection
//       WHERE patient_id = $1
//       ORDER BY mood_detection_id;
//     `;
//     const moodDetectionResult = await client.query(moodDetectionQuery, [patient_id]);

//     if (moodDetectionResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Patient not found or has no mood detection entries.' });
//     }

//     const avatarMoodDetec = {
//       positive: moodDetectionResult.rows[0].positive,
//       negative: moodDetectionResult.rows[0].negative,
//       neutral: moodDetectionResult.rows[0].neutral
//     };

//     // Combine results into the desired format
//     const combinedResult = {
//       avgMood,
//       historyTest,
//       avatarMoodDetec
//     };

//     res.status(200).json(combinedResult);

//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred while fetching data.' });
//   }
// });

// router.post('/dashboard_api', async (req, res) => {
//   const { patient_id } = req.body;

//   try {
//     // Call the three APIs sequentially
//     const avgMoodResult = await getAverageScores(patient_id);
//     const historyTestResult = await getHistoryTest(patient_id);
//     const avatarMoodDetectionResult = await getAvatarMoodDetection(patient_id);

//     // Combine the results into the desired format
//     const mergedResult = {
//       avgMood: avgMoodResult.avgMood,
//       dateBetween: avgMoodResult.dateBetween,
//       historyTest: historyTestResult.historyTest,
//       dateAvatar: avatarMoodDetectionResult.date,
//       avatarMoodDetec: avatarMoodDetectionResult.avatarMoodDetec,
//     };

//     res.json(mergedResult);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred while fetching data.' });
//   }
// });

//main api
router.post('/dashboard_api'/*, auth*/, async (req, res) => {
  const { patient_id } = req.body;

  try {
    // Call the two APIs sequentially
    const nameResult = await getNameUser(patient_id);
    const avgMoodResult = await getAverageScores(patient_id);
    const historyTestResult = await getHistoryTest(patient_id);
    const avatarMoodDetectionResult = await getAvatarMoodDetection(patient_id);

    // Combine the results into the desired format
    const mergedResult = {
      name: nameResult.name,
      avgMood: avgMoodResult.avgMood,
      dateBetween: avgMoodResult.dateBetween,
      historyTest: historyTestResult.historyTest,
      dateAvatar: avatarMoodDetectionResult.date,
      avatarMoodDetec: avatarMoodDetectionResult.avatarMoodDetec,
    };

    res.json(mergedResult);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// router.post('/dashboard_api', async (req, res) => {
//   const { patient_id } = req.body;

//   try {
//     // Call the two APIs sequentially
//     const nameResult = await getNameUser(patient_id);
//     console.log('nameResult:', nameResult);

//     const avgMoodResult = await getAverageScores(patient_id);
//     console.log('avgMoodResult:', avgMoodResult);

//     const historyTestResult = await getHistoryTest(patient_id);
//     console.log('historyTestResult:', historyTestResult);

//     const avatarMoodDetectionResult = await getAvatarMoodDetection(patient_id);
//     console.log('avatarMoodDetectionResult:', avatarMoodDetectionResult);

//     // Combine the results into the desired format
//     const mergedResult = {
//       name: nameResult.name,
//       avgMood: avgMoodResult.avgMood,
//       dateBetween: avgMoodResult.dateBetween,
//       historyTest: historyTestResult.historyTest,
//       dateAvatar: avatarMoodDetectionResult.date,
//       avatarMoodDetec: avatarMoodDetectionResult.avatarMoodDetec,
//     };

//     res.json(mergedResult);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred while fetching data.' });
//   }
// });




// router.get('/check_mood_per_day_get', (req, res) => {
//   const id = req.query.patient_id; // Get the id parameter from the query

//   // Get the current date and time
//   const currentDate = new Date();
//   const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//   // Build the SQL query
//   let query = 'SELECT * FROM mood_tracker';
//   const queryParams = [];

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE patient_id = $1';
//     queryParams.push(id);
//   }

//   // Add a condition to check if the date_time column matches the current date
//   query += ' AND date_time::date = $2';
//   queryParams.push(formattedDate.slice(0, 10));

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY patient_id';

//   // Execute the query
//   client.query(query, queryParams)
//     .then(result => {
//       // Check if there are rows in the result
//       const hasRows = result.rows.length > 0;

//       // Return true or false based on whether there are rows
//       res.json(hasRows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });


// router.post('/get_name_user', (req, res) => {
//   const requestBody = req.body;
//   const idFromBody = requestBody.patient_id;

//   // Check if the patient_id is provided in the JSON body
//   if (!idFromBody) {
//     return res.status(400).json({ error: 'patient_id is required in the request body' });
//   }

//   const query = 'SELECT fname FROM patient WHERE patient_id = $1';
//   const queryParams = [idFromBody];

//   client.query(query, queryParams)
//     .then(result => {
//       // Check if there are any rows in the result
//       if (result.rows.length > 0) {
//         // Modify the key from "fname" to "name"
//         const modifiedResult = { name: result.rows[0].fname };
//         res.json(modifiedResult);
//       } else {
//         // If no rows found, return an empty object or any desired response
//         res.json({});
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/check_mood_per_day_get', (req, res) => {
//   const id = req.body.patient_id; // Get the patient_id from the request body

//   // Get the current date and time
//   const currentDate = new Date();
//   const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//   // Build the SQL query with a left join on the patient table
//   let query = 'SELECT mood_tracker.*, patient.fname FROM mood_tracker';
//   query += ' LEFT JOIN patient ON mood_tracker.patient_id = patient.patient_id';

//   const queryParams = [];

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE mood_tracker.patient_id = $1::integer'; // Explicitly cast to integer
//     queryParams.push(id);
//   }

//   // Add a condition to check if the date_time column matches the current date
//   query += ' AND mood_tracker.date_time::date = $2';
//   queryParams.push(formattedDate.slice(0, 10));

//   // Add an "ORDER BY" clause to sort the result by the mood_tracker id column
//   query += ' ORDER BY mood_tracker_id';

//   // Execute the query
//   client.query(query, queryParams)
//     .then(result => {
//       // Check if there are rows in the result
//       const hasRows = result.rows.length > 0;

//       // Construct the response object
//       const responseObject = {
//         fname: hasRows ? result.rows[0].fname : null,
//         checkin: hasRows,
//         moodscore: hasRows ? result.rows[0].score : null,
//       };

//       // Return the JSON object
//       res.json(responseObject);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/check_mood_per_day_get', (req, res) => {
  const id = req.body.patient_id;

  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  // Build the SQL query with a left join on the patient table
  let query = 'SELECT mood_tracker.*, patient.fname FROM mood_tracker';
  query += ' LEFT JOIN patient ON mood_tracker.patient_id = patient.patient_id';

  const queryParams = [];

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE mood_tracker.patient_id = $1::integer'; // Explicitly cast to integer
    queryParams.push(id);
  }

  // Add a condition to check if the date_time column matches the current date
  query += ' AND mood_tracker.date_time::date = $2';
  queryParams.push(formattedDate.slice(0, 10));

  // Add an "ORDER BY" clause to sort the result by the mood_tracker id column
  query += ' ORDER BY mood_tracker_id';

  // Execute the query to get the mood data
  client.query(query, queryParams)
    .then(moodResult => {
      // Check if there are rows in the mood result
      const hasMoodRows = moodResult.rows.length > 0;

      let responseObject = {
        fname: hasMoodRows ? moodResult.rows[0].fname : null,
        checkin: hasMoodRows,
        moodscore: hasMoodRows ? moodResult.rows[0].score : null,
      };

      // If patient_id is provided, fetch the name directly within the API
      if (id) {
        const nameQuery = 'SELECT fname FROM patient WHERE patient_id = $1';
        const nameQueryParams = [id];

        client.query(nameQuery, nameQueryParams)
          .then(nameResult => {
            // If the name is found, update the responseObject
            if (nameResult.rows.length > 0) {
              responseObject.fname = nameResult.rows[0].fname; // Update key to "fname"
            }
            // Return the JSON object
            res.json(responseObject);
          })
          .catch(err => {
            console.error('Error executing name query:', err);
            res.json(responseObject); // Return the mood data even if there's an error fetching the name
          });
      } else {
        // Return the JSON object without fetching the name
        res.json(responseObject);
      }
    })
    .catch(err => {
      console.error('Error executing mood query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});



// router.get('/assignmentInfo_get', (req, res) => {
//   const id = req.query.assign_id; // Get the id parameter from the query
//   let type;

//   let query = 'SELECT * FROM assignment';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE assign_id = $1';
//   }

//   if(type=="daily"){
//     query += 'AND create_date = $2'
//   }
//   if(type=="weekly"){
//     query += 'AND create_date = $3'
//   }
//   if(type=="monthly"){
//     query += 'AND create_date = $4'
//   }
//   if(type=="yearly"){
//     query += 'AND create_date = $5'
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY assign_id';

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

// router.get('/assignmentInfo_get', (req, res) => {
//   const id = req.query.assign_id;
//   const type = req.body.type; // Assuming the type is in the request body

//   let query = 'SELECT * FROM assignment';

//   if (id) {
//     query += ' WHERE assign_id = $1';
//   } else {
//     query += ' WHERE 1=1'; // Add a placeholder WHERE condition if id is not present
//   }

//   if (type === "daily") {
//     query += ' AND create_date::date = CURRENT_DATE';
//   } else if (type === "weekly") {
//     query += ' AND create_date::date >= CURRENT_DATE - interval \'6 days\' AND create_date::date <= CURRENT_DATE';
//   } else if (type === "monthly") {
//     query += ' AND create_date >= date_trunc(\'month\', CURRENT_DATE) AND create_date < date_trunc(\'month\', CURRENT_DATE + interval \'1 month\')';
//   } else if (type === "yearly") {
//     query += ' AND create_date >= date_trunc(\'year\', CURRENT_DATE) AND create_date < date_trunc(\'year\', CURRENT_DATE + interval \'1 year\')';
//   }

//   query += ' ORDER BY assign_id';

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

// router.get('/assignmentInfo_get', (req, res) => {
//   const id = req.query.assign_id;
//   const type = req.body.type; // Assuming the type is in the request body

//   let query = 'SELECT * FROM assignment';

//   if (id) {
//     query += ' WHERE assign_id = $1';
//   } else {
//     query += ' WHERE 1=1'; // Add a placeholder WHERE condition if id is not present
//   }

//   if (type === "daily") {
//     query += ' AND create_date::date = CURRENT_DATE';
//   } else if (type === "weekly") {
//     query += ' AND create_date::date >= CURRENT_DATE - interval \'6 days\' AND create_date::date <= CURRENT_DATE';
//   } else if (type === "monthly") {
//     query += ' AND create_date >= date_trunc(\'month\', CURRENT_DATE) AND create_date < date_trunc(\'month\', CURRENT_DATE + interval \'1 month\')';
//   } else if (type === "yearly") {
//     query += ' AND create_date >= date_trunc(\'year\', CURRENT_DATE) AND create_date < date_trunc(\'year\', CURRENT_DATE + interval \'1 year\')';
//   }

//   query += ' ORDER BY assign_id';

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

// router.post('/assignmentInfo_post', (req, res) => {
//   const id = req.query.assign_id;
//   const type = req.body.type; // Assuming the type is in the request body

//   let query = "SELECT " +
//     "\"assign_id\" AS \"assignId\", " +
//     "\"patient_id\" AS \"patientId\", " +
//     "\"test_name\" AS \"testName\", " +
//     "\"status\" AS \"status\", " +
//     "\"active_flag\" AS \"activeFlag\", " +
//     "\"create_by\" AS \"createBy\", " +
//     "\"create_date\" AS \"createDate\", " +
//     "\"update_by\" AS \"updateBy\", " +
//     "\"update_date\" AS \"updateDate\" " +
//     "FROM \"assignment\"";

//   if (id) {
//     query += ' WHERE "assign_id" = $1';
//   } else {
//     query += ' WHERE 1=1'; // Add a placeholder WHERE condition if id is not present
//   }

//   if (type === "daily") {
//     query += ' AND "create_date"::date = CURRENT_DATE';
//   } else if (type === "weekly") {
//     query += ' AND "create_date"::date >= CURRENT_DATE - interval \'6 days\' AND "create_date"::date <= CURRENT_DATE + interval \'1 day\'';
//   } else if (type === "monthly") {
//     query += ' AND "create_date" >= date_trunc(\'month\', CURRENT_DATE) AND "create_date" < date_trunc(\'month\', CURRENT_DATE + interval \'1 month\')';
//   } else if (type === "yearly") {
//     query += ' AND "create_date" >= date_trunc(\'year\', CURRENT_DATE) AND "create_date" < date_trunc(\'year\', CURRENT_DATE + interval \'1 year\')';
//   }

//   query += ' ORDER BY "assign_id"';

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

router.post('/assignmentInfo_post', (req, res) => {
  const { patient_id } = req.body; // Extract patient_id from request body
  const type = req.body.type; // Assuming the type is in the request body

  let query = "SELECT " +
    "\"assign_id\" AS \"assignId\", " +
    "\"patient_id\" AS \"patientId\", " +
    "\"test_name\" AS \"testName\", " +
    "\"status\" AS \"status\", " +
    "\"active_flag\" AS \"activeFlag\", " +
    "\"create_by\" AS \"createBy\", " +
    "\"create_date\" AS \"createDate\", " +
    "\"update_by\" AS \"updateBy\", " +
    "\"update_date\" AS \"updateDate\" " +
    "FROM \"assignment\"";

  if (patient_id) {
    query += ' WHERE "patient_id" = $1'; // Use patient_id in the WHERE clause
  } else {
    query += ' WHERE 1=1'; // Add a placeholder WHERE condition if patient_id is not present
  }

  if (type === "daily") {
    query += ' AND "create_date"::date = CURRENT_DATE';
  } else if (type === "weekly") {
    query += ' AND "create_date"::date >= CURRENT_DATE - interval \'6 days\' AND "create_date"::date <= CURRENT_DATE + interval \'1 day\'';
  } else if (type === "monthly") {
    query += ' AND "create_date" >= date_trunc(\'month\', CURRENT_DATE) AND "create_date" < date_trunc(\'month\', CURRENT_DATE + interval \'1 month\')';
  } else if (type === "yearly") {
    query += ' AND "create_date" >= date_trunc(\'year\', CURRENT_DATE) AND "create_date" < date_trunc(\'year\', CURRENT_DATE + interval \'1 year\')';
  }

  query += ' ORDER BY "assign_id"';

  const queryParams = patient_id ? [patient_id] : [];

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