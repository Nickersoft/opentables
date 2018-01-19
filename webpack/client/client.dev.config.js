const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const local = require('./client.common.config');

module.exports = merge(local, {
  entry: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, '../src/client/client.jsx')],
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist/public')
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      'alg-assets': path.resolve(__dirname, '../src/client/assets')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
});
