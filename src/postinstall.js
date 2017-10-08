
'use strict'

const fs = require('fs')
const path = require('path')
const history = path.join(__dirname, '../histories')

/**
 * Create a new history folder in a cross-platform manner.
 *
 */

function addHistoryFolder ( ) {

	fs.stat(history, function (err, stat) {

		if (err && err.code !== 'ENOENT') {
			throw err
		}

		if (stat && stat.isFile( )) {
			throw new Error('please remove the file "' + history + '" so that locus can install correctly')
		}

		if (!stat) {
			fs.mkdir(history, function (err) {
				if (err) {
					throw err
				}
			})
		}

	})

}





addHistoryFolder( )
