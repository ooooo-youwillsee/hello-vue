const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const p = async () => ([
  { path: '/', keywords: 'keywords11111', description: 'xxxx-description',  }
])

const prerenderProcess = (route, html, prerenderConfig) => {
  const pageConfig = prerenderConfig.find(item => item.path === route)
  if (!pageConfig) return html
  return html.replace(/<title>[^<]*<\/title>/i,
    `<title>${process.env.VUE_APP_TITLE}</title><meta name="keywords" content="${pageConfig.keywords}"><meta name="description" content="${pageConfig.description}">`)
}

/**
 * 参考issue https://github.com/vuejs/vue-cli/issues/3328
 */
module.exports = (api, options) => {
  api.registerCommand('build:prerender', async (args) => {
    const PrerenderSPAPlugin = require('prerender-spa-plugin')
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
    const prerenderConfig = await p()
    api.chainWebpack(config => {
      config.resolve.alias
      .set('@learn',resolve('./src/pages/learn'))
      .set('@bug', resolve('src/pages/bug'))

      config.plugin('prerender').use(PrerenderSPAPlugin, [
        {
          staticDir: resolve('dist'),
          routes: prerenderConfig.map(item => item.path),
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
          }),
          postProcess: renderedRoute => {
            renderedRoute.route = renderedRoute.originalRoute
            renderedRoute.html = prerenderProcess(renderedRoute.route, renderedRoute.html, prerenderConfig)
            return renderedRoute
          }
        }])
    })

    await api.service.run('build', args)
  })
}

module.exports.defaultModes = {
  'build:prerender': 'production'
}
