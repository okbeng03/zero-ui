const util = require('./examples/build/util')

module.exports = {
  pages: util.getEntries('./examples/src/pages/*/index.js'),
  filenameHashing: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '8086'
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', process.cwd())
      .set('vue$', 'vue/dist/vue.esm.js')
  }
}
