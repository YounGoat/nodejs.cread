'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
	, assert = require('assert')
	, child_process = require('child_process')

	/* NPM */
	, noda = require('noda')
    
	/* in-package */
	
	/* in-file */
	, myspawn = function() {
		let args = Array.from(arguments);
		let proc = child_process.spawn('node', args);
		let linecache = [];

		proc.writeline = buf => {
			let arr = [ 
				buf instanceof Buffer ? buf : Buffer.from(buf), 
				Buffer.from('\n'),
			];
			return new Promise((resolve, reject) => {
				proc.stdin.write(Buffer.concat(arr), err => {
					err ? reject(err) : resolve();
				});
			});
		};

		proc.readline = () => {
			if (linecache.length) {
				return Promise.resolve(linecache.shift());
			}

			return new Promise(resolve => {
				proc.stdout.once('data', output => {
					let lines = output.toString('utf8').replace(/[\r\n]+$/, '').split(/[\r\n]+/);
					if (lines.length == 1) {
						resolve(lines[0]);
					}
					else {
						let line = lines.shift();
						linecache = linecache.concat(lines);
						resolve(line);
					}
				});
			});
		}

		return proc;
	}
    ;

describe('line', () => {
	let pathname = noda.inResolve('example/line');
	let mock = noda.inRequire('example/line/mock');

    it('basic usage', async () => {
		let input, output;
		let myproc = myspawn(pathname, 'basic');
		let data = mock['basic'];
		
		output = await myproc.readline();
		assert.equal(output, data.prompt_expect);

		input = '22';
		await myproc.writeline(input);

		output = await myproc.readline();
		assert.equal(output, input);
	});

	it('pattern', async () => {
		let input, output;
		let myproc = myspawn(pathname, 'basic');
		let data = mock['basic'];
		
		output = await myproc.readline();
		assert.equal(output, data.prompt_expect);

		input = 'age';
		await myproc.writeline(input);

		output = await myproc.readline();
		assert.equal(output, 'Your answer is unsatisfying.');

		output = await myproc.readline();
		assert.equal(output, data.prompt_expect);

		input = '22';
		await myproc.writeline(input);

		output = await myproc.readline();
		assert.equal(output, input);
	});

	it('retry', async () => {
		let input, output;
		let myproc = myspawn(pathname, 'basic');
		let data = mock['basic'];
		
		for (let i = 0; i <= data.retry; i++) {
			output = await myproc.readline();
			assert.equal(output, data.prompt_expect);
	
			input = 'age';
			await myproc.writeline(input);

			output = await myproc.readline();
			assert.equal(output, 'Your answer is unsatisfying.');
		}

		output = await myproc.readline();
		assert.equal(output, 'null');
	});
});