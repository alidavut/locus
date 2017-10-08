
'use strict'

const lib = require('../src/variables')
const {expect} = require('chai')
const ugly   = require('uglify-js')
const constants = require('../constants')




function randomProgram ( ) {

	const program = {
		variables: new Set([ ]),
		code:      ''
	}

	const count = Math.floor(Math.random( ) * 15)

	for (let ith = 0; ith < count; ++ith) {

		let declarationType = ['var', 'const', 'let'][ (Math.floor(3 * Math.random( ))) ]

		program.variables.add(`x${ith}`)
		program.code += `\n${declarationType} x${ith} = 1;`
	}

	return program

}




describe('variables.get', function ( ) {

	this.timeout(constants.tests.variables.duration)

	it('correctly parses variables', ( ) => {

		for (let ith = 0; ith < 1000; ++ith) {

			let program = randomProgram( )

			const foundSet = lib.getString(program.code, true)
			let missing = [...program.variables].filter(variable => {
				return !foundSet.has(variable)
			})

			if (missing.length > 0) {
				throw new Error(JSON.stringify({
					expected: [...program.variables],
					found:    [...foundSet]
				}, null, 2))
			}

		}

	})

})
