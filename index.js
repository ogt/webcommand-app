var express = require('express'),
    cors = require('cors'),
    webCommand = require('webcommand')(require('./commands')),
    stream = require('event-stream');

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

app.post('/*', function(req,res){
    var cmd = req.path.replace('/',''),
        args = [].concat(req.query.args),
        cStream= stream.through();
    if (!req.query.args) args = null;

    cStream.on('error', function(err) {
        console.error(err);
    });
    webCommand.webCommand(cmd,args, req, res, cStream);
});

app.listen(port);
console.log('Listening on port: '+port);
