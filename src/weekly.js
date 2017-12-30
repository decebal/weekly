'use strict';
const nodemailer = require('nodemailer');
const request = require('request');
const config = require('../config.js');

// date settings
let startDate = new Date();
startDate.setDate(startDate.getDate() - 7); // one week ago
startDate = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate();
let endDate = new Date();
endDate = endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate();

// API endpoints
const projectsUrl = config.api.url + '/api/posts/top?limit=3&start_date=' + startDate + '1&end_date=' + endDate + '&include_rewards=true&only_new=true';
const contributionsUrl = config.api.url + '/api/posts/top?limit=3&start_date=' + startDate + '1&end_date=' + endDate + '&include_rewards=true&only_new=true';

// get utopian projects/contributions
request({url: projectsUrl, headers: {'session': config.api.accessToken}}, (err, response, body) => {
  console.log(body);
});

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
