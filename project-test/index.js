var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var stream = require('stream');

// 写文件
fs.readFile(__dirname + '/text.txt', 'utf-8', function(err, data) {
    // console.log(data)
})


// 写文件
var w_data = '这是一段通过fs.writeFile函数写入的11内容；\r\n';
var w_data = new Buffer(w_data);
fs.writeFile(__dirname + '/text1.txt', w_data, {
    falg: 'a'
}, function(err) {

})


// 追加写入
fs.appendFile(__dirname + '/text2.txt', w_data, function() {

})


fs.open(__dirname + '/text1.txt', 'r', '0666', function(err, fd) {
    // console.log(fd);
});


fs.open(__dirname+'/text.txt','r',function(){
	var buffer = new Buffer(255);
})  


// var exec = require('child_process').exec;

// var ls = exec('rd test-pppp', function (error, stdout, stderr) {
//   if (error) {
//     console.log(error.stack);
//     console.log('Error code: ' + error.code);
//   }
//   console.log('Child Process STDOUT: ' + stdout);
// 


// var exec = require('child_process').exec;
// var child = exec('ls -l');

// child.stdout.on('data', function(data) {
//   console.log('stdout: ' + data);
// });
// child.stderr.on('data', function(data) {
//   console.log('stdout: ' + data);
// });
// child.on('close', function(code) {
//   console.log('closing code: ' + code);
// 
// 

// fs.createReadStream('text.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('text.gz'));


var Stream = stream.Stream;

var ws = new Stream;
ws.writable = true;

ws.write = function(data) {
  console.log("input=" + data);
}

ws.end = function(data) {
  console.log("bye");
}

process.stdin.pipe(ws);