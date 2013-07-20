cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/wc?args=-l"|sed 's/ //g'|cmp --quiet test/wced.txt
