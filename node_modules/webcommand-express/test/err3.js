var test = require("tap").test,
    request = require('request'),
    getport = require('getport'),
    webcommand = require('../');

function genurl(port,cmd) { return 'http://localhost:'+port+'/'+cmd; }

getport(10000,20000, function(e,port) {
    test('error codes',function(t) {
        var server = webcommand(['ls']).listen(port);
        request.post(genurl(port,'lsa'), function(err, res, body) {
            console.log(body);
            t.equal(res.statusCode, 403, 'COMMAND_NOT_ALLOWED -> 403');
            server.close();
            t.end();
        });
    });
});
