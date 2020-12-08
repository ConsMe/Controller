// vue.config.js
module.exports = {
  devServer: {
    proxy: 'http://10.8.0.22/',
  },

  configureWebpack: {
    externals: {
      axios: 'axios',
      moment: 'moment',
      VTooltip: 'VTooltip',
    },
  },

  publicPath: '/dist',
  outputDir: 'dist',
  productionSourceMap: false,
};
