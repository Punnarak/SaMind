const client = require('./connection.js');
const express = require('express');
const router = express.Router();

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

router.get('/average_scores', async (req, res) => {
  const { patient_id } = req.query;

  // Check if patient_id is provided
  if (!patient_id) {
    return res.status(400).json({ error: 'Patient ID is required as a query parameter.' });
  }

  const avgScoreQuery = `
    SELECT patient_id, AVG(score)::numeric(10, 2) AS average_score
    FROM mood_tracker
    WHERE patient_id = $1
    GROUP BY patient_id;
  `;

  try {
    const result = await client.query(avgScoreQuery, [patient_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found or has no mood tracker entries.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred while fetching average scores' });
  }
});

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

router.post('/check_mood_per_day_get', (req, res) => {
  const id = req.body.patient_id; // Get the patient_id from the request body

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

  // Execute the query
  client.query(query, queryParams)
    .then(result => {
      // Check if there are rows in the result
      const hasRows = result.rows.length > 0;

      // Construct the response object
      const responseObject = {
        fname: hasRows ? result.rows[0].fname : null,
        checkin: hasRows,
        moodscore: hasRows ? result.rows[0].score : null,
      };

      // Return the JSON object
      res.json(responseObject);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// router.get('/dash_mood_detection', (req, res) => {
//   const id = req.query.id; // Get the id parameter from the query
//   // client.query("SET search_path TO 'avatarDB';");
//   // let query = 'SELECT * FROM mood_detection';

//   let query = `
//   SET search_path TO 'avatarDB';
//   SELECT * FROM mood_detection;
// `;

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE id = $1';
//   }

//   // Add an "ORDER BY" clause to sort the result by the "id" column
//   query += ' ORDER BY id';

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

router.get('/dash_mood_detection1', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  // let query = 'SET search_path TO \'avatarDB\'; SELECT * FROM mood_detection';
  // const query = id ? 'SELECT * FROM avatarDB.mood_detection WHERE id = $1 ORDER BY id' : 'SELECT * FROM avatarDB.mood_detection ORDER BY id';
  let query = 'SELECT * FROM avatar_db.mood_detection';

  // Check if the id parameter is provided
  if (id) {
    query += ' LIMIT 1';
    client.query(query, [id])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
  } else {
    query += ' ORDER BY id';
    client.query(query)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
  }
});

router.get('/dash_mood_detection', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  let query = 'SELECT * FROM avatar_db.mood_detection';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE id = $1';
  }

  // Add an "ORDER BY" clause to sort the result by the "id" column
  query += ' ORDER BY id';

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

// router.get('/dash_mood_detection', (req, res) => {
//   const id = req.query.id; // Get the id parameter from the query
//   let query = 'SELECT * FROM avatarDB.mood_detection';

//   // Check if the id parameter is provided
//   if (id) {
//     query += ' WHERE id = $1 ORDER BY id LIMIT 1';
//     client.query(query, [id])
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   } else {
//     query += ' ORDER BY id';
//     client.query(query)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   }
// });

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

router.post('/assignmentInfo_post', (req, res) => {
  const id = req.query.assign_id;
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

  if (id) {
    query += ' WHERE "assign_id" = $1';
  } else {
    query += ' WHERE 1=1'; // Add a placeholder WHERE condition if id is not present
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