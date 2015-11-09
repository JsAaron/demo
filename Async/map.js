var async = require("async");
var util  = require("util");
var log   = util.log;


var arr = [{
	name: 'Jack',
	delay: 200
}, {
	name: 'Mike',
	delay: 100
}, {
	name: 'Freewind',
	delay: 300
}, {
	name: 'Test',
	delay: 50
}];

async.map(arr, function(item, callback) {
	log('1.1 enter: '+item.name);
	setTimeout(function() {
		log('1.1 handle: '+item.name);
		callback(null, item.name + '!!!');
	}, item.delay);
}, function(err, results) {
	log('1.1 err: ' + err);
	log('1.1 results: ' + results);
});