const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import API file
const login = require('./login.js');
const register = require('./login.js');
const authen = require('./login.js');
const sendotp = require('./login.js');
const verifyotp = require('./login.js');
const question = require('./question.js');
const library = require('./library.js');
const appoint = require('./appoint.js');
const notification = require('./notification.js');


// Use the API file
app.use(login);
app.use(register);
app.use(authen);
app.use(sendotp);
app.use(verifyotp);
app.use(question);
app.use(library);
app.use(appoint);
app.use(notification);

// Test
const dashboard = require('./dashboard.js');
app.use(dashboard);

const mailOTP = require('./mailOTP.js');
app.use(mailOTP);

const info_users = require('./info_users.js');
app.use(info_users);

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SaMind API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./login.js', './question.js', './library.js', './appoint.js', './dashboard.js', './mailOTP.js', './info_users.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(4343, function () {
  console.log('CORS-enabled web server listening on port 4343');
});

exports.module = app;
