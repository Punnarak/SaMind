const client = require("./connection.js");
const validateForm = require("./function.js");

const express = require("express");
const router = express.Router();

const _ = require("lodash");
const axios = require("axios");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const bcrypt = require("bcrypt");
// const saltRounds = 10
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = require("./auth.js").secret;
const auth = require("./auth.js").authorization;

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

client.connect();

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

function isValidEmail(email) {
  // Use a regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * @swagger
 * /register-with-otp:
 *   post:
 *     summary: Register a user with OTP verification
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               patient_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Registration initiated. Please verify OTP to complete registration.
 *         content:
 *           application/json:
 *             example:
 *               message: Registration initiated. Please verify OTP to complete registration.
 *       '400':
 *         description: Invalid email address or email already in use
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid email address or email already in use
 *       '500':
 *         description: An error occurred during registration initiation
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred during registration initiation
 */

// router.post("/register-with-otp", jsonParser, async (req, res) => {
//   try {
//     const { users_id, email, password, patient_id } = req.body;

//     // Validate the email address
//     if (!isValidEmail(email)) {
//       return res.status(400).json({ message: "Invalid email address" });
//     }

//     // Check if the email already exists in the database
//     const emailCheckQuery = {
//       text: "SELECT * FROM users WHERE email = $1",
//       values: [email],
//     };

//     const emailCheckResult = await client.query(emailCheckQuery);

//     if (emailCheckResult.rows.length > 0) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Generate a random OTP
//     const otp = randomstring.generate({ length: 6, charset: "numeric" });

//     // Hash the user's password
//     const hash = await bcrypt.hash(password, saltRounds);

//     // Start a database transaction
//     // const client = await client.connect();
//     try {
//       // Save user details in the database within a transaction
//       await client.query("BEGIN");

//       const registrationQuery = {
//         text: "INSERT INTO users (id, email, password, patient_id, verify_user) VALUES ($1, $2, $3, $4, $5)",
//         values: [id, email, hash, patient_id, "N"],
//       };
//       await client.query(registrationQuery);

//       await client.query("INSERT INTO otp_data (email, otp) VALUES ($1, $2)", [
//         email,
//         otp,
//       ]);

//       // Commit the transaction
//       await client.query("COMMIT");

//       // Send OTP through email
//       await transporter.sendMail({
//         from: "desmotest123@gmail.com",
//         to: email,
//         subject: "Your OTP Code",
//         text: `Your OTP code is: ${otp}`,
//         html: `<b>Your OTP code is: ${otp}</b>`,
//       });

//       res.status(200).json({
//         message:
//           "Registration initiated. Please verify OTP to complete registration.",
//       });
//     } catch (error) {
//       // Rollback the transaction in case of an error
//       await client.query("ROLLBACK");
//       console.error("Error initiating registration and sending OTP:", error);
//       res.status(500).json({ message: "An error occurred" });
//     } finally {
//       // Release the database connection
//       // client.release();
//     }
//   } catch (error) {
//     console.error("Error during registration initiation:", error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

router.post("/register-with-otp", jsonParser, async (req, res) => {
  try {
    const { email, password, patient_id } = req.body;

    // Validate the email address
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if the email already exists in the database
    const emailCheckQuery = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const emailCheckResult = await client.query(emailCheckQuery);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Generate a random OTP
    const otp = randomstring.generate({ length: 6, charset: "numeric" });

    // Hash the user's password
    const hash = await bcrypt.hash(password, saltRounds);

    // Start a database transaction
    try {
      // Save user details in the database within a transaction
      await client.query("BEGIN");

      // Generate the next value for users_id
      const generateUserIdQuery = 'SELECT NEXTVAL(\'users_id_seq\') AS users_id';
      const userIdResult = await client.query(generateUserIdQuery);
      const users_id = userIdResult.rows[0].users_id;

      const registrationQuery = {
        text: "INSERT INTO users (users_id, email, password, patient_id, verify_user) VALUES ($1, $2, $3, $4, $5)",
        values: [users_id, email, hash, patient_id, "N"],
      };
      
      await client.query(registrationQuery);

      await client.query("INSERT INTO otp_data (email, otp) VALUES ($1, $2)", [
        email,
        otp,
      ]);

      // Commit the transaction
      await client.query("COMMIT");

      // Send OTP through email
      await transporter.sendMail({
        from: "desmotest123@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
        html: `<b>Your OTP code is: ${otp}</b>`,
      });

      res.status(200).json({
        message:
          "Registration initiated. Please verify OTP to complete registration.",
        users_id: users_id, // Include the generated users_id in the response if needed
      });
    } catch (error) {
      // Rollback the transaction in case of an error
      await client.query("ROLLBACK");
      console.error("Error initiating registration and sending OTP:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } catch (error) {
    console.error("Error during registration initiation:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});


const verifyOtp = async (req, res) => {
  const { id, email, otp } = req.body;

  try {
    const result = await client.query(
      "SELECT * FROM otp_data WHERE email = $1 AND otp = $2",
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await client.query("BEGIN");

    const registrationQuery = {
      text: "UPDATE users SET verify_user = $1 WHERE email = $2",
      values: ["Y", email],
    };

    await client.query(registrationQuery);

    await client.query("COMMIT");

    await client.query("DELETE FROM otp_data WHERE email = $1", [email]);

    res
      .status(200)
      .json({ message: "OTP verified successfully. Registration completed." });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error during OTP verification and user registration:",
      error
    );
    res.status(500).json({ message: "An error occurred" });
  }
};

router.post("/verify-otp-register", verifyOtp);

/**
 * @swagger
 * /reset_password:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               patient_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Reset password successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Reset password successfully
 *       '400':
 *         description: Invalid email address
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid email address
 *       '500':
 *         description: An error occurred while resetting the password
 *         content:
 *           application/json:
 *             example:
 *               error: An error occurred while resetting the password
 */
router.post("/reset_password", async (req, res) => {
  try {
    const { id, email, password, patient_id } = req.body;

    // Validate the email address
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Hash the new password
    const hash = await bcrypt.hash(password, saltRounds);

    // Update user profile in the database with the hashed password
    client.query(
      "UPDATE users SET email=$2, password=$3, patient_id=$4 WHERE id=$1",
      [id, email, hash, patient_id], // Use the hashed password
      (error, results) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while reset password" });
        } else {
          res.json({ message: "Reset password successfully" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

function authenticate(req, res, next) {
  // ตรวจสอบการยืนยันตัวตนที่นี่
  // ตัวอย่างเช่นตรวจสอบค่า Authorization ใน req.headers หรือตรวจสอบการตรวจสอบเซสชัน

  // หากผ่านการยืนยันตัวตน
  next();
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and get a token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             example:
 *               status: ok
 *               message: login success
 *               token: <JWT_TOKEN>
 *               fname: John
 *       '400':
 *         description: Bad request, missing or invalid parameters
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Bad request, missing or invalid parameters
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid credentials
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Internal server error
 */
// router.post('/login', authenticate, jsonParser, function (req, res, next) {
//     const email = req.body.email;
//     const query = {
//       text: 'SELECT * FROM users WHERE email = $1',
//       values: [req.body.email]
//     };

//     client.query(query, function(err, users, fields) {
//       if (err) {
//         res.json({ status: 'error', message: err });
//         return;
//       }
//       if (users.rows.length == 0) {
//         res.json({ status: 'error', message: 'NO user found' });
//         return;
//       }

//       // Retrieve the fname values
//       const fname = users.rows.map(row => row.fname); //add

//       bcrypt.compare(req.body.password, users.rows[0].password, function(err, isLogin) {
//         if (isLogin) {
//           var token = jwt.sign({ email: users.rows[0].email }, secret, { expiresIn: '1h' });
//           res.json({ status: 'ok', message: 'login success', token, fname});
//         } else {
//           res.json({ status: 'error', message: 'login failed' });
//         }
//       });
//     });
//   });

// router.post('/login', jsonParser, async function (req, res, next) {
//   const email = req.body.email;
//   const password = req.body.password;

//   const query = {
//     text: 'SELECT * FROM users WHERE email = $1',
//     values: [email],
//   };

//   try {
//     const result = await client.query(query);

//     if (result.rows.length === 0) {
//       return res.json({ status: 'error', message: 'No user found' });
//     }

//     const hashedPassword = result.rows[0].password;

//     const isLogin = await bcrypt.compare(password, hashedPassword);

//     if (isLogin) {
//       const { id, email, patient_id } = result.rows[0];
//       const token = jwt.sign({ id, email, patient_id }, secret, { expiresIn: '1h' });

//       return res.json({ status: 'ok', message: 'Login success', token, user: result.rows[0] });
//     } else {
//       return res.json({ status: 'error', message: 'Login failed' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.json({ status: 'error', message: 'An error occurred during login' });
//   }
// });

router.post("/login", jsonParser, async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const query = {
    text: "SELECT * FROM users WHERE email = $1 AND verify_user = $2",
    values: [email, "Y"],
  };

  try {
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return res.json({ status: "error", message: "No user found" });
    }

    const hashedPassword = result.rows[0].password;

    // Use bcrypt.compare to check if the provided password matches the hashed password
    const isLogin = await bcrypt.compare(password, hashedPassword);

    if (isLogin) {
      const { id, email, patient_id } = result.rows[0];
      const token = jwt.sign({ id, email, patient_id }, secret, {
        expiresIn: "1h",
      });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ status: "ok", message: "Login success", user: result.rows[0] });
    } else {
      return res.json({ status: "error", message: "Login failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.json({
      status: "error",
      message: "An error occurred during login",
    });
  }
});

router.post("/logout", auth, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

router.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
  client.end;
});

//phone OTP
router.post("/sendotp", (req, res) => {
  var phoneNo = _.get(req, ["body", "phoneNo"]);
  console.log(phoneNo);

  try {
    phoneNo = String(phoneNo);
    if (phoneNo && phoneNo.length == 10) {
      let data = JSON.stringify({
        msisdn: phoneNo,
        sender: "OTP",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://havesms.com/api/otp/send",
        headers: {
          Authorization: "Bearer QLc6nv2Ap1b24tj2a33nWoECcFux1qnc86RGd6z7",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          if (response.data.error == false) {
            return res.status(200).json({
              RespCode: 200,
              RespMessage: "Success",
              Result: {
                Description: response.data.description,
                Ref: response.data.ref,
                TransId: response.data.transaction_id,
                EXP: response.data.expired_at,
              },
            });
          } else {
            return res.status(400).json({
              RespCode: 400,
              RespMessage: "bad : Something is wrong!",
              Log: 3,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({
            RespCode: 400,
            RespMessage: "bad : Send otp fail",
            Log: 2,
          });
        });
    } else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: "bad : Invalid phone number",
        Log: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      RespCode: 400,
      RespMessage: "bad",
      Log: 0,
    });
  }
});

router.post("/verifyotp", (req, res) => {
  var phoneNo = _.get(req, ["body", "phoneNo"]);
  var otp = _.get(req, ["body", "otp"]);
  var TransId = _.get(req, ["body", "TransId"]);

  try {
    otp = String(otp);
    phoneNo = String(phoneNo);
    TransId = String(TransId);
    if (phoneNo.length == 10 && otp.length == 6 && TransId) {
      var data = JSON.stringify({
        msisdn: phoneNo,
        otp: otp,
        transaction_id: TransId,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://havesms.com/api/otp/verify",
        headers: {
          Authorization: "Bearer QLc6nv2Ap1b24tj2a33nWoECcFux1qnc86RGd6z7",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.error == false) {
            return res.status(200).json({
              RespCode: 200,
              RespMessage: "Success",
              Result: "Success OTP confirm",
            });
          } else {
            return res.status(400).json({
              RespCode: 400,
              RespMessage: "bad : Something is wrong!",
              Log: 3,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({
            RespCode: 400,
            RespMessage: "bad : Send otp fail",
            Log: 2,
          });
        });
    } else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: "bad : Invalid request",
        Log: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      RespCode: 400,
      RespMessage: "bad",
      Log: 0,
    });
  }
});

module.exports = router;
