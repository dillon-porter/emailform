const couponCode = require('coupon-code');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

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

    // Configure the email details
    const mailOptions = {
        from: process.env.EMAIL_USER, // Use the environment variable for sender email
        to: process.env.EMAIL_USER, // Use the environment variable for recipient email
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