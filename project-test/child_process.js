var http = require('http');

var server = http.createServer(function (req, res) {
	console.log(res)
});
server.listen(8888);