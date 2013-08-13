Logged though stream
==
[![Build Status](https://travis-ci.org/ogt/through-logged.png)](https://travis-ci.org/ogt/through-logged)

## Synopsis

Through stream that logs to console everything that passes through it. 
Use it as a quick debuuging tool by inserting in at a right point of a pipeline to see what is passing through.

##Description

Let say that you have the following pipeline

```javascript
    var spawn =  require('child_process').spawn,
        child = require('event-stream').child,
        filed = require('filed');
        filed('/etc/passwd').pipe(child(spawn('grep',['odysseas']))
                            .pipe(child(spawn('wc', ['-l']));
```
and you are wondering what is being piped through the `grep` process to the `wc` - and do so without affecting the rest of the program. You can do :

```javascript
    var throughLogged = require('through-logged');
    ....
        filed('/etc/passwd').pipe(child(spawn('grep',['odysseas']))
                            .pipe(throughLogged())  // we inserted the logger here.
                            .pipe(child(spawn('wc', ['-l']));
```
which will print to the output the greped lines - before passed to wc.

The code of this module is tiny:
```javascript
var tee = require('tee-1'),
    consoleStream = require('console-stream');

function throughLogged() {
    return tee(consoleStream());
}
module.exports = throughLogged;
```
## Installation 

```
npm install through-logged
```
