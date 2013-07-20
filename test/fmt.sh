cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/fmt"|cmp --quiet test/fmted.txt
