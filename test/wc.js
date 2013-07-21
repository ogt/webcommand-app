require('./lib/util')({
    obj : {
        cmd : 'wc',
        args : [ '-l' ],
        pipes : [
            {
                cmd : 'sed',
                args : [ 's/ //g' ]
            }
        ]
    },
    inp : 'input.txt',
    expected : 'wced.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/wc?args=-l"|sed 's/ //g'|cmp --quiet test/wced.txt
