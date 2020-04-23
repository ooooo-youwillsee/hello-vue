const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: 8090,
    overlay: {
      // warnings: true,
      // errors: true
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
    config.resolve.alias
    .set('@learn',resolve('./src/pages/learn'))
    .set('@bug', resolve('src/pages/bug'))

    config.when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )
  }
}
