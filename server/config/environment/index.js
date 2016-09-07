const _ = require('lodash');

const baseSettings = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  ip: process.env.IP || '0.0.0.0',
  secrets: {
    session: process.env.SESSION_SECRET || 'session-secret',
  },
};

const environmentSettings = require(`./${baseSettings.env}`);

module.exports = _.merge(baseSettings, environmentSettings || {});
