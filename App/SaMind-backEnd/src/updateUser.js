const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.use(express.json());

// API endpoint for updating user profiles
router.post('/update_user_profile', (req, res) => {
  try {
    const { id, email, password, fname, lname } = req.body;

    // Update user profile in the database
    client.query(
      'UPDATE users SET email=$2, password=$3, fname=$4, lname=$5 WHERE id=$1',
      [id, email, password, fname, lname],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while updating the user profile' });
        } else {
          res.json({ message: 'User profile updated successfully' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;

