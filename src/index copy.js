const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_EMAIL_PASSWORD'
    }
});

exports.reportSnowIssue = functions.https.onRequest((req, res) => {
    const { location, issueType, description } = req.body;

    // Save the report to Firestore
    admin.firestore().collection('reports').add({
        location,
        issueType,
        description,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // Send email notification
        const mailOptions = {
            from: 'YOUR_EMAIL@gmail.com',
            to: 'GOVERNMENT_EMAIL@gmail.com',
            subject: 'Snow Blockage Report',
            text: `Location: ${location}\nIssue Type: ${issueType}\nDescription: ${description}`
        };

        return transporter.sendMail(mailOptions);
    }).then(() => {
        return res.status(200).send('Report submitted and email sent successfully.');
    }).catch(error => {
        return res.status(500).send('Error submitting report or sending email: ' + error);
    });
});
