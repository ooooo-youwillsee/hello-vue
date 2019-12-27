const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@learn', resolve('./src/pages/learn')).set('@bug', resolve('src/pages/bug'))
  }
}
