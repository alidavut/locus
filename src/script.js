
/*
 * start a REPL, and handle user input.
 *
 */

{

	// -- capture details about the current file location.

	const stack = __locus.modules.errorStackParser.parse(new Error( ))

	const __locus.file = stack[1].fileName
	const __locus.line = stack[1].lineNumber

	__locus.modules.deasync.loopWhile(( ) => __locus.running)
	__locus.modules.print.file(__locus.file, __locus_line__)

	// -- for autocomplete improvements
	global.__locus.eval = function(code) {
		return eval(code)
	}

	// -- read user input in A REPL.
	while (true) {

		__locus.running = true

		let locus_code = __locus.modules.prompt.get(__locus.file)

		try {

			// -- if the user enters 'exit', close the prompt & exit.
			if (locus_code === 'exit') {

				__locus.running = false
				__locus.modules.prompt.close( )

				break

			} else {

				__locus.modules.print.success(eval(locus_code))

			}

		} catch(err) {
			__locus.modules.print.error(err)
		}

	}

}
