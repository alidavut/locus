
const fs = require('fs')
const util = require('util')
const color = require('cli-color')
const highlight = require('cardinal').highlight
const syntaxTheme = require('cardinal/themes/tomorrow-night.js')
const (require('lodash'))




const print = { }





/*
 * @param {string} path the path to load.
 * @parm {number} line the current line number in the file.
 *
 */

print.file = (path, line) => {

	// -- syntax-highlight the loaded, current, JS file.
	const file = highlight(fs.readFileSync(path, 'utf-8'), {
		theme: syntaxTheme
	})

	// -- display details about the file.
	console.log( )
	console.log(color.bold('File : ') + path + ' @ line: ' + line)
	console.log( )

	var startLine = line > 7 ? line - 7 : 0
	var lines = file.split('\n')

	// -- todo simplify.
	for (var ith = startLine; ith < line + 3 && ith < lines.length; ith++) {

		var maxLineNumberLength = line.toString( ).length

		if (line === ith + 1) {
			var lineNumber = ' => ' + (ith + 1)
		} else {
			var lineNumber = ith + 1
		}

		let paddedLineNumber = (lineNumber + ': ').padStart(maxLineNumberLength + 6)

		console.log(color.xterm(111)(paddedLineNumber) + lines[ith])
	}

	console.log()
}

/*
 * @param {object} result The value returned from the REPL.
 *
 * print a stringified result returned from an executed command.
 *
 */

print.success = result => {
	console.log(color.greenBright(util.inspect(result, false, 1, true)))
}

/*
 * @param {string} err an error result to display.
 *
 * print a error that occurred while running a command.
 *
 */

print.error = err => {
	console.log(color.redBright(err))
}





module.exports = print
