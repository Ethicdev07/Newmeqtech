const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json())



app.post('/register', async (req, res) => {
    const { fullName, address, phone, email, preferredCourse, trainingMode } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

   
    const mailOptions = {
        from: 'newmeqtechnologieslimited@gmail.com',
        to: 'newmeqtechnologieslimited@gmail.com',
        subject: 'New Training Registration',
        text: `
            New Registration Details:
            ---------------------------
            Full Name: ${fullName}
            Address: ${address}
            Phone Number: ${phone}
            Email Address: ${email}
            Preferred Course: ${preferredCourse}
            Training Mode: ${trainingMode}
            ---------------------------
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

