'use strict';
const nodemailer = require('nodemailer');
const request = require('request');
const fs = require('fs');
const steem = require('steem');
const config = require('../config');

// date settings
let startDate = new Date();
startDate.setDate(startDate.getDate() - 7); // one week ago
startDate = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate();
let endDate = new Date();
endDate = endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate();

// API endpoints
const projectsUrl = config.apiUrl + '/api/posts/top?limit=3&start_date=' + startDate + '&end_date=' + endDate;
const newcomersUrl = config.apiUrl + '/api/posts/top?limit=3&start_date=' + startDate + '&end_date=' + endDate + '&only_new=true';
const contributionsUrl = config.apiUrl + '/api/posts/top?limit=3&start_date=' + startDate + '&end_date=' + endDate + '&retrieve_by=contributions';

// get utopian projects/contributions
let data = {
  projects: null,
  newcomers: null,
  contributions: null
};

let getData = new Promise((yes, no) => {
  request(projectsUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

getData.then((projects) => {
  data.projects = projects
  request(newcomersUrl, (err, response, body) => {
    if (err) console.log(err);
    return body;
  });
});

getData.then((newcomers) => {
  data.newcomers = newcomers
  request(contributionsUrl, (err, response, body) => {
    if (err) console.log(err);
    return body;
  });
});

getData.then((contributions) => {
  data.contributions = contributions

  // create reusable transporter object using the default SMTP transport
  let mailer = nodemailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });

  // read html template
  fs.readFile('./src/template.html', 'utf-8', function read(err, rawTemplate) {
    if (err) {
      throw err;
    }

    const template = generateAndSaveTemplate('html', rawTemplate, '1/2018', projects, contributions);

    // mail setup
    const mailOptions = {
      from: config.mail.from,
      to: config.mail.testRecipient,
      subject: 'Utopian Weekly',
      text: 'Utopian Weekly',
      html: template
    };

    // send mail
    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  });

  // read markdown template
  fs.readFile('./src/template.md', 'utf-8', function read(err, rawTemplate) {
    if (err) {
        throw err;
    }

    const template = generateAndSaveTemplate('md', rawTemplate, '1/2018', projects, contributions);

    // post on steemit.com
    var permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();

    steem.broadcast.comment(
      config.wif,
      'mkt', // Parent Author
      'steemline-beta-typescript-and-steemconnect-integration-maintainer-wanted-50-steem', // Parent Permlink
      'guest123', // Author
      permlink, // Permlink
      'Utopian Weekly', // Title
      template, // Body,
      {tags: ['test'], app: 'steemjs/utopianweekly'}, // Json Metadata
      (err, result) => {
          console.log(err, result);
      }
    );
  });
});

// fill template with data and save static file
function generateAndSaveTemplate(ext, content, number, projects, contributions) {
  // replace placeholders
  content = content.replace('${NUMBERING}', number);

  // save file
  let filename = './static/archive/utopian-weekly-' + startDate + '-' + endDate + '.' + ext;
  fs.writeFile(filename, content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('Template saved! (' + filename + ')');
  });

  return content;
}
