var async = require("async");
var util = require("util");
var log = util.log;

// Here is a simple object with an (unnecessarily roundabout) squaring method
var AsyncSquaringLibrary = {
    squareExponent: 2,
    square: function(number, callback) {
        var result = Math.pow(number, this.squareExponent);
        setTimeout(function() {
            callback(null, result);
        }, 200);
    }
};

async.map([1, 2, 3], AsyncSquaringLibrary.square, function(err, result) {
	// console.log(this)
    // result is [NaN, NaN, NaN]
    // This fails because the `this.squareExponent` expression in the square
    // function is not evaluated in the context of AsyncSquaringLibrary, and is
    // therefore undefined.
});

async.map([1, 2, 3], AsyncSquaringLibrary.square.bind(AsyncSquaringLibrary), function(err, result) {
    // result is [1, 4, 9]
    // With the help of bind we can attach a context to the iterator before
    // passing it to async. Now the square function will be executed in its
    // 'home' AsyncSquaringLibrary context and the value of `this.squareExponent`
    // will be as expected.
});
