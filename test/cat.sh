cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/cat" |cmp --quiet test/input.txt
