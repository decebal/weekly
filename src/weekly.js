'use strict';
const nodemailer = require('nodemailer');
const request = require('request');
const args = require('command-line-args');
const fs = require('fs');
const utils = require('./utils');
const steem = require('steem');
const twig = require('twig');
const moment = require('moment');
const utopian = require("utopian-api");
const truncate = require('truncate');
const config = require('../config');

// Command args
const defaults = [
  { name: 'generate', type: Boolean, defaultValue: false },
  { name: 'generate-and-send', type: Boolean, defaultValue: false },
  { name: 'send-generated', type: String, defaultValue: false }
];
const options = args(defaults);

// API endpoints
const projectsUrl = config.apiUrl + '/api/posts/top?limit=3&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD');
const newcomersUrl = config.apiUrl + '/api/posts/top?limit=4&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD') + '&only_new=true';
const contributionsUrl = config.apiUrl + '/api/posts/top?limit=10&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD') + '&retrieve_by=contributions&sort_by=rewards';

// Data
let data = {
  numbering: moment().week() + '/' + moment().year(),
  projects: null,
  newcomers: null,
  contributions: null,
  moderators: null,
  sponsors: null
};

// Data promises
let getProjects = new Promise((yes, no) => {
  request(projectsUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
})

let getNewcomers = new Promise((yes, no) => {
  request(newcomersUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

let getContributions = new Promise((yes, no) => {
  request(contributionsUrl, (err, response, body) => {
    if (err) no(err);
    yes(body);
  });
});

let readGeneratedHtml = new Promise((resolve, reject) => {
  fs.readFile(options['send-generated'] + '.html', (err, template) => {
    if (err) {
      reject(err)
    }
    resolve(template)
  })
})

let readGeneratedMarkdown = new Promise((resolve, reject) => {
  fs.readFile(options['send-generated'] + '.md', (err, template) => {
    if (err) {
      reject(err)
    }
    resolve(template)
  })
})

// Generate (and send)
if (options['generate'] || options['generate-and-send']) {
  Promise.all([
    // load data
    getProjects,
    getNewcomers,
    getContributions,
    utopian.getModerators(),
    utopian.getSponsors()
  ])
    .then(values => {
      data.projects = JSON.parse(values[0]);
      data.newcomers = JSON.parse(values[1]);
      data.contributions = JSON.parse(values[2]);
      data.moderators = values[3].results;
      data.sponsors = values[4].results;


      Promise.all([
        // generate templates with data
        utils.generateTemplate(data, 'html'),
        utils.generateTemplate(data, 'md'),
      ]).then((templates) =>  {
        // save templates to archive
        utils.saveTemplate(templates[0], 'html');
        utils.saveTemplate(templates[1], 'md');

        if (options['generate-and-send']) {
          // utils.publishWeekly(templates[0], templates[1], 'Utopian Weekly - ' + data.numbering, 'utopian-weekly-' + data.numbering.replace('/', '-'))
        }
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    });
}

// Send previouisly generated
if (options['send-generated'] && !options['generate'] && !options['generate-and-send']) {
  Promise.all([
    readGeneratedHtml,
    readGeneratedMarkdown
  ]).then((templates) => {
    // utils.publishWeekly(templates[0], templates[1], 'Utopian Weekly - ' + data.numbering, 'utopian-weekly-' + data.numbering.replace('/', '-'))
  }).catch((err) => {
    console.log(err);
  })
}