/**
 * Hotloading Middleware
 * =====================
 * Hot loads React components using Webpack middleware
 * Only available in the development environment
 *
 * @returns {*[]}
 */
module.exports = () => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('../../../webpack/client/client.dev.config.js');
  const compiler = webpack(config);

  return [
    // Allows for real-time re-compilation
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    }),
    // Allows for hot-loading components
    webpackHotMiddleware(compiler, {
      log: console.log
    })
  ];
}
