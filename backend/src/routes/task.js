// backend/src/routes/task.js
const express = require('express');
const nodemailer = require('nodemailer');
const { sendQuery } = require('../api/mysql'); 
const taskRouter = express.Router();

taskRouter.post('/task', async (req, res) => {

  const { email, additionalContent  } = req.body;

// Check if the email exists in the database
try {
    const result = await sendQuery("SELECT email FROM employee_details WHERE email = ?", [email]);

    if (result.length === 0) {
      // Email not registered
      return res.status(404).json({ message: "לא נמצא עובד עם מייל זה" });
    }

    // Configure Nodemailer with the email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'cyberprojectmail@gmail.com',
            pass: 'lgjy kfrp amsy wrrd',
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'cyberprojectmail@gmail.com',
            to: email,
            subject: 'משימה חדשה',
            text: additionalContent,
        };
        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "המשימה נשלחה בהצלחה!" });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json('Internal Server Error');
        }

  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).json('Internal Server Error');
  }

});

module.exports = taskRouter;
