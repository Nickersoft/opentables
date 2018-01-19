const merge = require('webpack-merge');
const common = require('../common.config');

module.exports = merge(common, {
  name: 'client',
  target: 'web'
});
