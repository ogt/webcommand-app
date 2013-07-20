cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/sort" |cmp --quiet test/sorted.txt
