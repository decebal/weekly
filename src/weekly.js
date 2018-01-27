/* eslint-disable */
'use strict'
const nodemailer = require('nodemailer')
const request = require('request')
const args = require('command-line-args')
const fs = require('fs')
const utils = require('./utils')
const steem = require('steem')
const moment = require('moment')
const utopian = require('utopian-api')
const config = process.env;

// Command args
const defaults = [
  { name: 'generate', type: Boolean, defaultValue: false },
  { name: 'generate-and-send', type: Boolean, defaultValue: false },
  { name: 'send', type: String, defaultValue: false }
]
const options = args(defaults)

// API endpoints
const projectsUrl = config.apiUrl + '/api/posts/top?limit=3&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD')
const newcomersUrl = config.apiUrl + '/api/posts/top?limit=4&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD') + '&only_new=true'
const contributionsUrl = config.apiUrl + '/api/posts/top?limit=10&start_date=' + moment().add(-7, 'days').format('YYYY-MM-DD') + '&end_date=' + moment().format('YYYY-MM-DD') + '&retrieve_by=contributions&sort_by=rewards'

// Data
let data = {
  numbering: moment().week() + '/' + moment().year(),
  projects: null,
  newcomers: null,
  contributions: null,
  moderators: null,
  sponsors: null
}

// Generate (and send)
if (options['generate'] || options['generate-and-send']) {
  // Data promises
  let getProjects = new Promise((yes, no) => {
    request(projectsUrl, (err, response, body) => {
      if (err) no(err)
      yes(body)
    })
  })

  let getNewcomers = new Promise((yes, no) => {
    request(newcomersUrl, (err, response, body) => {
      if (err) no(err)
      yes(body)
    })
  })

  let getContributions = new Promise((yes, no) => {
    request(contributionsUrl, (err, response, body) => {
      if (err) no(err)
      yes(body)
    })
  })

  Promise.all([
    // load data
    getProjects,
    getNewcomers,
    getContributions,
    utopian.getModerators(),
    utopian.getSponsors()
  ])
    .then(values => {
      data.projects = JSON.parse(values[0])
      data.newcomers = JSON.parse(values[1])
      data.contributions = JSON.parse(values[2])
      data.moderators = utils.sortByKey(values[3].results, 'total_paid_rewards_steem', 6)
      data.sponsors = utils.sortByKey(values[4].results, 'vesting_shares', 6)

      Promise.all([
        // generate templates with data
        utils.generateWeeklyTemplate(data, 'html'),
        utils.generateWeeklyTemplate(data, 'md')
      ]).then((templates) => {
        // save templates to archive
        utils.saveWeeklyTemplate(templates[0], 'html')
        utils.saveWeeklyTemplate(templates[1], 'md')

        if (options['generate-and-send']) {
          // utils.publishWeekly(templates[0], templates[1], 'Utopian Weekly - ' + data.numbering, 'utopian-weekly-' + data.numbering.replace('/', '-'))
        }
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
}

// Send previouisly generated
if (options['send'] && !options['generate'] && !options['generate-and-send']) {
  let readGeneratedHtml = new Promise((resolve, reject) => {
    fs.readFile(options['send'] + '.html', (err, template) => {
      if (err) {
        reject(err)
      }
      resolve(template)
    })
  })

  let readGeneratedMarkdown = new Promise((resolve, reject) => {
    fs.readFile(options['send'] + '.md', (err, template) => {
      if (err) {
        reject(err)
      }
      resolve(template)
    })
  })

  Promise.all([
    readGeneratedHtml,
    readGeneratedMarkdown
  ]).then((templates) => {
    // utils.publishWeekly(templates[0], templates[1], 'Utopian Weekly - ' + data.numbering, 'utopian-weekly-' + data.numbering.replace('/', '-'))
  }).catch((err) => {
    console.log(err)
  })
}

process.on('unhandledRejection', function (err, promise) {
  console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').')
})
