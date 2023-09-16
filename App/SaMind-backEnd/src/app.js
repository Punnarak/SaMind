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
const appoint = require('./appoint.js');
const login = require('./login.js');
const register = require('./login.js');
const authen = require('./login.js');
const sendotp = require('./login.js');
const verifyotp = require('./login.js');
const question = require('./question.js');
const library = require('./library.js');



// Use the API file
app.use(appoint);
app.use(login);
app.use(register);
app.use(authen);
app.use(sendotp);
app.use(verifyotp);
app.use(question);
app.use(library);

 
app.listen(4343, function () {
    console.log('CORS-enabled web server listening on port 4343')
  })


exports.module = app;