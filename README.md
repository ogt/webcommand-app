Unix sort as a web service
--

This web service exposes the unix sort command functionality.
Essentially it is a web server which for every requests spawns a process that executes the unix `sort (1)` command
feeding the request's POST input stream to the standard input of that process and taking the standard output of the process and making it the POST request's result stream.
The request's path is used to extract an "args" parameter which is assumed to be a multi-value parameter, so we map its values into the sort program's argument list. 

The code is very simple (its in `index.js`) just 4 lines are enough to do all that - given existing stream functionality:

    var args = parse(req.url,true, true).query.args,
    proc = child(spawn(cmd, args));
    req.pipe(proc)
       .pipe(res);


You can use the service using curl as follows:
```
>curl --data-binary @- "http://sorter.herokuapp.com/?args=-t&args=,&args=-k&args=3&args=-n"
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
This simple facility is run as a free heroku app - this means that occassionally you may hit a 20 seconds delay - if there has been no activity for a while.
This also means that the resources available aren't much - if you run sort with large inputs - you will probably run the server out of memory and you will make the server unavailable for others. So I would appreciate if you make light use only for the service

