'use strict';

var gutil = require('gulp-util');

function log(message) {
    createMessage(message, 'green');
}

function error(message, e) {
    createMessage(message, 'yellow');
    createMessage(e, 'red');
}

function createMessage(message, color) {
    if (typeof color !== 'string') {
        color = 'green';
    }
    gutil.log(gutil.colors[color](message));
}

module.exports = {
    log: log,
    error: error,
    message: createMessage
};