const client = require('./connection.js')

var express = require('express')
var cors = require('cors')
var app = express()

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const bcrypt = require('bcrypt')
const saltRounds = 10
var jwt = require('jsonwebtoken');
const secret = 'YmFja0VuZC1Mb2dpbi1TYU1pbmQ=' //backEnd-Login-SaMind encode by base64

app.use(cors())

client.connect();

// app.get('/users', (req, res)=>{
//     client.query(`Select * from users`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })


// app.get('/users/:id', (req, res)=>{
//     client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })

// app.post('/users', (req, res)=> {
//     const user = req.body;
//     console.log(user)
//     let insertQuery = `insert into users(id, email, password, fname, lname) 
//                        values(${user.id},'${user.email}', '${user.password}', '${user.fname}', '${user.lname}')`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Insertion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })



/*********************************************************************************/

app.post('/register',jsonParser, function (req, res, next) {
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

  function validateForm() {
    let x = document.forms["form"]["email"].value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (x == "") {
      alert("Email must be filled out");
      
      return false;
    } else if (re.test(String(x).toLowerCase()) == false) {
      alert("Email must be valid");
    
      return false;
    }
    return true;
  }
  
  app.post('/login', authenticate, jsonParser, function (req, res, next) {
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


app.post('/authen',jsonParser, function (req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded})
    } catch(err){
        res.json({status: 'error', message: err.message})
    }
    client.end;
})


app.listen(4343, function () {
  console.log('CORS-enabled web server listening on port 4343')
})





