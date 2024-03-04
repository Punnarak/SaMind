const client = require('./connection.js')
const express = require('express');
const router = express.Router();

// const { SpeechClient } = require('@google-cloud/speech');
// const { Storage } = require('@google-cloud/storage');
// const fs = require('fs');

// // Load service account credentials
// const credentials = JSON.parse(fs.readFileSync('./sa_speech.json'));

// // Initialize Google Cloud Speech-to-Text client with service account credentials
// const speechClient = new SpeechClient({
//   credentials: credentials,
// });

// router.post('/transcribe_audio', async (req, res) => {
//   try {
//     // Check if audio file is included in the request
//     if (!req.files || !req.files.audio) {
//       return res.status(400).json({ error: 'No audio file provided' });
//     }

//     const audioFile = req.files.audio;

//     // Configure the request
//     const request = {
//       audio: {
//         content: audioFile.data,
//       },
//       config: {
//         encoding: 'LINEAR16',
//         sampleRateHertz: 16000, // Adjust as needed
//         languageCode: 'th-TH', // Adjust language code as needed
//       },
//     };

//     // Detects speech in the audio file
//     const [response] = await speechClient.recognize(request);
//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n');

//     return res.json({ transcription });
//   } catch (error) {
//     console.error('Error transcribing audio:', error);
//     return res.status(500).json({ error: 'An error occurred while transcribing audio' });
//   }
// });




