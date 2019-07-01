const inquirer = require('inquirer');
const {Signale} = require('signale');

const {createClient, fetch} = require('travis-builds-reporter-core');

const logger = new Signale({
	scope: ''
});

const progressLogger = new Signale({
	interactive: true,
	scope: 'progress'
});

async function main(repositoryName, options) {
	logger.warn('This tool returns basic builds statistics for a Travis enabled PUBLIC-ONLY repository.');
	const {verbose} = options;

	if (verbose) {
		logger.debug(`Input repository: ${repositoryName}`);
		logger.debug(`Flag options: ${options}`);
	}

	let repository = repositoryName;

	if (typeof repository !== 'string' || repositoryName.trim().length === 0) {
		if (verbose) {
			logger.debug('Specified repository name is not a string or is empty.');
		}

		const answers = await inquirer.prompt([{
			type: 'input ',
			name: 'repository',
			message: 'Repository name (ex. niktekusho/travis-builds-reporter)',
			validate: answer => answer.trim().length === 0 ? 'Input a valid repository name' : true
		}]);

		if (verbose) {
			logger.debug(answers);
		}

		repository = answers.repository;
	}

	progressLogger.await('Fetching builds...');

	try {
		const model = await fetch(createClient(), repository);
		progressLogger.success('Builds received!');
		const report = model.generateReport();
		logger.info(`
Total builds count: ${report.total}
Successful builds count: ${report.stats.successfulCount}
Canceled builds count: ${report.stats.canceledCount}
Failed builds count: ${report.stats.failedCount}
Errored builds count: ${report.stats.erroredCount}
Successful builds rate: ${report.stats.successRate}%
Average builds duration: ${report.times.avgDuration} s
Minimum builds duration: ${report.times.minDuration} s
Maximum builds duration: ${report.times.maxDuration} s
`);
		return 0;
	} catch (error) {
		if (verbose) {
			logger.error(error);
		} else {
			logger.error(error.message);
		}

		return 1;
	}
}

module.exports = main;
