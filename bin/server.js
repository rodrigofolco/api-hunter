'use strict'
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('api-hunter:server');
const mongoose = require('mongoose');
require('dotenv').config();


const port = normalizePort(process.env.PORT);
app.set('port', port)

const uri = process.env.MONGO_URI;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };
mongoose.connect(uri, options);

mongoose.connection.on('error', () => {
    console.log('Error trying to connect to the database.')
})

mongoose.connection.on('connected', () => {
    console.log('Database connection successfully established.');
})

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API server is listening on port ' + port + '!');

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port  ' + port;

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

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}