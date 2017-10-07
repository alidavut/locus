
'use strict'

const escope = require('escope');
const esprima = require('esprima');
const estraverse = require('estraverse');
const fs = require('fs');





const variables = { }

/**
 * List all variables in a JS string.
 *
 * @param {string} text the text to parse.
 *
 * @example
 *   variables.getString('let x = 1') // new Set(['x'])
 *
 * @returns {set} a set of variable names contained in the program.
 *
 */

variables.getString = function getString (text, strict = false) {

	const variables = [ ]

	try {

		const ast = esprima.parse(text)

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


	// no need to display parse-errors.

	} catch (err) {
		if (strict) {
			throw err
		}
	}

	return new Set(variables)

}


/**
 * List all variables in a JS file.
 *
 * @param {string} filepath the path to load.
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
