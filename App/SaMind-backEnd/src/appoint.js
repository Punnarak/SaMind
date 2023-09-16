const client = require('./connection.js')
const express = require('express');
const router = express.Router();

router.post('/appoint', function (req, res, next) {
    const therapistID = req.body.therapistID;
    const date = req.body.date;
    const time = req.body.time;

    const query = {
      text: 'SELECT * FROM appointment WHERE therapistID = $1, date = $2, time = $3',
      values: [therapistID, date, time]
    };
  
    client.query(query, function(err, appointment, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      if (appointment.rows.length == 0) {
        res.json({ status: 'error', message: 'NO user found' });
        return;
      }
    });
});

module.exports = router;
