#!/usr/bin/env node

/**
 *  dependencies.
 */
let config = require('../server/config/config.js');

let app =  require('../server/app/app');
let debug = require('debug')('Warona:server');
let http = require('http');

/**
 * Get port from environment and store in Express.
 *
 */

let port = normalizePort(process.env.PORT || '5000');

app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(port);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        console.log(port);
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server error event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
        console.log('Listening on', bind);
}
