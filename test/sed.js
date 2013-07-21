require('./lib/util')({
    obj : {
        cmd : 'sed',
        args : [ 's/a/d/' ],
    },
    inp : 'input.txt',
    expected : 'seded.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/sed?args=s%2Fa%2Fd%2F" |cmp --quiet test/seded.txt 
