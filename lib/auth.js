/**
 * Load dependencies.
 */
const url = require('url');

/**
 * Debugger.
 */
const debug = require('debug')('pietrum:auth');

/**
 * Components.
 */
const Message = require('./components/message');
const Server = require('./components/server');

/**
 * Routes.
 */
const Test = require('./routes/test');

Server.create((request, response) => {
  Message.recv(request).then((post) => {
    const uri = url.parse(request.url, true);
    const pathname = uri.pathname.split('/');

    let route;
    switch (pathname[1]) {
      case 'test':
        route = Test;
        break;
      default:
        return Message.send(response, new Error('route_error'));
    }

    const handler = `${pathname[2]}Handler`;
    route[handler]({
      headers: request.headers,
      methodGET: uri.query,
      methodPOST: post,
    }).then((reply) => (Message.send(response, null, reply))
    ).catch((err) => (Message.send(response, err)));
  });
}).launch();

process.on('uncaughtException', function (err) {
  debug('[uncaughtException]: %s', err.message);
});
