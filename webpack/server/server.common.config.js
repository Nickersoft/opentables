const path = require('path');
const merge = require('webpack-merge');
const common = require('../common.config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  entry: './src/server/server.js',
  output: {
    path: path.join(__dirname, '../../dist'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'alg-assets': path.resolve(__dirname, '../../src/client/assets'),
      'alg-components': path.resolve(__dirname, '../../src/client/components'),
      'alg-containers': path.resolve(__dirname, '../../src/client/containers'),
      'alg-config': path.resolve(__dirname, '../../src/client/config.js')
    },
    extensions: ['.js', '.jsx']
  },
  node: {
    process: false,
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/server/views',
        to: 'views'
      },
      {
        from: 'src/client/favicon.ico',
        to: 'public/favicon.ico'
      }
    ])
  ],
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'isomorphic-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
});
