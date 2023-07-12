const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const couponCode = require('coupon-code'); // Import the coupon-code package
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', (req, res) => {
    const { name, email } = req.body;

    // Generate a random coupon code
    const generatedCouponCode = couponCode.generate();

    // Create a Nodemailer transporter using your email account credentials
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL_USER, // Use the environment variable for email user
            pass: process.env.EMAIL_PASSWORD // Use the environment variable for email password
        }
    });

    // Configure the email details with the coupon code
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Subscription',
        text: `A new user subscribed to BarkerBox:\nName: ${name}\nEmail: ${email}\nCoupon Code: ${generatedCouponCode}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});