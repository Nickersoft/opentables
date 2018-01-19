/**
 * Compression Middleware
 * ======================
 * Serves GZIP compressed JavaScript files to save on bandwidth
 *
 * @returns {*}
 */
module.exports = () => {
  const express = require('express');
  const router = express.Router();

  router.get(`*.js`, function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', `text/javascript`);
    next();
  });

  return router;
};
