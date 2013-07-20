var test = require("tap").test,
    request = require('request'),
    getport = require('getport'),
    webcommand = require('../');

function genurl(port,cmd) { return 'http://localhost:'+port+'/'+cmd; }

getport(10000,20000, function(e,port) {
    test('error codes',function(t) {
        var server = webcommand(['ls']).listen(port);

        request.post(genurl(port,'ls?args=notexists'), function(err, res, body) {
            console.log(body);
            t.equal(res.statusCode, 400, 'COMMAND_EXITED_ABNORMALLY -> 400');
            server.close();
            t.end();
        });
    });
});
