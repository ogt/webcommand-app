var express = require('express'),
    webCommand = require('webcommand')(),
    stream = require('event-stream');

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
	console.log('POST');
    var cmd = req.path.replace('/',''),
        args = [].concat(req.query.args),
        cStream= stream.through();
    if (!req.query.args) args = null;

    cStream.on('error', function(err) {
        console.error(err);
    });
    if(req.query.pipes){
    	console.log('We got pipes to handle');
    	console.log(req.query.pipes);
    }
    webCommand.webCommand(cmd,args, req, res, cStream);
});

app.listen(port);
console.log('Listening on port: '+port);
