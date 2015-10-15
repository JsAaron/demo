var fs = require('fs');
var stream = fs.createReadStream('test.txt');
var files = fs.readdirSync(process.cwd());
files.forEach(function(file){

	// console.log(file)
})

console.log(stream)