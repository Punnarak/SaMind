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

// app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

client.connect();

router.post('/register',jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;

    const query = {
        text: 'INSERT INTO users (id,email, password, fname, lname) VALUES ($1, $2, $3, $4, $5)',
        values: [id,email, hash, fname, lname]
    };

    client.query(query, function(err, results) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok' });
        });
    });
    client.end;
})


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