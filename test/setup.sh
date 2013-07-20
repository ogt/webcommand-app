PORT=`echo 'gp = require("getport"); gp(10000,20000,function(e,p) { console.log(p);});'|node`
node index.js &
echo $PORT > test/.process.port
echo $! >test/.process.id
