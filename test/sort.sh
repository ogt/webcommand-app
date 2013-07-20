cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/sort" |cmp --quiet test/sorted.txt
