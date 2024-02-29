const client = require('./connection.js')
const express = require('express');
const router = express.Router();

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
            status: "state0"
          };

          const insertQuery = `INSERT INTO gamepatient (patient_id, click_count, health_bar, hungry_bar, last_visit, stamina_bar, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
          const insertParams = [patient_id, defaultValues.click_count, defaultValues.health_bar, defaultValues.hungry_bar, defaultValues.last_visit, defaultValues.stamina_bar, defaultValues.status];

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

router.put('/update_hungry_bar', (req, res) => {
  const { patient_id, hungry_bar } = req.body;

  if (!patient_id || hungry_bar === undefined) {
      return res.status(400).json({ error: 'Both patient_id and hungry_bar are required' });
  }

  client.query('UPDATE gamepatient SET hungry_bar = $1 WHERE patient_id = $2', [hungry_bar, patient_id])
      .then(result => {
          if (result.rowCount > 0) {
              res.json({ message: 'Hungry bar updated successfully' });
          } else {
              res.status(404).json({ error: 'Patient not found' });
          }
      })
      .catch(err => {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'An error occurred' });
      });
});
  
  module.exports = router;
  