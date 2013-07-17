var express = require('express'),
    cors = require('cors'),
    webcommand = require('webcommand'),
    stream = require('event-stream');
var request = require('request');

module.exports = createServer;

function createServer(cmdList){
    var webCommand = webcommand(cmdList);
    var app = express();
    app.use(cors());
    app.get('/getCommands', cors(), function(req,res) {
        res.send(JSON.stringify(webCommand.getCommandList()));
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

    return app;
}
