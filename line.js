'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, readline = require('readline')
	
	/* NPM */
	, obtions = require('obtions')
	, if2 = require('if2')
	
	/* in-package */
	;

function _releaseRI() {}

/**
 * @param {boolean}           [options.null]
 * @param {string}            [options.prompt]
 * @param {function}          [options.pattern]
 * @param {number}            [options.retry]
 * @param {stream.Writable}   [options.input]
 * @param {stream.Readable}   [options.output]
 */
async function line(options) {

	options = obtions(options, {
		caseSensitive: false,
		keepNameCase: true,
		explicit: true,
		columns: [
			'prompt TYPEOF(string) DEFAULT("")',
			'null TYPEOF(boolean)',
			'pattern INSTANCEOF(RegExp,Function)',
			'retry TYPEOF(number) DEFAULT(0)',
			'default TYPEOF(string,number)',
			'input',
			'output',
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

	let prompt;
	MAKE_PRMOPT: {
		let prompts = [];
		if (options.prompt) prompts.push(options.prompt);
		if (options.default) prompts.push(`(${options.default})`); 
		prompt  = prompts.length ? prompts.join(' ') + ' ' : '';	
	}

	let retry = options.retry;

	let line = null;
	let ri = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});	
	do {
		let answer = await new Promise((resolve, reject) => {
			ri.question(prompt, resolve);
		});

		if (answer == '' && options.default) {
			line = options.default;
			break;
		}
		if (answer == '' && options.null) {
			line = '';
			break;
		}

		if (!validate(answer)) {
			console.log('Your answer is unsatisfying.');
		}
		else {
			line = answer;
		}
		
	} while (!line && retry-- > 0)
	ri.close();

	return line;
}

module.exports = line;