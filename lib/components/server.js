/**
 * Load dependencies.
 */
const http = require('http');
const https = require('https');

/**
 * Configuration.
 */
const conf = require('ss-conf')('server');

/**
 * Debugger.
 */
const debug = require('debug')('pietrum:comp:server');

const Server = {
  create: (listener) => {
    if (conf.protocol === 'http') {
      Server.app = http.createServer(listener);
    } else if (conf.protocol === 'https') {
      Server.app = https.createServer(listener);
    }

    // for chaining
    return Server;
  },
  launch: () => {
    debug(`[launch]: on ${conf.protocol}://${conf.host}:${conf.port}`);
    Server.app.listen(conf.port, conf.host, () => {
      debug('[launch]: listening!');
    });
  },
};

/**
 * Expose.
 */
module.exports = Server;
