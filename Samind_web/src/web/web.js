const express = require('express');
const cors = require('cors');
const web = express();
const bodyParser = require('body-parser');

web.use(cors());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));

// Import API file
const patientList = require('./patientList.js');
const allTest = require("./test.js");

// Use the API file
web.use(patientList);
web.use(allTest);

web.listen(4301, function () {
  console.log('CORS-enabled web server listening on port 4301');
});

// exports.module = web;
module.exports = web;

