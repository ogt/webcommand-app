var test = require("tap").test,
    request = require('request'),
    filed = require('filed'),
    fs = require('fs'),
    getport = require('getport'),
    generateUrl = require('webcommand').generateUrl,
    webcommand = require('webcommand-express');

module.exports = runTest;

function runTest(cfg, commands) {
    getport(10000,20000, function(e,port) {
        var o = cfg.obj;
        test(o.cmd,function(t) {
            o.base = 'http://localhost:'+port;
            if (o.pipes) o.pipes.forEach(function(e) { e.base = 'http://localhost:'+port;});
            var server = webcommand(commands || require('../../commands')).listen(port),
                expected = fs.readFileSync(cfg.expected).toString(),
                url = generateUrl(o);

            filed(cfg.inp).pipe(request.post(url, function(err, res, body) {
                t.equal(res.statusCode, 200, o.cmd+' 200');
                t.equal(body,expected, 'test '+o.cmd+' result'); 
                server.close();
                t.end();
            }));
        });
    });
}

