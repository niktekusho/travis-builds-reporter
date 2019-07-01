#!/usr/bin/env node

const meow = require('meow');
const meowShortcuts = require('meow-shorts');

const cli = meow(`
Usage:
$ builds-reporter [repositoryName] (...options)

Options:
  --verbose                 Display debug info.

Example:
$ builds-reporter niktekusho/travis-builds-reporter
`, {
	flags: {
		verbose: {
			type: 'boolean',
			default: false
		}
	}
});

meowShortcuts(cli);

const main = require('../src');

main(cli.input[0], cli.flags).then(statusCode => {
	if (statusCode !== 0) {
		process.exit(statusCode);
	}
}).catch(console.error);
