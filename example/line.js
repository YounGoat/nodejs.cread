'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, line = noda.inRequire('line')
	;

function main() {
	line({
		prompt: 'How old are you?',
		pattern: /^\d+$/,
		retry: 3,
		default: 18,
	})
	.then(answer => {
		console.log(answer);
	})
	.catch(ex => {
		console.log(ex.message);
	});
}

main();