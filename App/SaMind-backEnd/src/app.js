const express = require('express')
const cors = require('cors')
const app = express()

const _ = require('lodash')
const axios = require('axios');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Import API file
const login = require('./login.js');
const register = require('./login.js');
const authen = require('./login.js');
const sendotp = require('./login.js');
const verifyotp = require('./login.js');
const question = require('./question.js');
const library = require('./library.js');
const appoint = require('./appoint.js');


// Use the API file
app.use(login);
app.use(register);
app.use(authen);
app.use(sendotp);
app.use(verifyotp);
app.use(question);
app.use(library);
app.use(appoint);



// Test 
const dashboard = require('./dashboard.js');
app.use(dashboard);

const mailOTP = require('./mailOTP.js');
app.use(mailOTP);

const updateUser = require('./updateUser.js');
app.use(updateUser);



 
app.listen(4343, function () {
    console.log('CORS-enabled web server listening on port 4343')
  })

exports.module = app;