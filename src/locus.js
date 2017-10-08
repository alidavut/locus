const fs = require('fs')
const script = fs.readFileSync(__dirname + '/script.js', 'utf-8')

/**
 * used in script.js
 *
 *
 */

global.__locus = {
	running: false,
	modules: {
		deasync:          require('deasync'),
		errorStackParser: require('error-stack-parser'),
		print:            require('./print'),
		prompt:           require('./prompt')
	}
}


global.__locus_running__ = false
global.locus = script
module.exports = script
