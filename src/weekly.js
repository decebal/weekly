'use strict';
const nodemailer = require('nodemailer');
const request = require('request');
const fs = require('fs');
const steem = require('steem');
const twig = require('twig');
const moment = require('moment');
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
  numbering: moment().week() + '/' + moment().year(),
  projects: null,
  newcomers: null,
  contributions: null,
  moderators: null,
  sponsors: null
};

let getData = new Promise((yes, no) => {
  request(projectsUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

getData.then((projects) => {
  data.projects = JSON.parse(projects)
  request(newcomersUrl, (err, response, body) => {
    if (err) console.log(err);
    return body;
  });
});

getData.then((newcomers) => {
  data.newcomers = JSON.parse(newcomers)
  request(contributionsUrl, (err, response, body) => {
    if (err) console.log(err);
    return body;
  });
});

getData.then((contributions) => {
  data.contributions = JSON.parse(contributions)

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

  getModerators().then((moderators) => {
    data.moderators = moderators;
    getSponsors().then((sponsors) => {
      data.sponsors = sponsors;
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

          steem.broadcast.comment(
            config.wif,
            '', // Parent Author
            '', // Parent Permlink
            'guest123', // Author
            permlink, // Permlink
            'Utopian Weekly - ' + data.numbering, // Title
            template, // Body,
            {tags: ['test'], app: 'steemjs/utopianweekly'}, // Json Metadata
            (err, result) => {
              console.log(err, result);
            }
          );
        }
      });
    });
  });
});

// fill template with data and save static file
function saveTemplate(template, ext) {
  // save file
  let filename = './static/archive/utopian-weekly-' + startDate + '-' + endDate + '.' + ext;
  fs.writeFile(filename, template, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('Template saved! (' + filename + ')');
  });
}

function getModerators() {
    return new Promise((yes, no) => {
        request(config.apiUrl + '/api/moderators', (err, res, body) => {
            if (err) no(err);
            yes(JSON.parse(body));
        })
    }).then((response) => {
        let mods = [];
        response.results.forEach((mod) => {
            mods.push(mod.account);
        });
        return mods;
    })
}

function getSponsors() {
    return new Promise((yes, no) => {
        request(config.apiUrl + '/api/sponsors', (err, res, body) => {
            if (err) no(err);
            yes(JSON.parse(body));
        })
    }).then((response) => {
        let sponsors = [];
        response.results.forEach((sponsor) => {
            sponsors.push(sponsor.account);
        });
        return sponsors;
    })
}
