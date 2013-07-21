require('./lib/util')({
    obj : {
        cmd : 'head',
        args : [ '-2' ],
    },
    inp : 'input.txt',
    expected : 'headed.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/head?args=-2"|cmp --quiet test/headed.txt
