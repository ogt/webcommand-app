require('./lib/util')({
    obj : {
        cmd : 'sort',
    },
    inp : 'input.txt',
    expected : 'sorted.txt'
});

//cat test/input.txt| curl --silent --data-binary @- "http://localhost:$PORT/sort" |cmp --quiet test/sorted.txt
