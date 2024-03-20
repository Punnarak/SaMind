const client = require("./connection.js");
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

const cookie = require('cookie');

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

// router.post("/login", jsonParser, async function (req, res, next) {
//   const email = req.body.email;
//   const password = req.body.password;

//   const query = {
//     text: "SELECT * FROM therapist WHERE email = $1",
//     values: [email],
//   };

//   try {
//     const result = await client.query(query);

//     if (result.rows.length === 0) {
//       return res.json({ status: "error", message: "No user found" });
//     }

//     const hashedPassword = result.rows[0].password;

//     // Use bcrypt.compare to check if the provided password matches the hashed password
//     const isLogin = await bcrypt.compare(password, hashedPassword);

//     if (isLogin) {
//       const { id, email, patient_id } = result.rows[0];
//       const token = jwt.sign({ id, email, patient_id }, secret, {
//         expiresIn: "1h",
//       });

//       return res
//         .cookie("access_token", token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//         })
//         .status(200)
//         .json({ status: "ok", message: "Login success", user: result.rows[0] });
//     } else {
//       return res.json({ status: "error", message: "Login failed" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.json({
//       status: "error",
//       message: "An error occurred during login",
//     });
//   }
// });

// api can use in firefox
router.post("/login", jsonParser, async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const query = {
    text: "SELECT * FROM therapist WHERE email = $1",
    values: [email],
  };

  try {
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return res.json({ status: "error", message: "No user found" });
    }

    const therapist = result.rows[0];
    const hashedPassword = therapist.password;

    // Use bcrypt.compare to check if the provided password matches the hashed password
    const isLogin = await bcrypt.compare(password, hashedPassword);

    if (isLogin) {
      const { therapist_id, fname, lname, phone, email, hospital_name, admin } = therapist;
      const role = admin === 'Y' ? 'admin' : 'therapist'; // Check admin column for role

      const token = jwt.sign({ therapist_id, email }, secret, {
        expiresIn: "1h",
      });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ status: "ok", message: "Login success", user: { therapist_id, fname, lname, phone, email, hospital_name, role } });
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

// router.post("/login", jsonParser, async function (req, res, next) {
//   const email = req.body.email;
//   const password = req.body.password;

//   const query = {
//     text: "SELECT * FROM therapist WHERE email = $1",
//     values: [email],
//   };

//   try {
//     const result = await client.query(query);

//     if (result.rows.length === 0) {
//       return res.json({ status: "error", message: "No user found" });
//     }

//     const therapist = result.rows[0];
//     const hashedPassword = therapist.password;

//     // Use bcrypt.compare to check if the provided password matches the hashed password
//     const isLogin = await bcrypt.compare(password, hashedPassword);

//     if (isLogin) {
//       const { therapist_id, fname, lname, phone, email, hospital_name, admin } = therapist;
//       const role = admin === 'Y' ? 'admin' : 'therapist'; // Check admin column for role

//       const token = jwt.sign({ therapist_id, email }, secret, {
//         expiresIn: "1h",
//       });

//       // Set SameSite=None and Secure attributes for the cookie
//       res.setHeader('Set-Cookie', cookie.serialize('access_token', token, {
//         httpOnly: true,
//         secure: true, // Set this to true if you are using HTTPS
//         sameSite: 'None', // Set SameSite=None
//       }));

//       return res.status(200).json({ status: "ok", message: "Login success", user: { therapist_id, fname, lname, phone, email, hospital_name, role } });
//     } else {
//       return res.json({ status: "error", message: "Login failed" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.json({
//       status: "error",
//       message: "An error occurred during login",
//     });
//   }
// });

// router.post("/refreshToken", (req, res) => {
//   const refreshToken = req.cookies["access_token"];
//   if (!refreshToken) {
//     return res.status(401).send("Access Denied. No refresh token provided.");
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, secret);
//     const accessToken = jwt.sign(
//       {
//         users_id: decoded.users_id,
//         email: decoded.email,
//         patient_id: decoded.patient_id,
//         hospital_name: decoded.hospital_name,
//       },
//       secret,
//       {
//         expiresIn: "1h",
//       }
//     );

//     res
//       .cookie("access_token", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       })
//       .send(decoded.user);
//   } catch (error) {
//     return res.status(400).send("Invalid refresh token.");
//   }
// });

router.post("/refreshToken", async (req, res) => {
  const refreshToken = req.cookies["access_token"];
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, secret);

    // Retrieve user information from the database based on the decoded JWT token
    const query = {
      text: "SELECT * FROM therapist WHERE therapist_id = $1",
      values: [decoded.therapist_id],
    };
    const result = await client.query(query);
    const therapist = result.rows[0];

    // Generate a new access token with updated user information
    const { therapist_id, fname, lname, phone, email, hospital_name, admin } = therapist;
    const role = admin === 'Y' ? 'admin' : 'therapist'; // Check admin column for role
    const accessToken = jwt.sign({ therapist_id, email }, secret, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ therapist_id, fname, lname, phone, email, hospital_name, role }); // Send updated user information in the response
  } catch (error) {
    return res.status(400).send("Invalid refresh token.");
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

module.exports = router;