cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/cat" |cmp --quiet test/input.txt
