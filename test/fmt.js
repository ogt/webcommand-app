require('./lib/util')({
    obj : {
        cmd : 'fmt',
    },
    inp : 'input.txt',
    expected : 'fmted.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/fmt"|cmp --quiet test/fmted.txt
