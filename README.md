# Utopian Weekly

> Generator for the Utopian Weekly and other Utopian posts.

## Install

```
clone https://github.com/utopian-io/utopian-weekly.git
cd utopian-weekly
npm install
```

## Config

You have to create a `config.js` to store some config parameters. Copy `config.dist.js`, rename and edit it.

```
cp config.dist.js config.js
vim|nano|whatever config.js
```

### Parameters

The API from where to pull data:<br>
`apiUrl: 'https://api.utopian.io'`

The account on which behalf a steem post will be published:<br>
`account: 'guest123'`

The WIF for the account:<br>
`wif: 'posting-key-for-steem-account',`

Tags for the steem post:<br>
`tags: ['utopian-io', 'utopian-weekly', 'opensource'],`

SMTP settings for email newsletter:
```
smtp:
  host: 'host.tld',
  user: 'user',
  pass: 'pass'
```

Email settings:
```
mail:
  from: 'Utopian.io <weekly@utopian.io>',
  testRecipient: 'test@example.org'
```

## Usage

Generate weekly templates to `static/archive/utopian-weekly-yyyy-mm-dd.(html|md)`:

`node src/weekly --generate`

Generate weekly templates to `static/archive/utopian-weekly-yyyy-mm-dd.(html|md)`, send email newsletter and publish post:

`node src/weekly --generate-and-send`

Send email newsletter and publish post based on formerly generated weekly templates:

`node src/weekly --send-generated static/archive/utopian-weekly-yyyy-mm-dd`

Generate post template to `static/archive/post-latest.md`:

`node src/post`

# TODO

- implement mail subscribers
- update templates
- UI to edit templates
- UI for archive
- unsubscribe link for newsletter
- fix github api limits
