cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/head?args=-2"|cmp --quiet test/headed.txt
