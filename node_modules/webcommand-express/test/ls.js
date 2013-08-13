require('./lib/util')({
    obj : {
        cmd : 'ls',
        args : [ '-1a' ],
        pipes : [
            {
                cmd : 'grep',
                args : [ '^[.]' ]
            },
            {
                cmd : 'wc',
                args : [ '-l' ]
            },
            {
                cmd : 'sed',
                args : [ 's/ //g' ]
            }
        ]
    },
    inp : '/dev/null',
    expected : 'lsed.txt'
},['ls','sed','wc','grep']);

//ls -1a |grep '^\.'|wc -l |sed 's/ //g' > lsed.txt
