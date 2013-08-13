var express = require('express'),
    cors = require('cors'),
    webcommand = require('webcommand'),
    parseUrl = require('webcommand').parseUrl,
    generateUrl = require('webcommand').generateUrl,
    logStream = require('through-logged'),
    stream = require('event-stream');
var request = require('request');

module.exports = createServer;

function createServer(cmdList){
    var webCommand = webcommand(cmdList);
    var app = express();
    app.use(cors());
    app.get('/getCommands', cors(), function(req,res) {
        res.json(webCommand.getCommandList());
    });

    app.post('/*', function(req,res){
        var wc = parseUrl(req.url),
            eStream= logStream(),
            cStream= stream.through();
        cStream.on('error', function(err) {
            console.log('ERROR : ', err.name);
            console.log(err.message);
            var ret = { error : err.name, message : err.message, stack : err.stack };
            if (err.name == 'COMMAND_NOT_ALLOWED') res.status(403, ret);
            else if (err.name == 'COMMAND_NOT_FOUND') res.status(501, ret);
            else if (err.name == 'COMMAND_EXITED_ABNORMALLY') res.status(400, ret);
            else res.status(500, ret);
        });
        if(wc.pipes){
            var curPipe = wc.pipes.shift(),
                purl = generateUrl({
                    base : curPipe.base,
                    cmd : curPipe.cmd,
                    args : curPipe.args,
                    pipes : wc.pipes
                });
            var iStream= stream.through();
//            iStream.pipe(require('through-logged')()).pipe(request.post(purl)).pipe(res);
            iStream.pipe(request.post(purl)).pipe(res);
            webCommand.webCommand(wc.cmd,wc.args, req, iStream, eStream, cStream);
        }
        else{
            webCommand.webCommand(wc.cmd,wc.args, req, res, eStream, cStream);
        }
    });
    return app;
}
