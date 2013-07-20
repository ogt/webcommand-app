cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/sed?args=s%2Fa%2Fd%2F" |cmp --quiet test/seded.txt 
