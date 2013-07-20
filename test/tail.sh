cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/tail?args=-2"|cmp --quiet test/tailed.txt
