
'use strict'

const lib = require('../src/variables')
const {expect} = require('chai')
const esfuzz = require('esfuzz')
const ugly   = require('uglify-js')
const constants = require('../constants')




function randomProgram ( ) {

	return ugly.AST_Node.from_mozilla_ast(esfuzz.generate( )).print_to_string( )

}




describe('variables.get', function ( ) {

	this.timeout(constants.tests.variables.duration)

	it('correctly parses variables', ( ) => {

		expect(lib.getString(`let x = 1`)).to.include('x')
		expect(lib.getString(`let x = 1; const y = 1`)).to.include('y')

	})

	it('never crashes for random programs', done => {

		for (let ith = 0; ith < constants.tests.variables.randomCaseCount; ith++) {
			lib.getString(randomProgram( ))
		}

		done( )

	})

})
