
'use strict';

var fs = require('fs');
var history = './histories';

fs.stat(history, function (err, stat) {

	if (err && err.code !== 'ENOENT') {
		throw err;
	}

	if (stat && stat.isFile( )) {
		throw new Error('please remove the file "' + history + '" so that locus can install correctly');
	}

	if (!stat) {
		fs.mkdir(history, function (err) {
			throw err;
		});
	}

});

