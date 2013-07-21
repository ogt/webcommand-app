require('./lib/util')({
    obj : {
        cmd : 'tail',
        args : [ '-2' ],
    },
    inp : 'input.txt',
    expected : 'tailed.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://webcommand-app.herokuapp.com/tail?args=-2"|cmp --quiet test/tailed.txt
