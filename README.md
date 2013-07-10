Unix sort as a web service
=====

## Synopsis

This web service exposes a few popular unix commands as web services. 

## Description

My motivation for the project was that I needed certain functionality (that was available as a unix command) in what would have been a simle html/js-only app 
and I was forced to add a server side just to do that. So instead of exposing the unix functionality as a web service just for me
I thought to make it an open web service available for others.

So this is essentially  a web server which for every requests spawns a process that executes the unix command
feeding the request's POST input stream to the standard input of that process and taking the standard output of the process and making it the POST request's result stream.
The request's path is used to extract an "args" parameter which is assumed to be a multi-value parameter, so we map its values into the program's argument list. 

The code to do this is very simple :  - given existing stream functionality:

    // code in the webcommand-app 
    // url is for example http://webcommand-app.herokuapp.com/sort?args=-t&args=,&args=-k&args=3&args=-n
    var cmd = req.path.replace('/',''), 
        args = [].concat(req.query.args);
    
    // code in webcommand module...
    var spawn = require('child_process').spawn;
        child = require('event-stream').child;
    proc = child(spawn(cmd, args));
    req.pipe(proc)
       .pipe(res);

The spawning functionality above (expanded with some more error handling is encapsulated as part of the `webcommand` module.

You can use the service using curl as follows:
```
>curl --data-binary @- "http://webcommand-app.herokuapp.com/sort?args=-t&args=,&args=-k&args=3&args=-n"
boo,*,23
foo,*,32
poo,*,3
doo,*,2
^D
doo,*,2
poo,*,3
boo,*,23
foo,*,32
>
```
or you can play with it at http://webcommand-app.herokuapp.com. 
This simple facility is run as a free heroku app - this means that occassionally you may hit a 5-10 seconds delay - if there has been no activity for a while.
This also means that the resources available aren't much - if you run the commands with large inputs - you will probably run the server out of memory and you will make the server unavailable for others. So I would appreciate if you make light use only for the service

## Installation

To run locally:

    > hub clone ogt/webcommand-app && cd webcommand-app
    > npm install
    > node index.js&

To run at heroku:

    > hub clone ogt/webcommand-app && cd webcommand-app
    > npm install
    > heroku login
    > heroku apps:create mywebcommand-app
    > git push heroku master
    > heroku ps:scale web=1
    > open mywebcommand-app.herokuapp.com

