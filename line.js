'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, readline = require('readline')
	
	/* NPM */
	, obtions = require('obtions')
	, if2 = require('if2')
	
	/* in-package */
	;


let _ri = null;
function _getRI() {
	if (!_ri) {
		_ri = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	}
	return _ri;
}

/**
 * @param {boolean}   [options.null]
 * @param {string}    [options.prompt]
 * @param {function}  [options.pattern]
 * @param {number}    [options.retry]
 */
async function line(options) {

	options = obtions(options, {
		caseSensitive: false,
		keepNameCase: true,
		explicit: true,
		columns: [
			'prompt TYPEOF(string) DEFAULT("Answer:")',
			'null TYPEOF(boolean)',
			'pattern INSTANCEOF(RegExp,Function)',
			'retry TYPEOF(number) DEFAULT(0)',
			'default TYPEOF(string)',
		],
	});

	let validate = answer => {
		if (!options.pattern) {
			return true;
		}
		if (options.pattern instanceof RegExp) {
			return options.pattern.test(answer);
		}
		if (options.pattern instanceof Function) {
			return options.pattern(answer);
		}
	}

	let line = null;
	let ri = _getRI();
	let prompt = `${options.prompt} `;
	if (options.default) {
		prompt = `${prompt} (${options.default}) `;
	}
	do {
		let answer = await new Promise((resolve, reject) => {
			ri.question(prompt, resolve);
		});

		if (!validate(answer)) {
			console.log('Your answer is unsatisfying.');
		}
		else {
			line = answer;
		}

	} while (!line && options.retry-- > 0)
	ri.close();
	return line;
}

module.exports = line;