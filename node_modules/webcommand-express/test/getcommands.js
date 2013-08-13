var test = require("tap").test,
    request = require('request'),
    getport = require('getport'),
    webcommand = require('../');

function genurl(port,cmd) { return 'http://localhost:'+port+'/'+cmd; }

getport(10000,20000, function(e,port) {
    test('getCommands',function(t) {
        var server = webcommand(['ls']).listen(port);
        
        request(genurl(port,'getCommands'), function(err, res, body) {
            t.equal(res.statusCode, 200, 'getCommands 200');
            t.deepEqual(['ls'],JSON.parse(body), 'getCommands returns list'); 
            server.close();
            t.end();
        });
    });
});
