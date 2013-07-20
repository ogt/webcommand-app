cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/grep?args=a" |cmp --quiet test/greped.txt 
