var path = require('path')
var webpack = require('webpack')
// Add these
const PrerenderSPAPlugin = require('prerender-spa-plugin')
// Renders headlessly in a downloaded version of Chromium through puppeteer
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer


module.exports = {
    devServer: {
        port: 8081
    },
    pages: {
      index: {
        entry: 'src/main.js',
        title: 'Grainsmiths'
      }
    },
}

if (process.env.VUE_APP_ENVIRONMENT != 'DEVELOPMENT') {
  module.exports['configureWebpack']= {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist/'), // The path to the folder where index.html is.
        routes: ['/'], // List of routes to prerender.
        renderer: new PuppeteerRenderer()
      })
    ]
  }
}