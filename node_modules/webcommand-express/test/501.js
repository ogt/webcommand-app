var test = require("tap").test,
    request = require('request'),
    getport = require('getport'),
    webcommand = require('../');

function genurl(port,cmd) { return 'http://localhost:'+port+'/'+cmd; }

getport(10000,20000, function(e,port) {
    test('error codes',function(t) {
        var server = webcommand(['notexists']).listen(port);

        request.post(genurl(port,'notexists'), function(err, res, body) {
            console.log(body);
            t.equal(res.statusCode, 501, 'COMMAND_NOT_FOUND -> 501');
            server.close();
            t.end();
        });
    });
});

