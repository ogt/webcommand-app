require('./lib/util')({
    obj : {
        cmd : 'cat',
    },
    inp : 'input.txt',
    expected : 'input.txt'
});
//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/cat" |cmp --quiet test/input.txt
