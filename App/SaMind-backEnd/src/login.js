const client = require('./connection.js')
const validateForm = require('./function.js')

const express = require('express')
// const cors = require('cors')
// const app = express()
const router = express.Router();

const _ = require('lodash')
const axios = require('axios');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');
const secret = 'YmFja0VuZC1Mb2dpbi1TYU1pbmQ=' //backEnd-Login-SaMind encode by base64

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

// const { Auth, LoginCredentials } = require("two-step-auth");

// async function login(emailId) {
//   try {
//     const res = await Auth(emailId, "SaMind_OTP");
//     console.log(res);
//     console.log(res.mail);
//     console.log(res.OTP);
//     console.log(res.success);
//   } catch (error) {
//     console.log(error);
//   }
// }

// app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

client.connect();

// router.post('/register',jsonParser, function (req, res, next) {
//     bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//     const id = req.body.id;
//     const email = req.body.email;
//     const password = req.body.password;
//     const fname = req.body.fname;
//     const lname = req.body.lname;

//     const query = {
//         text: 'INSERT INTO users (id,email, password, fname, lname) VALUES ($1, $2, $3, $4, $5)',
//         values: [id,email, hash, fname, lname]
//     };

//     client.query(query, function(err, results) {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'ok' });
//         });
//     });
//     client.end;
// })

const transporter = nodemailer.createTransport({
  // requireTLS: true,
  host: "smtp.gmail.com.",
  port: 465,
  secure: true,
  auth: {
    user: "desmotest123@gmail.com",
    pass: "uovg pqyt utur dvyz",
  },
});

// Register a user and send OTP
// router.post('/register-with-otp', jsonParser, async (req, res) => {
//   try {
//     const { id, email, password, fname, lname } = req.body;

//     // Validate the email address
//     if (!isValidEmail(email)) {
//       return res.status(400).json({ message: 'Invalid email address' });
//     }

//     // Generate a random OTP
//     const otp = randomstring.generate({ length: 6, charset: 'numeric' });

//     // Hash the user's password
//     bcrypt.hash(password, saltRounds, async (err, hash) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error hashing password' });
//       }

//       // Save OTP and user details in the database
//       try {
//         const registrationQuery = {
//           text: 'INSERT INTO users (id, email, password, fname, lname) VALUES ($1, $2, $3, $4, $5)',
//           values: [id, email, hash, fname, lname],
//         };

//         await client.query(registrationQuery);
//         await client.query('INSERT INTO otp_data (email, otp) VALUES ($1, $2)', [email, otp]);

//         // Send OTP through email
//         await transporter.sendMail({
//           from: 'your_email@gmail.com',
//           to: email,
//           subject: 'Your OTP Code',
//           text: `Your OTP code is: ${otp}`,
//           html: `<b>Your OTP code is: ${otp}</b>`,
//         });

//         res.status(200).json({ message: 'Registration and OTP sent successfully' });
//       } catch (error) {
//         console.error('Error registering user and sending OTP:', error);
//         res.status(500).json({ message: 'An error occurred' });
//       }
//     });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

// Register a user and send OTP
// router.post('/register-with-otp', jsonParser, async (req, res) => {
//   try {
//     const { id, email, password, fname, lname } = req.body;

//     // Validate the email address
//     if (!isValidEmail(email)) {
//       return res.status(400).json({ message: 'Invalid email address' });
//     }

//     // Generate a random OTP
//     const otp = randomstring.generate({ length: 6, charset: 'numeric' });

//     // Hash the user's password
//     const hash = await bcrypt.hash(password, saltRounds);

//     // Start a database transaction
//     // const client = await client.connect();
//     try {
//       // Save OTP and user details in the database within a transaction
//       await client.query('BEGIN');

//       const registrationQuery = {
//         text: 'INSERT INTO users (id, email, password, fname, lname) VALUES ($1, $2, $3, $4, $5)',
//         values: [id, email, hash, fname, lname],
//       };
//       await client.query(registrationQuery);

//       await client.query('INSERT INTO otp_data (email, otp) VALUES ($1, $2)', [email, otp]);

