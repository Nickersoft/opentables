const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const local = require('./client.common.config');

module.exports = merge(local, {
  entry: ['babel-polyfill', path.join(__dirname, '../../src/client/client.jsx')],
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, '../../dist/public')
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('styles.min.css'),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  resolve: {
    alias: {
      'alg-assets': path.resolve(__dirname, '../../src/client/assets')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')()]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name]-[hash].[ext]'
        }
      }
    ]
  }
});
