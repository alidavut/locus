
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

	it('reports very few parse errors for random ASTs', done => {

		const state = {
			failed:    0,
			total:     0,
		}

		for (let ith = 0; ith < constants.tests.variables.randomCaseCount; ith++) {

			try {
				state.total++
				lib.getString(randomProgram( ), true)
			} catch (err) {
				if (err) {
					state.failed++
				}
			}

		}

		const percentFailed = state.failed / state.total

		if (percentFailed > constants.tests.variables.failedParseThreshold) {
			done(new Error(`failed for ${ (percentFailed * 100).toFixed(2) }% of programs.`))
		} else {
			done( )
		}

	})

})
