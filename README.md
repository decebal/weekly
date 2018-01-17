# Utopian Weekly

> The automated Utopian Weekly newsletter

```
clone https://github.com/utopian-io/utopian-weekly.git
cd utopian-weekly
npm install
cp config.dist.js config.js
vim config.js # edit config parameters
```

Generate templates to `static/archive/utopian-weekly-yyyy-mm-dd.(html|md)`:

`node src/weekly --generate`

Generate templates to `static/archive/utopian-weekly-yyyy-mm-dd.(html|md)`, send email newsletter and publish post:

`node src/weekly --generate-and-send`

Send email newsletter and publish post based on generated templates:

`node src/weekly --send-generated static/archive/utopian-weekly-yyyy-mm-dd`

## Build Setup (for the frontend that has still to be built)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Generate Post Template
``` bash
# Run:
node src/postTemplate
# Output will be saved to ./static/archive/postTemplate.md
```

# TODO

- implement mail subscribers
- update templates
- UI to edit templates
- UI for archive
- unsubscribe link for newsletter
- fix github api limits
