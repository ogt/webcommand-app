cat test/input1.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/uniq"|cmp --quiet test/uniqed.txt
