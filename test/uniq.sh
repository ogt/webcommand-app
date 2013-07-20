cat test/input1.txt| curl --silent --data-binary @- "http://localhost:$PORT/uniq"|cmp --quiet test/uniqed.txt
