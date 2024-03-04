const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');

router.use(bodyParser.json());


// router.post('/patientList', async (req, res) => {
//   const therapistId = req.body.therapist_id;

//   try {
//     let query = 'SELECT * FROM patient';

//     // Check if the therapist_id parameter is provided
//     if (therapistId) {
//       query += ' WHERE therapist_id = $1';
//     }

//     const queryParams = therapistId ? [therapistId] : [];

//     const result = await client.query(query, queryParams);

//     if (result.rows.length === 0) {
//       return res.json({ error: 'No patient data found.' });
//     }

//     const transformedResult = await Promise.all(
//       result.rows.map(async (row, index) => {
//         const patientId = row.patient_id;
//         const patientData = {
//           no: (index + 1).toString().padStart(2, '0'), // Two-digit format
//           patientId,
//           name: `${row.fname} ${row.lname}`,
//           age: row.age,
//         };

//         // Get mood data for the patient
//         const moodData = await getAvatarMoodDetection(patientId);
//         patientData.mood = moodData.avatarMoodDetec; // Simplify the structure

//         return patientData;
//       })
//     );

//     res.json(transformedResult);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// async function getAvatarMoodDetection(patientId) {
//   const query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection WHERE patient_id = $1 ORDER BY mood_detection_id';
//   const queryParams = [patientId];

//   try {
//     const result = await client.query(query, queryParams);

//     if (result.rows.length === 0) {
//       return {
//         avatarMoodDetec: {
//           positive: '0%',
//           negative: '0%',
//           neutral: '0%',
//         },
//       };
//     }

//     // Format date using built-in toISOString method
//     const formattedDate = result.rows[0].date.toISOString();

//     // Transform the response format
//     const transformedResult = {
//       avatarMoodDetec: {
//         positive: result.rows[0].positive,
//         negative: result.rows[0].negative,
//         neutral: result.rows[0].neutral,
//       },
//     };

//     return transformedResult;
//   } catch (err) {
//     console.error('Error executing query:', err);
//     return { error: 'An error occurred while fetching avatar mood detection data.' };
//   }
// }

router.post('/patientList', async (req, res) => {
  const therapistId = req.body.therapist_id;

  try {
    let query = 'SELECT * FROM patient';

    // Check if the therapist_id parameter is provided
    if (therapistId) {
      query += ' WHERE therapist_id = $1';
    }

    const queryParams = therapistId ? [therapistId] : [];

    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.json({ error: 'No patient data found.' });
    }

    const transformedResult = await Promise.all(
      result.rows.map(async (row, index) => {
        const patientId = row.patient_id;
        const patientData = {
          no: (index + 1).toString().padStart(2, '0'), // Two-digit format
          patientId,
          name: `${row.fname} ${row.lname}`,
          age: row.age,
        };

        // Get mood data for the patient
        const moodData = await getAvatarMoodDetection(patientId);
        patientData.mood = getHighestMood(moodData.avatarMoodDetec);

        return patientData;
      })
    );

    res.json(transformedResult);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

async function getAvatarMoodDetection(patientId) {
  const query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection WHERE patient_id = $1 ORDER BY mood_detection_id';
  const queryParams = [patientId];

  try {
    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      return {
        avatarMoodDetec: {
          positive: '0%',
          negative: '0%',
          neutral: '0%',
        },
      };
    }

    // Transform the response format
    const transformedResult = {
      avatarMoodDetec: {
        positive: result.rows[0].positive,
        negative: result.rows[0].negative,
        neutral: result.rows[0].neutral,
      },
    };

    return transformedResult;
  } catch (err) {
    console.error('Error executing query:', err);
    return { error: 'An error occurred while fetching avatar mood detection data.' };
  }
}

function getHighestMood(moodData) {
  // Convert percentage strings to numbers
  const positive = parseFloat(moodData.positive);
  const negative = parseFloat(moodData.negative);
  const neutral = parseFloat(moodData.neutral);

  // Find the highest mood
  if (positive >= negative && positive >= neutral) {
    return 'positive';
  } else if (negative >= positive && negative >= neutral) {
    return 'negative';
  } else {
    return 'neutral';
  }
}


router.post('/patientGame', async (req, res) => {
  const patientId = req.body.patient_id;

  try {
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required.' });
    }

    const cleanedPatientId = parseInt(patientId.replace('PID', ''));
    console.log('test:', cleanedPatientId);
    const query = 'SELECT goodword, timeplay FROM gamedoctor WHERE patient_id = $1';
    const queryParams = [cleanedPatientId];

    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.json({ error: 'No data found for the patient.' });
    }

    const data = {
      patientId,
      goodword: result.rows[0].goodword,
      timeplay: result.rows[0].timeplay
    };

    res.json(data);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/lastVisitGame', async (req, res) => {
  const patientId = req.body.patient_id;

  try {
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required.' });
    }

    // Query to fetch last_visit from gamepatient table
    const cleanedPatientId = parseInt(patientId.replace('PID', ''));
    const patientQuery = 'SELECT last_visit FROM gamepatient WHERE patient_id = $1';
    const patientQueryParams = [cleanedPatientId];

    const patientResult = await client.query(patientQuery, patientQueryParams);

    if (patientResult.rows.length === 0) {
      return res.json({ error: 'The patient didn\'t play the game.' }); // Modified response message
    }

    // Extracting last_visit timestamp
    const lastVisitTimestamp = patientResult.rows[0].last_visit;

    const lastVisitDate = new Date(lastVisitTimestamp);
    lastVisitDate.setHours(lastVisitDate.getHours() + 7);
    // Formatting last_visit timestamp to desired format for date
    const formattedDate = new Date(lastVisitDate).toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    // Formatting last_visit timestamp to desired format for time
    const formattedTime = new Date(lastVisitDate).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const data = {
      lastVisitDate: formattedDate, // Include formatted last visit date in response
      lastVisitTime: formattedTime // Include formatted last visit time in response
    };

    res.json(data);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/checkgamepatient', async (req, res) => {
  const patientId = req.body.patient_id;

  try {
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required.' });
    }

    const cleanedPatientId = parseInt(patientId.replace('PID', ''));

    // Check if the patient exists in the gamedoctor table
    let query = 'SELECT * FROM gamedoctor WHERE patient_id = $1';
    let queryParams = [cleanedPatientId];

    let result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      // If patient does not exist, create a new row with default values
      query = 'INSERT INTO gamedoctor (patient_id, goodword, timeplay) VALUES ($1, $2, $3)';
      queryParams = [cleanedPatientId, 0, 0];
      await client.query(query, queryParams);
    }

    // Check if the patient exists in the gamepatient table
    // query = 'SELECT * FROM gamepatient WHERE patient_id = $1';
    // queryParams = [cleanedPatientId];

    // result = await client.query(query, queryParams);

    // if (result.rows.length === 0) {
    //   // If patient does not exist, create a new row with default values
    //   query = 'INSERT INTO gamepatient (patient_id, status, click_count, health_bar, hungry_bar, last_visit, stamina_bar, apple, fish, rice, meat, sleep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
    //   const currentTime = new Date();
    //   queryParams = [cleanedPatientId,"state0", 0, 100, 100, currentTime, 100, 3, 3, 3, 3, false];
    //   await client.query(query, queryParams);
    // }

    res.json({ message: 'Patient game data checked/created successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
