var escope = require('escope');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var _ = require('lodash');





const variables = { }

/*
 * @param {string} text
 */

variables.getString = function get (text) {

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

variables.getFile = function get (filepath) {
	return variables.getString(fs.readFileSync(filepath, 'utf-8'))
}





module.exports = variables
