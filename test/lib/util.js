var test = require("tap").test,
    request = require('request'),
    filed = require('filed'),
    fs = require('fs'),
    getport = require('getport'),
    generateUrl = require('webcommand').generateUrl,
    webcommand = require('webcommand-express');

function run_test(cfg) {
    getport(10000,20000, function(e,port) {
        var o = cfg.obj;
        test(o.cmd,function(t) {
            o.base = 'http://localhost:'+port;
            if (o.pipes) o.pipes.forEach(function(e) { e.base = 'http://localhost:'+port;});
            var server = webcommand(require('../../commands')).listen(port),
                expected = fs.readFileSync(cfg.expected).toString(),
                url = generateUrl(o);

            filed(cfg.inp).pipe(request.post(url, function(err, res, body) {
                t.equal(res.statusCode, 200, cfg.cmd+' 200');
                t.equal(body,expected, 'test '+cfg.cmd+' result'); 
                server.close();
                t.end();
            }));
        });
    });
}

module.exports = run_test;

//example cfg follows
var cfg = {
    cmd : 'awk',
    args : encodeURIComponent('BEGIN { i=1; } {print i++,\\$1; }'),
    inp : 'test/input.txt',
    expected : 'test/awked.txt'
};
