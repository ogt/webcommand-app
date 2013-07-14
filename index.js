var express = require('express'),
    cors = require('cors'),
    webCommand = require('webcommand')(require('./commands')),
    stream = require('event-stream');
var request = require('request');

var port = process.env.PORT || 8000;
var app = express();
app.use(cors());
app.get('/getCommands', cors(), function(req,res) {
    res.send(JSON.stringify(webCommand.getCommandList()));
});

app.get('/', function(req,res) {
    console.log(req.host);
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
        var pipes=[],
            curPipe;
        
        if(typeof (req.query.pipes)!=='string'){
            pipes=  req.query.pipes;
            curPipe=decodeURIComponent(pipes.shift());
        }else{
            curPipe=decodeURIComponent(req.query.pipes);
        }
        var urlPipes='';
        if(pipes.length){
            //if first arg in query string use ?
            if(curPipe.indexOf('?')===-1) urlPipes= '?'
            else urlPipes= '&';
            urlPipes = urlPipes +pipes.map(function(pipe){return 'pipes='+encodeURIComponent(pipe);}).join('&');
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