router.get('/game_get_id', (req, res) => {
  const patient_id = req.query.patient_id;
  let query = 'SELECT * FROM gamepatient';
  
  if (patient_id) {
    query += ' WHERE patient_id = $1';
  }
  
  const queryParams = patient_id ? [patient_id] : [];

  client.query(query, queryParams)
    .then(result => {
      if (result.rows.length === 0) {
        // If no rows found, and a patient_id is provided, insert a new row
        if (patient_id) {
          const defaultValues = {
            click_count: 0,
            health_bar: 100,
            hungry_bar: 100,
            last_visit: new Date(),
            stamina_bar: 100,
            status: "state0",
            apple: 0,
            fish: 0,
            rice: 0,
            meat: 0,
            sleep: false,
          };

          const insertQuery = `INSERT INTO gamepatient (patient_id, click_count, health_bar, hungry_bar, last_visit, stamina_bar, status, apple, fish, rice, meat, sleep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
          const insertParams = [patient_id, defaultValues.click_count, defaultValues.health_bar, defaultValues.hungry_bar, defaultValues.last_visit, defaultValues.stamina_bar, defaultValues.status, defaultValues.apple, defaultValues.fish, defaultValues.rice, defaultValues.meat, defaultValues.sleep];

          client.query(insertQuery, insertParams)
            .then(insertResult => {
              const newRow = insertResult.rows[0];
              res.json([newRow]);
            })
            .catch(err => {
              console.error('Error inserting new row:', err);
              res.status(500).json({ error: 'An error occurred while inserting new row' });
            });
        } else {
          // If no patient_id provided, return an empty array
          res.json([]);
        }
      } else {
        res.json(result.rows);
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

  router.get('/game_get_all', (req, res) => {
    client.query('SELECT * FROM gamepatient')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
});

router.put('/update_health_bar30', (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ error: 'patient_id is required' });
  }

  client.query('UPDATE gamepatient SET health_bar = health_bar - 30 WHERE patient_id = $1', [patient_id])
    .then(result => {
      if (result.rowCount > 0) {
        // Ensure health_bar doesn't go below 0
        client.query('UPDATE gamepatient SET health_bar = GREATEST(health_bar, 0) WHERE patient_id = $1', [patient_id])
          .then(() => {
            res.json({ message: 'Health bar updated successfully' });
          })
          .catch(err => {
            console.error('Error updating health bar:', err);
            res.status(500).json({ error: 'An error occurred' });
          });
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.put('/update_click_count', (req, res) => {
  const { patient_id, click_count } = req.body;

  if (!patient_id || !click_count) {
      return res.status(400).json({ error: 'patient_id and click_count are required' });
  }

  client.query('SELECT click_count FROM gamepatient WHERE patient_id = $1', [patient_id])
    .then(result => {
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        
        const oldClickCount = parseFloat(result.rows[0].click_count);
        const newClickCount = parseFloat(oldClickCount) + parseFloat(click_count);

        client.query('UPDATE gamepatient SET click_count = $1 WHERE patient_id = $2', [newClickCount, patient_id])
            .then(() => {
                res.json({ message: 'Click count updated successfully' });
            })
            .catch(err => {
                console.error('Error updating click count:', err);
                res.status(500).json({ error: 'An error occurred while updating click count' });
            });
    })
    .catch(err => {
        console.error('Error retrieving old click count:', err);
        res.status(500).json({ error: 'An error occurred while retrieving old click count' });
    });
});


router.put('/update_patient_data', (req, res) => {
  const { patient_id, click_count, health_bar, hungry_bar, last_visit, stamina_bar, status, apple, fish, rice, meat, sleep } = req.body;

  // Check if patient_id is provided
  if (!patient_id) {
    return res.status(400).json({ error: 'patient_id is required' });
  }

  // Construct the SET clause for the SQL query based on the provided fields
  let setClause = '';
  let queryParams = [];
  let paramIndex = 1;

  if (click_count !== undefined) {
    setClause += `click_count = $${paramIndex}, `;
    queryParams.push(click_count);
    paramIndex++;
  }
  if (health_bar !== undefined) {
    setClause += `health_bar = $${paramIndex}, `;
    queryParams.push(health_bar);
    paramIndex++;
  }
  if (hungry_bar !== undefined) {
    setClause += `hungry_bar = $${paramIndex}, `;
    queryParams.push(hungry_bar);
    paramIndex++;
  }
  if (last_visit !== undefined) {
    setClause += `last_visit = $${paramIndex}, `;
    queryParams.push(last_visit);
    paramIndex++;
  }
  if (stamina_bar !== undefined) {
    setClause += `stamina_bar = $${paramIndex}, `;
    queryParams.push(stamina_bar);
    paramIndex++;
  }
  if (status !== undefined) {
    setClause += `status = $${paramIndex}, `;
    queryParams.push(status);
    paramIndex++;
  }
  if (apple !== undefined) {
    setClause += `apple = $${paramIndex}, `;
    queryParams.push(apple);
    paramIndex++;
  }
  if (fish !== undefined) {
    setClause += `fish = $${paramIndex}, `;
    queryParams.push(fish);
    paramIndex++;
  }
  if (rice !== undefined) {
    setClause += `rice = $${paramIndex}, `;
    queryParams.push(rice);
    paramIndex++;
  }
  if (meat !== undefined) {
    setClause += `meat = $${paramIndex}, `;
    queryParams.push(meat);
    paramIndex++;
  }
  if (sleep !== undefined) {
    setClause += `sleep = $${paramIndex}, `;
    queryParams.push(sleep);
    paramIndex++;
  }

  // Remove the trailing comma and space
  setClause = setClause.slice(0, -2);

  // Construct the SQL query
  const query = `UPDATE gamepatient SET ${setClause} WHERE patient_id = $${paramIndex}`;
  queryParams.push(patient_id);

  // Execute the query
  client.query(query, queryParams)
    .then(result => {
      if (result.rowCount > 0) {
        res.json({ message: 'Patient data updated successfully' });
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.put('/update_stamina_bar_de', (req, res) => {
  const { patient_id, decrementAmount } = req.body;

  if (!patient_id || !decrementAmount) {
    return res.status(400).json({ error: 'patient_id and decrementAmount are required' });
  }

  client.query('UPDATE gamepatient SET stamina_bar = stamina_bar - $1 WHERE patient_id = $2', [decrementAmount, patient_id])
    .then(result => {
      if (result.rowCount > 0) {
        // Ensure stamina_bar doesn't go below 0
        client.query('UPDATE gamepatient SET stamina_bar = GREATEST(stamina_bar, 0) WHERE patient_id = $1', [patient_id])
          .then(() => {
            res.json({ message: 'Stamina bar updated successfully' });
          })
          .catch(err => {
            console.error('Error updating stamina bar:', err);
            res.status(500).json({ error: 'An error occurred' });
          });
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.put('/update_hungry_bar_de', (req, res) => {
  const { patient_id, decrementAmount } = req.body;

  if (!patient_id || !decrementAmount) {
    return res.status(400).json({ error: 'patient_id and decrementAmount are required' });
  }

  client.query('UPDATE gamepatient SET hungry_bar = hungry_bar - $1 WHERE patient_id = $2', [decrementAmount, patient_id])
    .then(result => {
      if (result.rowCount > 0) {
        // Ensure hungry_bar doesn't go below 0
        client.query('UPDATE gamepatient SET hungry_bar = GREATEST(hungry_bar, 0) WHERE patient_id = $1', [patient_id])
          .then(() => {
            res.json({ message: 'hungry bar updated successfully' });
          })
          .catch(err => {
            console.error('Error updating hungry bar:', err);
            res.status(500).json({ error: 'An error occurred' });
          });
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.put('/update_timeplay', (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ error: 'patient_id is required' });
  }

  // Check if patient exists
  client.query('SELECT timeplay FROM gamedoctor WHERE patient_id = $1', [patient_id])
    .then(result => {
      if (result.rows.length === 0) {
        // If patient not found, insert a new row
        client.query('INSERT INTO gamedoctor (patient_id, goodword, timeplay) VALUES ($1, $2, $3)', [patient_id, 0, 1])
          .then(() => {
            res.json({ message: 'New patient created with timeplay 1' });
          })
          .catch(err => {
            console.error('Error creating new patient:', err);
            res.status(500).json({ error: 'An error occurred while creating new patient' });
          });
      } else {
        // If patient found, update timeplay
        const oldTimePlay = parseInt(result.rows[0].timeplay);
        const newTimePlay = oldTimePlay + 1;

        client.query('UPDATE gamedoctor SET timeplay = $1 WHERE patient_id = $2', [newTimePlay, patient_id])
          .then(() => {
            res.json({ message: 'Time play updated successfully' });
          })
          .catch(err => {
            console.error('Error updating time play:', err);
            res.status(500).json({ error: 'An error occurred while updating time play' });
          });
      }
    })
    .catch(err => {
      console.error('Error retrieving old time play:', err);
      res.status(500).json({ error: 'An error occurred while retrieving old time play' });
    });
});

router.get('/get_click_count', (req, res) => {
  const { patient_id } = req.query;

  if (!patient_id) {
    return res.status(400).json({ error: 'patient_id is required' });
  }

  const query = 'SELECT click_count FROM gamepatient WHERE patient_id = $1';
  const queryParams = [patient_id];

  client.query(query, queryParams)
    .then(result => {
      let clickCount = 0;
      if (result.rows.length > 0) {
        clickCount = result.rows[0].click_count;
      }
      res.json({ click_count: clickCount });
    })
    .catch(err => {
      console.error('Error retrieving click count:', err);
      res.status(500).json({ error: 'An error occurred while retrieving click count' });
    });
});

  
  module.exports = router;
  