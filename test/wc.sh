cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/wc?args=-l"|sed 's/ //g'|cmp --quiet test/wced.txt
