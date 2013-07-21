require('./lib/util')({
    obj : {
        cmd : 'cut',
        args : [ '-c', '1-7' ],
    },
    inp : 'input2.txt',
    expected : 'cuted.txt'
});
//cat test/input2.txt| curl --silent --data-binary @- "http://localhost:$PORT/cut?args=-c&args=1-7"|cmp --quiet test/cuted.txt
