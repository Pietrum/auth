/**
 * Load dependencies.
 */
const url = require('url');

/**
 * Debugger.
 */
const debug = require('debug')('pietrum:comp:message');

const Message = {
  /**
   * @param {IncomingMessage} request
   */
  recv: (request) => (new Promise((resolve, reject) => {
    debug('recv()');

    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    });
    request.on('end', () => {
      body = Buffer.concat(body).toString('utf-8');
      body = url.parse(`?${body}`, true).query;

      resolve(body);
    });
  })),

  /**
   *
   * @param {ServerResponse} response
   * @param {Error} err
   * @param {object} data
   */
  send: (response, err, data = {}) => {
    debug('send()');

    if (err) {
      data.statusCode = data.statusCode || 400;
      data.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 6 + err.message.length,
      };
      data.body = `error=${err.message}`;
    } else {
      data.statusCode = data.statusCode || 200;
      data.body = JSON.stringify(data.body);
      data.headers['content-type'] = 'application/json';
      data.headers['content-length'] = data.body ? data.body.length : 0;
    }

    response.writeHead(data.statusCode, data.headers);
    response.end(data.body);
  },
};

/**
 * Expose.
 */
module.exports = Message;
