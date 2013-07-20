cat test/input2.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/cut?args=-c&args=1-7"|cmp --quiet test/cuted.txt
