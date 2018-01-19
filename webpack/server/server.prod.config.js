const webpack = require('webpack');
const merge = require('webpack-merge');
const local = require('./server.common.config');

module.exports = merge(local, {
  output: {
    filename: 'server.min.js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'public/assets/images/[name]-[hash].[ext]',
          publicPath: url => url.replace(/public/, '')
        }
      }
    ]
  }
});
