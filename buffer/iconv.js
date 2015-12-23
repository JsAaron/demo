var iconv = require('iconv-lite');
var fs = require('fs');

var rs = fs.createReadStream('test.txt')
rs.setEncoding('utf8')
var data;
rs.on("data",function(chunk){
	data += chunk;
})
rs.on("end",function(){
	console.log(data)
})

console.log(rs)
