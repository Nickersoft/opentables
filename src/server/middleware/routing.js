/**
 * Routing Middleware
 * ==================
 * Routes all traffic to the index page of the main app
 *
 * @returns {function(*, *)}
 */
module.exports = () => {
  const React = require('react');
  const ReactServer = require('react-dom/server');
  const isDev = require('isdev');

  const app = require('../../client/containers/App/App.jsx').default;

  return (req, res) =>
    res.status(200).render('index', {
      prod: !isDev,
      root: ReactServer.renderToString(React.createElement(app, null, null))
    });
};
