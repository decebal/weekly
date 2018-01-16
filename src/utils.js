const nodemailer = require('nodemailer');
const fs = require('fs');
const steem = require('steem');
const twig = require('twig');
const moment = require('moment');
const truncate = require('truncate');
const config = require('../config');

const utils = {}

// Twig truncate filter
twig.extendFilter("truncate", (value, length) => {
  return truncate(value, length);
});

utils.generateTemplate = (data, ext) => {
  return new Promise((resolve, reject) => {
    twig.renderFile('./src/template.' + ext, {data}, (err, template) => {
      if (err) {
        reject(err)
      }

      resolve(template)
    });
  })
}

utils.saveTemplate = (template, ext) => {
  // save file
  let filename = './static/archive/utopian-weekly-' + moment().add(-7, 'days').format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD') + '.' + ext;
  fs.writeFile(filename, template, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Template saved! (' + filename + ')');
  });
}

utils.publishWeekly = (html, markdown, subject, permlink) => {
  // create default SMTP transporter
  let mailer = nodemailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });

  // mail setup
  const mailOptions = {
    from: config.mail.from,
    to: config.mail.testRecipient,
    subject: subject,
    html: html
  }

  // send mail
  mailer.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  })

  // post on steem
  steem.broadcast.comment(
    config.wif,
    '', // Parent Author
    '', // Parent Permlink
    config.account, // Author
    permlink, // Permlink
    subject, // Title
    markdown, // Body,
    {tags: config.tags, app: 'steemjs/utopianweekly'}, // Json Metadata
    (err, result) => {
      console.log(err, result);
    }
  );
}

module.exports = utils
