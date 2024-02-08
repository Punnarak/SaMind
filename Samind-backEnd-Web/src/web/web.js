const express = require('express');
const cors = require('cors');
const web = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

web.use(cors());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));
web.use(cookieParser());

// Import API file
const patientList = require('./patientList.js');
const allTest = require('./test.js');
const info_therapist = require('./info_user.js');
const calendar_view = require('./calendar.js');
const appointment = require('./appointment.js');
const login = require ('./login.js');

// Use the API file
web.use(patientList);
web.use(allTest);
web.use(info_therapist);
web.use(calendar_view);
web.use(appointment);
web.use(login);

web.listen(4301, function () {
  console.log('CORS-enabled web server listening on port 4301');
});

// exports.module = web;
module.exports = web;

