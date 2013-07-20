cat test/input2.txt| curl --silent --data-binary @- "http://localhost:$PORT/cut?args=-c&args=1-7"|cmp --quiet test/cuted.txt
