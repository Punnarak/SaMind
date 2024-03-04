const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const auth = require('./auth.js').authorization;

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
//         patientData.mood = getHighestMood(moodData.avatarMoodDetec);

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

// function getHighestMood(moodData) {
//   // Check if mood data is available
//   if (moodData.positive === '-' && moodData.negative === '-' && moodData.neutral === '-') {
//     return '-';
//   }

//   // Convert percentage strings to numbers
//   const positive = parseFloat(moodData.positive);
//   const negative = parseFloat(moodData.negative);
//   const neutral = parseFloat(moodData.neutral);

//   // Find the highest mood
//   if (positive >= negative && positive >= neutral) {
//     return 'positive';
//   } else if (negative >= positive && negative >= neutral) {
//     return 'negative';
//   } else {
//     return 'neutral';
//   }
// }


// function getHighestMood(moodData) {
//   // Convert percentage strings to numbers
//   const positive = parseFloat(moodData.positive);
//   const negative = parseFloat(moodData.negative);
//   const neutral = parseFloat(moodData.neutral);

//   // Find the highest mood
//   if (positive >= negative && positive >= neutral) {
//     return 'positive';
//   } else if (negative >= positive && negative >= neutral) {
//     return 'negative';
//   } else {
//     return 'neutral';
//   }
// }

router.post('/patientList', auth, async (req, res) => {
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
        patientData.mood = getHighestMood(moodData);

        return patientData;
      })
    );

    res.json(transformedResult);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// async function getAvatarMoodDetection(patientId) {
//   const query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection WHERE patient_id = $1 ORDER BY mood_detection_id DESC LIMIT 1';
//   const queryParams = [patientId];

//   try {
//     const result = await client.query(query, queryParams);

//     if (result.rows.length === 0) {
//       return {
//         positive: '-',
//         negative: '-',
//         neutral: '-',
//       };
//     }

//     return result.rows[0];
//   } catch (err) {
//     console.error('Error executing query:', err);
//     return { error: 'An error occurred while fetching avatar mood detection data.' };
//   }
// }

async function getAvatarMoodDetection(patientId) {
  const query = 'SELECT date, positive, negative, neutral FROM avatar_mood_detection WHERE patient_id = $1 ORDER BY mood_detection_id DESC LIMIT 1';
  const queryParams = [patientId];

  try {
    const result = await client.query(query, queryParams);

    if (result.rows.length === 0) {
      return null; // Return null if no mood data is found
    }

    return result.rows[0];
  } catch (err) {
    console.error('Error executing query:', err);
    return { error: 'An error occurred while fetching avatar mood detection data.' };
  }
}


// function getHighestMood(moodData) {
//   if (!moodData || !moodData.positive || !moodData.negative || !moodData.neutral) {
//     return '-';
//   }

//   // Convert percentage strings to numbers
//   const positive = parseFloat(moodData.positive);
//   const negative = parseFloat(moodData.negative);
//   const neutral = parseFloat(moodData.neutral);

//   // Find the highest mood
//   if (positive >= negative && positive >= neutral) {
//     return 'positive';
//   } else if (negative >= positive && negative >= neutral) {
//     return 'negative';
//   } else {
//     return 'neutral';
//   }
// }

function getHighestMood(moodData) {
  if (!moodData) {
    return '-';
  }

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



module.exports = router;