//       // Commit the transaction
//       await client.query('COMMIT');

//       // Send OTP through email
//       await transporter.sendMail({
//         from: 'your_email@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is: ${otp}`,
//         html: `<b>Your OTP code is: ${otp}</b>`,
//       });

//       res.status(200).json({ message: 'Registration and OTP sent successfully' });
//     } catch (error) {
//       // Rollback the transaction in case of an error
//       await client.query('ROLLBACK');
//       console.error('Error registering user and sending OTP:', error);
//       res.status(500).json({ message: 'An error occurred' });
//     } finally {
//       // Release the database connection
//       client.release();
//     }
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

// Function to validate email address

// Register a user and send OTP

router.post('/register-with-otp', jsonParser, async (req, res) => {
  try {
    const { id, email, password, fname, lname } = req.body;

    // Validate the email address
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Generate a random OTP
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });

    // Hash the user's password
    const hash = await bcrypt.hash(password, saltRounds);

    // Start a database transaction
    // const client = await pool.connect();
    try {
      // Save user details in the database within a transaction
      await client.query('BEGIN');

      const registrationQuery = {
        text: 'INSERT INTO users (id, email, password, fname, lname) VALUES ($1, $2, $3, $4, $5)',
        values: [id, email, hash, fname, lname],
      };
      await client.query(registrationQuery);

      await client.query('INSERT INTO otp_data (email, otp) VALUES ($1, $2)', [email, otp]);

      // Commit the transaction
      await client.query('COMMIT');

      // Send OTP through email
      await transporter.sendMail({
        from: 'desmotest123@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
        html: `<b>Your OTP code is: ${otp}</b>`,
      });

      res.status(200).json({ message: 'Registration initiated. Please verify OTP to complete registration.' });
    } catch (error) {
      // Rollback the transaction in case of an error
      await client.query('ROLLBACK');
      console.error('Error initiating registration and sending OTP:', error);
      res.status(500).json({ message: 'An error occurred' });
    } finally {
      // Release the database connection
      client.release();
    }
  } catch (error) {
    console.error('Error during registration initiation:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


router.post('/update_user_profile', async (req, res) => {
  try {
    const { id, email, password, fname, lname } = req.body;

    // Validate the email address
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Hash the new password
    const hash = await bcrypt.hash(password, saltRounds);

    // Update user profile in the database with the hashed password
    client.query(
      'UPDATE users SET email=$2, password=$3, fname=$4, lname=$5 WHERE id=$1',
      [id, email, hash, fname, lname], // Use the hashed password
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


function isValidEmail(email) {
  // Use a regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//this api "/register" remake from "Pee"
// router.post('/register', jsonParser, function (req, res, next) {
//   const id = req.body.id;
//   const email = req.body.email;
//   const password = req.body.password;
//   const fname = req.body.fname;
//   const lname = req.body.lname;

//   const emailCheckQuery = {
//     text: 'SELECT * FROM users WHERE email = $1',
//     values: [email]
//   };

//   client.query(emailCheckQuery, function(err, emailCheckResult) {
//     if (err) {
//       res.json({ status: 'error', message: err });
//       return;
//     }

//     if (emailCheckResult.rows.length > 0) {
//       res.status(409).json({ status: 'error', message: 'Email already exists.' });
//       return;
//     }

//     const idCheckQuery = {
//       text: 'SELECT * FROM users WHERE id = $1',
//       values: [id]
//     };

//     client.query(idCheckQuery, function(err, idCheckResult) {
//       if (err) {
//         res.json({ status: 'error', message: err });
//         return;
//       }

//       if (idCheckResult.rows.length > 0) {
//         res.status(409).json({ status: 'error', message: 'ID already exists.' });
//         return;
//       }


//       bcrypt.hash(password, saltRounds, function(err, hash) {
//         if (err) {
//           res.json({ status: 'error', message: err });
//           return;
//         }

//         const query = {
//           text: 'INSERT INTO users (id, email, password, fname, lname) VALUES ($1, $2, $3, $4, $5)',
//           values: [id, email, hash, fname, lname]
//         };

//         client.query(query, function(err, results) {
//           if (err) {
//             res.json({ status: 'error', message: err });
//             return;
//           }
//           res.json({ status: 'success' });
//         });
//       });
//     });
//   });
// });

function authenticate(req, res, next) {
    // ตรวจสอบการยืนยันตัวตนที่นี่
    // ตัวอย่างเช่นตรวจสอบค่า Authorization ใน req.headers หรือตรวจสอบการตรวจสอบเซสชัน
  
    // หากผ่านการยืนยันตัวตน
    next();
}
  
router.post('/login', authenticate, jsonParser, function (req, res, next) {
    const email = req.body.email;
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email]
    };
  
    client.query(query, function(err, users, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      if (users.rows.length == 0) {
        res.json({ status: 'error', message: 'NO user found' });
        return;
      }

      // Retrieve the fname values
      const fname = users.rows.map(row => row.fname); //add

      bcrypt.compare(req.body.password, users.rows[0].password, function(err, isLogin) {
        if (isLogin) {
          var token = jwt.sign({ email: users.rows[0].email }, secret, { expiresIn: '1h' });
          res.json({ status: 'ok', message: 'login success', token, fname});
        } else {
          res.json({ status: 'error', message: 'login failed' });
        }
      });
    });
  });

router.post('/authen',jsonParser, function (req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded})
    } catch(err){
        res.json({status: 'error', message: err.message})
    }
    client.end;
})

router.post('/sendotp', (req,res) => {
  var phoneNo = _.get(req, ["body", "phoneNo"]);
  console.log(phoneNo)

  try {
    phoneNo = String(phoneNo)
    if(phoneNo && phoneNo.length == 10) {
      let data = JSON.stringify({
        "msisdn": phoneNo,
        "sender": "OTP"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://havesms.com/api/otp/send',
        headers: { 
          'Authorization': 'Bearer QLc6nv2Ap1b24tj2a33nWoECcFux1qnc86RGd6z7', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        if(response.data.error == false) {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Success',
            Result: {
              Description: response.data.description,
              Ref: response.data.ref,
              TransId: response.data.transaction_id,
              EXP: response.data.expired_at
            }
          })
        }
        else {
          return res.status(400).json({
            RespCode: 400,
            RespMessage: 'bad : Something is wrong!',
            Log: 3
          })
        }

        
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          RespCode: 400,
          RespMessage: 'bad : Send otp fail',
          Log: 2
        })
      });

    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : Invalid phone number',
        Log: 1
      })
    }

  }
  catch(error) {
    console.log(error)
    return res.status(400).json({
      RespCode: 400,
      RespMessage: 'bad',
      Log: 0
    })
  }
})

router.post('/verifyotp', (req,res) => {
  var phoneNo = _.get(req, ["body", "phoneNo"]);
  var otp = _.get(req, ["body", "otp"]);
  var TransId = _.get(req, ["body", "TransId"]);

  try {
    otp = String(otp);
    phoneNo = String(phoneNo);
    TransId = String(TransId);
    if(phoneNo.length == 10 && otp.length == 6 && TransId) {
      var data = JSON.stringify({
        "msisdn": phoneNo,
        "otp": otp,
        "transaction_id": TransId
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://havesms.com/api/otp/verify',
        headers: { 
          'Authorization': 'Bearer QLc6nv2Ap1b24tj2a33nWoECcFux1qnc86RGd6z7', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.error == false) {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Success',
            Result: 'Success OTP confirm'
          })
        }
        else {
          return res.status(400).json({
            RespCode: 400,
            RespMessage: 'bad : Something is wrong!',
            Log: 3
          })
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          RespCode: 400,
          RespMessage: 'bad : Send otp fail',
          Log: 2
        })
      });

    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : Invalid request',
        Log: 1
      })
    }

  }
  catch(error) {
    return res.status(400).json({
      RespCode: 400,
      RespMessage: 'bad',
      Log: 0
    })
  }

})

module.exports = router;