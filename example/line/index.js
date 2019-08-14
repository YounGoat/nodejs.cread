#!/usr/bin/env node

'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, line = noda.inRequire('line')
	, mock = require('./mock')
	;

function main(type) {
	if (!type) type = 'basic';
	line(mock[type])
		.then(answer => {
			console.log(answer);
		})
		.catch(ex => {
			console.log(ex.message);
		});
}

main(process.argv[2]);