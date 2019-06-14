const program = require('commander');
const prompt = require('prompt');
const {Signale} = require('signale');

const logger = new Signale({
	scope: ''
});

const progressLogger = new Signale({
	interactive: true,
	scope: 'progress'
});

const {version} = require('../package.json');

const {createClient, fetch} = require('travis-builds-reporter-core');
const buildsUtils = require('travis-builds-reporter-utils');

function setupCommander() {
	program
		.version(version)
		.option('-r, --repo-name <repositoryName>', 'Specify repository name')
		.parse(process.argv);
}

// Define prompt input schema
const properties = [
	{
		name: 'repositoryName'
	}
];

// Define prompt error function
function onErr(err) {
	logger.error(err.message);
	return 1;
}

function outputBuildsReport(builds) {
	progressLogger.success('Builds received!');
	const report = `
Total builds count: ${buildsUtils.getBuildsCount(builds)}
Successful builds count: ${buildsUtils.getSuccessfulBuildsCount(builds)}
Canceled builds count: ${buildsUtils.getCanceledBuildsCount(builds)}
Failed builds count: ${buildsUtils.getFailedBuildsCount(builds)}
Errored builds count: ${buildsUtils.getErroredBuildsCount(builds)}
Successful builds rate: ${(buildsUtils.getSuccessfulBuildsRate(builds) * 100).toFixed(2)}%
Average builds duration: ${buildsUtils.getAverageBuildsDuration(builds, 2)} s
Minimum builds duration: ${buildsUtils.getMinimumBuildsDuration(builds)} s
Maximum builds duration: ${buildsUtils.getMaximumBuildsDuration(builds)} s
`;
	logger.success(report);
}

const beginCommunication = repositoryName => {
	progressLogger.await('Fetching builds...');
	return fetch(createClient(), repositoryName);
};

logger.warn('This tool returns basic builds statistics for a Travis enabled PUBLIC-ONLY repository.');

setupCommander();

// TODO: refactor the following block of code to use promises or at least reduce the duplicated code
if (program.repoName) {
	beginCommunication(program.repoName)
		.then(model => {
			outputBuildsReport(model.builds);
		})
		.catch(onErr);
} else {
	prompt.start();
	prompt.get(properties, (err, result) => {
		if (err) {
			return onErr(err);
		}

		return beginCommunication(result.repositoryName)
			.then(model => {
				outputBuildsReport(model.builds);
			})
			.catch(onErr);
	});
}
