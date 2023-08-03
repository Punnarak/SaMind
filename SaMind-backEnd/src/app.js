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

// Use the API file
app.use(appoint);


app.listen(4343, function () {
    console.log('CORS-enabled web server listening on port 4343')
  })






