require('./lib/util')({
    obj : {
        cmd : 'grep',
        args : [ 'a' ],
    },
    inp : 'input.txt',
    expected : 'greped.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/grep?args=a" |cmp --quiet test/greped.txt 
