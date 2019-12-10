/**
 * Load dependencies.
 */
const debug = require('debug')('pietrum:auth:r:test');

const Test = {
  meHandler: async ({ headers, methodGET, methodPOST }) => {
    debug('meHandler');
    const body = {
      get: methodGET,
      post: methodPOST,
    };

    return {
      statusCode: 200,
      headers, body,
    };
  },
};

/**
 * Expose.
 */
module.exports = Test;
