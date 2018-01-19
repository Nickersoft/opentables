const merge = require('webpack-merge');
const local = require('./server.common.config');

module.exports = merge(local, {
  output: {
    filename: 'server.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader'
      }
    ]
  }
});
