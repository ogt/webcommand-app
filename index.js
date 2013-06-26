var createServer = require('http').createServer,
    parse = require('url').parse,
    createReadStream = require('fs').createReadStream,
    spawn = require('child_process').spawn,
    child = require('event-stream').child;

var port = process.env.PORT || 8000;

function createCmdServer(cmd) {
    return createServer(function (req, res) {
      if (req.method == 'POST') {
      var args = parse(req.url,true, true).query.args.split(' '),
	  proc = child(spawn(cmd, args));
      req.pipe(proc)
	 .pipe(res);
      console.log('Executing',cmd,args);
    }
    else // GET
      createReadStream('./index.html').pipe(res);
  });
}

createCmdServer('sort').listen(port);
console.log('Server running at http://localhost:'+port+'/');
