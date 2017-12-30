'use strict';
const nodemailer = require('nodemailer');
const config = require('../config.js');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.smtp.user, // generated ethereal user
        pass: config.smtp.pass  // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: config.mail.from, // sender address
    to: config.mail.testRecipient, // list of receivers
    subject: 'Utopian Weekly', // Subject line
    text: 'Utopian Weekly', // plain text body
    html: '<h1>Utopian Weekly</h1>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
