var test = require("tap").test,
    request = require('request'),
    getport = require('getport'),
    webcommand = require('../');

function genurl(port,cmd) { return 'http://localhost:'+port+'/'+cmd; }

getport(10000,20000, function(e,port) {
    test('normal execution',function(t) {
        var server = webcommand(['ls']).listen(port);

        request.post(genurl(port,'ls'), function(err, res) {
            t.equal(res.statusCode, 200, 'SUCCESS -> 200');
            server.close();
            t.end();
        });
    });
});

