/**
 * Load dependencies.
 */
const Redis = require('ioredis');

/**
 * Configuration
 */
const conf = require('ss-conf')('redis');

/**
 * Redis Storage.
 *
 * @type {object} startup configuration
 */
const opts = {
  port: conf.port,
  host: conf.host,
  family: 4,
  db: 0,
  password: conf.password,
  keyPrefix: conf.keyPrefix.replace('%s', process.env.NODE_ENV || 'prod'),
};

/**
 * Expose.
 */
module.exports = new Redis(opts);
