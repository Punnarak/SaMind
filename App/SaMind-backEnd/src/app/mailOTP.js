const client = require('./connection.js')
const express = require('express');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const router = express.Router();

router.use(express.json());

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

router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate the email address
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Generate a random OTP
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });

    // Save OTP in the database
    await client.query('INSERT INTO otp_data (email, otp) VALUES ($1, $2)', [email, otp]);

    // Send OTP through email
    await transporter.sendMail({
      from: 'desmotest123@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `<b>Your OTP code is: ${otp}</b>`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Function to validate email address
function isValidEmail(email) {
  // Use a regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      // Check if the OTP matches the one in the database
      const result = await client.query('SELECT * FROM otp_data WHERE email = $1 AND otp = $2', [email, otp]);
      
      if (result.rows.length === 0) {
          return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // Delete the OTP entry from the database after successful verification
      await client.query('DELETE FROM otp_data WHERE email = $1', [email]);
  
      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;