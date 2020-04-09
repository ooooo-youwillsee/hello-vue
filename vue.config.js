const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  devServer: {
    port: 8090,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/apis': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/apis': '' }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.
      alias.set('@learn', resolve('./src/pages/learn')).set('@bug', resolve('src/pages/bug'))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    let plugins = []
    plugins.push(new PrerenderSPAPlugin({
      staticDir: resolve('dist'),
      routes: ['/', '/demo/','/demo/2', '/learn-mytable'],
      // routes: [ '/demo/'],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },
      renderer: new Renderer({
        // injectProperty: '__PRERENDER_INJECTED__',
        // inject: 'prerender',
        // maxConcurrentRoutes: 4,
        renderAfterTime: 10000,
        headless: true,
        renderAfterDocumentEvent: 'render-event'
      })
    }))
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
  }
}
