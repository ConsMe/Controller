// vue.config.js
module.exports = {
  devServer: {
    proxy: 'http://10.8.0.22/',
  },

  // configureWebpack: {
  //   externals: {
  //     axios: 'axios',
  //     moment: 'moment',
  //     VTooltip: 'VTooltip',
  //   },
  // },

  // publicPath: '/dist',
  // indexPath: 'function.html',
  outputDir: 'dist',
  productionSourceMap: false,
  pages: {
    function: {
      entry: './src/pages/Function/main.js',
      template: 'public/function.html',
      title: 'Function',
      // chunks: ['chunk-vendors', 'chunk-common', 'function'],
    },
    home: {
      entry: './src/pages/Home/main.js',
      template: 'public/home.html',
      title: 'Home',
      // chunks: ['chunk-vendors', 'chunk-common', 'function'],
    },
    panel: {
      entry: './src/pages/Panel/main.js',
      template: 'public/panel.html',
      title: 'Panel',
      // chunks: ['chunk-vendors', 'chunk-common', 'function'],
    },
  },
};
