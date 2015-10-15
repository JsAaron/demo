var page = require('webpage').create(),
    system = require('system'),
    t, address;

// if (system.args.length === 1) {
//     console.log('Usage: loadspeed.js <some URL>');
//     phantom.exit();
// }

t = Date.now();
address = 'http://192.168.1.100:8000/Aaron/www/index.html'
page.open(address, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        console.log('Loading time ' + t + ' msec');
    }
    phantom.exit();
});