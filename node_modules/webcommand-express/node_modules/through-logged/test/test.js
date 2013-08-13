/*
   most of this code is copied shamelessly from 
   https://github.com/Raynos/console-stream/blob/master/test/index.js
 */
"use strict";
var test = require("tap").test;
var throughLogged = require("../index.js");

test("console stream", function (assert) {
    var stream = throughLogged();

    assert.ok(stream.write);
    assert.ok(stream.end);
    assert.ok(stream.destroy);

    assert.end();
});

test("through console write", function (assert) {
    var old = console.log;
    console.log = intercept;

    var list = [];
    var stream = throughLogged();

    stream.write("one");
    stream.write("two");
    stream.write("three");
    stream.write("four\n");
    stream.write("five\na");
    stream.write("bar");
    stream.end();

    console.log = old;

    assert.deepEqual(list, [
        "onetwothreefour",
        "five",
        "abar"
    ]);
    assert.end();

    function intercept(chunk) {
        list.push(chunk);

        // old.apply(this, arguments)
    }
});
