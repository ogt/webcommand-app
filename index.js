var express = require('express'),
    webCommand = require('webcommand')(),
    stream = require('event-stream');
var request = require('request');

var port = process.env.PORT || 8000;
var app = express();

app.get('/getCommands', function(req,res) {
    res.send(JSON.stringify(webCommand.getCommandList()));
});

app.get('/', function(req,res) {
    res.sendfile('index.html');
});

app.get('/test', function(req,res) {
    res.sendfile('test.html');
});

app.post('/*', function(req,res){
    var cmd = req.path.replace('/',''),
        args = [].concat(req.query.args),
        cStream= stream.through();
    if (!req.query.args) args = null;

    cStream.on('error', function(err) {
        console.error(err);
    });
    if(req.query.pipes){
    	var pipes= JSON.parse(req.query.pipes);
    	var curPipe=pipes.shift();
    	var urlPipes='';
    	if(pipes.length){
    		urlPipes= '&pipes='+JSON.stringify(pipes);
    	}
    	var iStream= stream.through();
    	iStream.pipe(request.post(curPipe+urlPipes)).pipe(res);
    	webCommand.webCommand(cmd,args, req, iStream, cStream);
    }else{
    	webCommand.webCommand(cmd,args, req, res, cStream);
    }
});

app.listen(port);
console.log('Listening on port: '+port);
