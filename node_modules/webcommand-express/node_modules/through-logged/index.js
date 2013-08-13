"use strict";

module.exports = throughLogged;

var tee = require('tee-1'),
    consoleStream = require('console-stream');

function throughLogged() {
    return tee(consoleStream());
}

