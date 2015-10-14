var Read = require('stream').Readable;
var Write = require('stream').Writable;
var r = new Read();
var w = new Write();

r.push('hello ');
r.push('world!');
r.push(null)


w._write = function(chunk, ev, cb) {
    console.log(chunk.toString());
    cb();
}

r.pipe(w);
