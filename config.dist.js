var config = {
  apiUrl: 'https://api.utopian.io',
  wif: 'posting-key-for-steem-account',
  smtp: {
    host: 'host.tld',
    user: 'user',
    pass: 'pass'
  },
  mail: {
    from: 'Utopian.io <weekly@utopian.io>',
    testRecipient: 'test@example.org'
  },
  generateOnly: true
}
module.exports = config
