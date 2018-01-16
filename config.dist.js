const config = {
  apiUrl: 'https://api.utopian.io',
  account: 'guest123',
  wif: 'posting-key-for-steem-account',
  tags: ['utopian-io', 'utopian-weekly', 'opensource'],
  smtp: {
    host: 'host.tld',
    user: 'user',
    pass: 'pass'
  },
  mail: {
    from: 'Utopian.io <weekly@utopian.io>',
    testRecipient: 'test@example.org'
  }
}
module.exports = config
