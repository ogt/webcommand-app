var request = require('http').request;

var options = {
  hostname : 'localhost',
  port : 8000,
  path : '/?args=-t&args=,&args=-k&args=3&args=-n',
  method : 'POST'
};

var req = request(options, function(res) {
  res.pipe(process.stdout);
});
process.stdin.pipe(req);

