'use strict';
const nodemailer = require('nodemailer');
const request = require('request');
const fs = require('fs');
const steem = require('steem');
const twig = require('twig');
const moment = require('moment');
const truncate = require('truncate');
const config = require('../config');

twig.extendFilter("truncate", (value, length) => {
  return truncate(value, length);
});

// API endpoints
const projectsUrl = config.apiUrl + '/api/posts/top?limit=3&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD');
const newcomersUrl = config.apiUrl + '/api/posts/top?limit=4&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD') + '&only_new=true';
const contributionsUrl = config.apiUrl + '/api/posts/top?limit=10&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD') + '&retrieve_by=contributions&sort_by=rewards';
const moderatorUrl = config.apiUrl + '/api/moderators';
const sponsorUrl = config.apiUrl + '/api/sponsors';

let p1 = new Promise((yes, no) => {
  request(projectsUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
})

let p2 = new Promise((yes, no) => {
  request(newcomersUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

let p3 = new Promise((yes, no) => {
  request(contributionsUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

let p4 = new Promise((yes, no) => {
  request(moderatorUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

let p5 = new Promise((yes, no) => {
  request(sponsorUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});


let data = {
  numbering: moment().week() + '/' + moment().year(),
  projects: null,
  newcomers: null,
  contributions: null,
  moderators: null,
  sponsors: null
};

Promise.all([p1, p2, p3, p4, p5])
.then(values => {
  data.projects = JSON.parse(values[0]);
  data.newcomers = JSON.parse(values[1]);
  data.contributions = JSON.parse(values[2]);
  data.moderators = JSON.parse(values[3]).results;
  data.sponsors = JSON.parse(values[4]).results;

  console.log(data.contributions);

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
  twig.renderFile('./src/template.html', {data}, (err, template) => {
    if (err) {
      throw err;
    }

    // save template
    saveTemplate(template, 'html');

    if (!config.generateOnly) {
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
    }
  });

  // read markdown template
  twig.renderFile('./src/template.md', {data}, (err, template) => {
    if (err) {
      throw err;
    }

    // save template
    saveTemplate(template, 'md');

    // post on steemit.com
    if (!config.generateOnly) {
      let permlink = 'utopian-weekly-' + data.numbering.replace('/', '-');

      // steem.broadcast.comment(
      //   config.wif,
      //   '', // Parent Author
      //   '', // Parent Permlink
      //   'guest123', // Author
      //   permlink, // Permlink
      //   'Utopian Weekly - ' + data.numbering, // Title
      //   template, // Body,
      //   {tags: ['test'], app: 'steemjs/utopianweekly'}, // Json Metadata
      //   (err, result) => {
      //     console.log(err, result);
      //   }
      // );
    }
  });

});

// fill template with data and save static file
function saveTemplate(template, ext) {
  // save file
  let filename = './static/archive/utopian-weekly-' + moment().add(-7, 'days').format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD') + '.' + ext;
  fs.writeFile(filename, template, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Template saved! (' + filename + ')');
  });
}
