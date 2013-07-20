ARG=`echo  "console.log(encodeURIComponent('BEGIN { i=1; } {print i++,\\$1; }'))"|node`
cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/awk?args=$ARG"|cmp --quiet test/awked.txt
