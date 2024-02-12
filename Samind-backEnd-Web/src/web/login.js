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

module.exports = router;