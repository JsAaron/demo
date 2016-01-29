var async = require("async");
var util  = require("util");
var log = util.log;

var arr = [{
    name: 'Jack',
    delay: 200
}, {
    name: 'Mike',
    delay: 3000
}, {
    name: 'Freewind',
    delay: 300
}];

// async.forEach(arr, function(item, callback) {
// 	// util.log('1.1 enter: ' + item.name);
// 	setTimeout(function() {
// 		util.log('1.1 handle: ' + item.name);
// 		callback();
// 	}, item.delay);
// }, function(err) {
// 	util.log('1.1 err: ' + err);
// });


async.forEachLimit(arr, 2, function(item, callback) { 
    log('1.5 enter:'  + item.name); 
    setTimeout(function(){ 
        log('1.5 handle: ' + item.name); 
        callback(null, item.name); 
    }, item.delay); 
}, function(err) { 
    log('1.5 err: ' + err); 
});