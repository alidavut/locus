var escope = require('escope');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var _ = require('lodash');





const variables = { }

/**
 * List all variables in a JS string.
 *
 * @param {string} text
 *
 * @example
 *   variables.getString('let x = 1') // new Set(['x'])
 *
 * @returns {set} a set of variable names contained in the program.
 *
 */

variables.getString = function getString (text) {

	const variables = [ ]

	try {

		var ast = esprima.parse(text)

		const scopeManager = escope.analyze(ast)
		const currentScope = scopeManager.acquire(ast)

		estraverse.traverse(ast, {
			leave: function traverseAst (node, parent) {

				const scope = scopeManager.acquire(node)

				if (scope) {

					scope.variables.forEach(variable => {
						variables.push(variable.name)
					})

				}

			}
		})


	} catch (err) { }

	return new Set(variables)

}


/**
 * List all variables in a JS file.
 *
 * @param {string} path
 *
 * @example
 *   variables.getFile('foo.js')
 *
 * @returns {set} a set of variable names contained in the program.
 *
 */

variables.getFile = function getFile (filepath) {
	return variables.getString(fs.readFileSync(filepath, 'utf-8'))
}





module.exports = variables
