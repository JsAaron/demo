var child = require('child_process');

var myREPL = child.spawn('node');

myREPL.stdout.pipe(process.stdout, {
    end: false
});

process.stdin.resume();

process.stdin.pipe(myREPL.stdin, {
    end: false
});

myREPL.stdin.on('end', function() {
    process.stdout.write('REPL stream ended.');
});

myREPL.on('exit', function(code) {
    process.exit(code);
});
