const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.post('/talk_with_avatar', (req, res) => {
    const { patient_id } = req.body;
  
    if (!patient_id) {
      return res.status(400).json({ error: 'patient_id is required' });
    }
  
    const insertQuery = `
      INSERT INTO avatar (patient_id, nagative_word, positive_word, neutral_word, nagative_percent, positive_percent, neutral_percent)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const insertValues = [
      patient_id,
      0,
      0,
      0,
      0,
      0,
      0
    ];
  
    client.query(insertQuery, insertValues)
      .then(result => {
        const newRow = result.rows[0]; // Newly inserted row
        res.status(201).json({ message: 'Row inserted successfully', data: newRow });
      })
      .catch(err => {
        console.error('Error inserting row into avatar table:', err);
        res.status(500).json({ error: 'An error occurred while inserting row into avatar table' });
      });
  });

  router.put('/update_mood', (req, res) => {
    const { maxLabel, mood_detection_id } = req.body;

    if (!maxLabel || !mood_detection_id) {
        return res.status(400).json({ error: 'maxLabel and mood_detection_id are required' });
    }

    let columnToUpdate;
    switch (maxLabel) {
        case 'LABEL_0':
            columnToUpdate = 'nagative_word';
            break;
        case 'LABEL_1':
            columnToUpdate = 'positive_word';
            break;
        case 'LABEL_2':
            columnToUpdate = 'neutral_word';
            break;
        default:
            return res.status(400).json({ error: 'Invalid maxLabel value' });
    }

    // Update word count
    const updateQuery = `
        UPDATE avatar
        SET ${columnToUpdate} = ${columnToUpdate} + 1
        WHERE mood_detection_id = $1
    `;

    client.query(updateQuery, [mood_detection_id])
        .then(() => {
            // Calculate and update percentages
            calculateAndUpdate(mood_detection_id, res);
        })
        .catch(err => {
            console.error('Error updating mood word count:', err);
            res.status(500).json({ error: 'An error occurred while updating mood word count' });
        });
});


function calculateAndUpdate(mood_detection_id, res) {
    client.query('SELECT nagative_word, positive_word, neutral_word FROM avatar WHERE mood_detection_id = $1', [mood_detection_id])
      .then(result => {
        const { nagative_word, positive_word, neutral_word } = result.rows[0];
        const total = parseFloat(nagative_word) + parseFloat(positive_word) + parseFloat(neutral_word);
        console.log(total)

        const nagative_percent = total === 0 ? 0 : ((parseFloat(nagative_word) / parseFloat(total)) * 100).toFixed(2);
        const positive_percent = total === 0 ? 0 : ((parseFloat(positive_word) / parseFloat(total)) * 100).toFixed(2);
        const neutral_percent = total === 0 ? 0 : ((parseFloat(neutral_word) / parseFloat(total)) * 100).toFixed(2);
  
        // Update the percentages
        const updateQuery = `
          UPDATE avatar 
          SET nagative_percent = $1, positive_percent = $2, neutral_percent = $3 
          WHERE mood_detection_id = $4
        `;
        
        client.query(updateQuery, [nagative_percent, positive_percent, neutral_percent, mood_detection_id])
          .then(() => {
            res.json({ message: 'Percentages updated successfully' });
          })
          .catch(err => {
            console.error('Error updating percentages:', err);
            res.status(500).json({ error: 'An error occurred while updating percentages' });
          });
      })
      .catch(err => {
        console.error('Error retrieving label counts for percentage calculation:', err);
        res.status(500).json({ error: 'An error occurred while retrieving label counts' });
      });
}

router.get('/count_parient', (req, res) => {
    const { patient_id } = req.params;

    if (!patient_id) {
        return res.status(400).json({ error: 'patient_id is required' });
    }

    // Query to count rows for the specified patient_id
    const countQuery = `
        SELECT COUNT(*) AS row_count
        FROM avatar
        WHERE patient_id = $1
    `;

    client.query(countQuery, [patient_id])
        .then(result => {
            const rowCount = result.rows[0].row_count;
            console.log(patient_id, "plays", rowCount, "times")
            res.status(200).json({ patient_id, row_count: rowCount });
        })
        .catch(err => {
            console.error('Error counting rows:', err);
            res.status(500).json({ error: 'An error occurred while counting rows' });
        });
});

  
module.exports = router;
  