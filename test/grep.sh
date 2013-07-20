cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/grep?args=a" |cmp --quiet test/greped.txt 
