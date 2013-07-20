cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/fmt"|cmp --quiet test/fmted.txt
