const nodemailer = require('nodemailer')
const fs = require('fs')
const steem = require('steem')
const twig = require('twig')
const moment = require('moment')
const truncate = require('truncate')
const config = require('../config')

const utils = {}

// Twig truncate filter
twig.extendFilter('truncate', (value, length) => {
  return truncate(value, length)
})

// Twig "Special Thanks" function (for moderators and sponsors tables)
twig.extendFunction('specialThanks', function (mode, data) {
  return utils.buildTable(mode, data)
})

utils.generateWeeklyTemplate = (data, ext) => {
  return new Promise((resolve, reject) => {
    twig.renderFile('./templates/weekly.' + ext, {data}, (err, template) => {
      if (err) {
        reject(err)
      }

      resolve(template)
    })
  })
}

utils.saveWeeklyTemplate = (template, ext) => {
  // save file
  let filename = './static/archive/utopian-weekly-' + moment().add(-7, 'days').format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD') + '.' + ext
  fs.writeFile(filename, template, function (err) {
    if (err) {
      console.log(err)
    }
    console.log('Template saved! (' + filename + ')')
  })
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
  })

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
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
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
      console.log(err, result)
    }
  )
}

utils.sortByKey = (array, key, limit) => {
  return array.sort(function (a, b) {
    let x = a[key]
    let y = b[key]
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  }).reverse().slice(0, limit)
}

utils.getModeratorRow = (moderator) => {
  return '<td style="padding: 20px 0; background: #555555; vertical-align: top;"><center><img src="https://utopian.plus/avatar/' + moderator.account + '.png?round=true&size=50" style="border-radius:50%;"><br /><a style="color: #ffffff; font-size: 14px;" target="_blank" href="//utopian.io/@' + moderator.account + '">@' + moderator.account + '</a></center></td>'
}

utils.getSponsorRow = (sponsor) => {
  let row = '<td style="padding: 20px 0; background: #555555; vertical-align: top;"><center><img src="https://utopian.plus/avatar/' + sponsor.account + '.png?round=true&size=50" style="border-radius:50%;"><br /><a style="color: #ffffff; font-size: 14px;" target="_blank" href="//utopian.io/@' + sponsor.account + '">@' + sponsor.account + '</a>'
  if (sponsor.is_witness) {
    row = row + '<br><div style="font-size: 11px;"><a style="color: #ffffff;" target="_blank" href="//v2.steemconnect.com/sign/account-witness-vote?witness=' + sponsor.account + '&approve=1">Vote Witness</a></div>'
  }
  row = row + '</center></td>'
  return row
}

utils.buildTable = (mode, data) => {
  let table = '<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 400px; font-family: sans-serif; color: #888888; line-height:18px;"><tr><td><img src="https://ipfs.io/ipfs/QmYzx9c14NJu29T88k4P2di51Fn6Jq7kYzqNa4V5meB4HN" alt="" /></td><td><img src="https://ipfs.io/ipfs/QmYzx9c14NJu29T88k4P2di51Fn6Jq7kYzqNa4V5meB4HN" alt="" /></td></tr><tr>'

  if (mode === 'moderator') {
    for (i = 0; i < data.length; i++) {
      if (i && i % 2 === 0) {
        table = table + '</tr><tr>'
      }
      table = table + utils.getModeratorRow(data[i])
    }
  } else {
    for (i = 0; i < data.length; i++) {
      if (i && i % 2 === 0) {
        table = table + '</tr><tr>'
      }
      table = table + utils.getSponsorRow(data[i])
    }
  }

  if (table.substr(table.length - 5) !== '</tr>') {
    table = table + '</tr>'
  }

  table = table + '</table>'

  return table
}

module.exports = utils
