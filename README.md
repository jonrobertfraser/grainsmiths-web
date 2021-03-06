# grainsmiths-vue

## Additional packages install installed:

* `$ npm install --save vue-router` // Router
* `$ npm install --save bootstrap-vue` // Lots of things
* `$ npm install --save jquery` // Basic requirement
* `$ npm install --save @fortawesome/fontawesome-svg-core`
* `$ npm install --save @fortawesome/free-solid-svg-icons`
* `$ npm install --save @fortawesome/free-regular-svg-icons`
* `$ npm install --save @fortawesome/vue-fontawesome`
* `$ npm install --save @fortawesome/free-brands-svg-icons`
* `$ npm install --save node-sass sass-loader` // not sure.
* `$ npm install --save axios` // API calls
* `$ npm install --save vue-masonry-css` // Tileview
* `$ npm install --save vue-cool-lightbox` // Lightbox on tileview cards
* `$ npm install --save vue-multiselect` // Species selector
* `$ npm install --save @auth0/auth0-spa-js` // Auth0
* `$ npm install --save vue-cookies` // Capturing cookies
* `$ npm install --save express serve-static` // HTTPS only
* `$ npm install --save vue-drift` // Drift Chat
* `$ npm install --save vue-gtag` // Google analytics
* `$ npm install --save vue-slider-component` // Dimension sliders
* `$ npm install --save vue-meta` // Meta information for sharing
* `$ npm install --save prerender-spa-plugin` // See notes below...
* `$ npm install --save @smartweb/vue-flash-message`
* `$ npm install --save vue-scrollto`

## Pre-rendering

Add the following buildpack to heroku *before* the Node buildpack: https://github.com/jontewks/puppeteer-heroku-buildpack

This in conjunction with prerender-spa-plugin above and settings found in vue.config.js file I am able to pre-render certain pages on the site. The primary purpose is to have the page include pre-rendered meta data that can be extracted by sites like Facebook and Twitter when sharing. Those sites do *not* render javascript so basically they get a blank site when they get a link posted on there.

tl;dr Without pre-rendering "view source" will be essentially blank. With pre-rendering you have a bunch of content that can be extracted by bots.


## Deploying Vue via command line

Set up the Heroku remotes by issuing the following command:

* `$ heroku git:remote -a grainsmiths-web-staging -r staging`
* `$ heroku git:remote -a grainsmiths-web -r production`

Deploy on Heroku by issuing the following:

* `$ git push staging master`
* `$ git push production master`


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
