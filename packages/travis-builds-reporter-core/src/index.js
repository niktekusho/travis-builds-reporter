const axios = require('axios');

const pkg = require('../package.json');

function createClient({
	userAgent = `niktekusho/travis-builds-reporter-core/${pkg.version}`,
	timeout = 10000,
	baseURL = 'https://api.travis-ci.org',
	host = 'api.travis-ci.org'} = {}) {
	if (typeof userAgent !== 'string') {
		throw new TypeError(`User Agent must be a string, but I got ${typeof userAgent}`);
	}

	if (userAgent.trim().length === 0) {
		throw new Error('Travis APIs require a not empty User Agent');
	}

	return axios.create({
		baseURL,
		timeout,
		headers: {
			'User-Agent': userAgent,
			Accept: 'application/vnd.travis-ci.2+json',
			Host: host
		}
	});
}

function getBuildsForState(builds, state) {
	return builds.filter(value => value.state === state);
}

function getBuildsCountForState(builds, state) {
	return getBuildsForState(builds, state).length;
}

function extractDurations(builds) {
	return builds.map(build => build.duration);
}

function extractDateOnly(date) {
	return date.substring(0, 10);
}

class BuildsModel {
	constructor(repository, builds, exportedOn) {
		this.repository = repository;
		this.builds = Array.isArray(builds) ? builds : [];
		this.exportedOn = typeof exportedOn === 'string' ? new Date(exportedOn) : exportedOn;
	}

	getMinimumBuildsDuration() {
		// { build.duration } is a number measured in seconds as of 05/07/2017
		const durations = extractDurations(this.builds);
		return Math.min(...durations);
	}

	getMaximumBuildsDuration() {
		const durations = extractDurations(this.builds);
		return Math.max(...durations);
	}

	getAverageBuildsDuration(decimals) {
		const durations = extractDurations(this.builds);
		if (durations.length > 0) {
			const totalDuration = durations.reduce((sum, newDuration) => sum + newDuration);
			const average = totalDuration / durations.length;
			if (decimals && typeof decimals === 'number') {
				return Number(average.toFixed(decimals));
			}

			return average;
		}

		return NaN;
	}

	sliceBuildsByDate() {
		// Key will be date only (YYYY-MM-DD), value will be array of builds with that started_at date
		const dateKeysMap = new Map();

		this.builds.forEach(build => {
			const buildDateTime = extractDateOnly(build.started_at || build.finished_at);
			// If the key is present, its return value will be != null and we can skip insertion in map
			const existingValue = dateKeysMap.get(buildDateTime);
			if (existingValue === null || existingValue === undefined) {
				dateKeysMap.set(buildDateTime, this.builds.filter(entry => {
					// Pick one that hopefully isn't null
					const entryDate = entry.started_at || entry.finished_at;
					const buildDate = build.started_at || build.finished_at;
					return extractDateOnly(entryDate) === extractDateOnly(buildDate);
				}));
			}
		});

		return [...dateKeysMap.values()];
	}

	getBuildsCount() {
		return this.builds.length;
	}

	getSuccessfulBuilds() {
		return getBuildsForState(this.builds, 'passed');
	}

	getSuccessfulBuildsCount() {
		return getBuildsCountForState(this.builds, 'passed');
	}

	getCanceledBuilds() {
		return getBuildsForState(this.builds, 'canceled');
	}

	getCanceledBuildsCount() {
		return getBuildsCountForState(this.builds, 'canceled');
	}

	getErroredBuilds() {
		return getBuildsForState(this.builds, 'errored');
	}

	getErroredBuildsCount() {
		return getBuildsCountForState(this.builds, 'errored');
	}

	getFailedBuilds() {
		return getBuildsForState(this.builds, 'failed');
	}

	getFailedBuildsCount() {
		return getBuildsCountForState(this.builds, 'failed');
	}

	getSuccessfulBuildsRate() {
		return getBuildsCountForState(this.builds, 'passed') / this.builds.length;
	}

	generateReport() {
		return {
			total: this.getBuildsCount(),
			times: {
				avgDuration: this.getAverageBuildsDuration(2),
				maxDuration: this.getMaximumBuildsDuration(),
				minDuration: this.getMinimumBuildsDuration()
			},
			stats: {
				successfulCount: this.getSuccessfulBuildsCount(),
				canceledCount: this.getCanceledBuildsCount(),
				failedCount: this.getFailedBuildsCount(),
				erroredCount: this.getErroredBuildsCount(),
				successRate: (this.getSuccessfulBuildsRate() * 100).toFixed(2)
			}
		};
	}

	static fromJSONString(json) {
		const {repository, builds, exportedOn} = JSON.parse(json);
		const commonError = 'Deserialization failed. Check if your json file has ';
		if (repository === null || repository === undefined) {
			throw new Error(`${commonError} the repository field.`);
		}

		if (builds === null || builds === undefined) {
			throw new Error(`${commonError} the builds field.`);
		}

		return new BuildsModel(repository, builds, exportedOn);
	}
}

function isUndefined(obj) {
	return obj === null || obj === undefined;
}

// Internal class
class Fetcher {
	constructor(client, repository) {
		if (isUndefined(client)) {
			throw new TypeError('Client cannot be \'null\' or \'undefined\'.');
		}

		if (isUndefined(repository)) {
			throw new TypeError('Repository cannot be \'null\' or \'undefined\'.');
		}

		// Additional repository validation
		if (typeof repository === 'string' && !repository.match(/\w+\/\w+/)) {
			throw new TypeError(`Repository '${repository}' does not match the usual 'REPOSITORY_OWNER/REPOSITORY_NAME' pattern.`);
		}

		this.client = client;
		this.repository = repository;
	}

	async doesRepositoryExist() {
		// Check if the repository exists
		try {
			await this.client.get(`/repos/${this.repository}`);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				throw new Error(`Looks like ${this.repository} does not exist on Travis CI.`, error);
			}

			throw new Error(`Travis CI check responded with: ${error}`, error);
		}
	}

	// Given the total builds count, this method create an array of builds index that can be used to spawn multiple concurrent http requests.
	spliceBuilds(buildsCount, buildsPerPage) {
		const splicedBuilds = [];
		// Start from the latest build
		let currentBuildsIndex = buildsCount;
		while (currentBuildsIndex > buildsPerPage) {
			currentBuildsIndex -= buildsPerPage;
			splicedBuilds.push(currentBuildsIndex);
		}

		return splicedBuilds;
	}

	// Method that start the HTTP calls to Travis API.
	async fetchBuildsFrom(from) {
		return this.client.get(`/repos/${this.repository}/builds`, {
			params: {
				after_number: from // eslint-disable-line camelcase
			}
		});
	}

	// Validates Travis response: in the response there must be a "builds" object that is of type "array".
	validateTravisResponse(response) {
		const thisPageBuilds = response.data.builds;
		return Array.isArray(thisPageBuilds) && thisPageBuilds.length > 0;
	}

	/*
	 * First call to Travis APIs in order to:
	 * 1) retrieve first builds (up to 25 as of 27/07/2017) and store them for later use
	 * 2) initialize array that manages concurrent HTTP calls
	 */
	async initializeBuildsInfo() {
		const response = await this.fetchBuildsFrom(null);
		if (this.validateTravisResponse(response)) {
			const thisPageBuilds = response.data.builds;
			const buildsCount = parseInt(thisPageBuilds[0].number, 10);
			const buildsPerPage = thisPageBuilds.length;
			const builds = [];
			builds.push(...thisPageBuilds);
			const info = {
				buildsCount,
				buildsPerPage,
				builds
			};
			return info;
		}

		throw new Error(`
Invalid response received from Travis.

Check on 'https://developer.travis-ci.com/resource/builds#find' if the Travis APIs changed.
In any case, feel free to open an issue on 'https://github.com/niktekusho/travis-builds-reporter/issues/new'
`);
	}

	async fetchAllBuilds() {
		const info = await this.initializeBuildsInfo();
		const {builds, buildsCount, buildsPerPage} = info;
		const splicedBuilds = this.spliceBuilds(buildsCount, buildsPerPage);

		const promise = async from => {
			/*
			 Validation here is not performed:
			 if Travis changed API in some ways, we would have caught that error
			 in the initializeBuildsInfo (use the same fetchBuildsFrom function)
			 */
			const response = await this.fetchBuildsFrom(from, this.repository);
			return response.data.builds;
		};

		const promises = splicedBuilds.map(fromBuild => promise(fromBuild));
		const result = await Promise.all(promises);
		result.forEach(partialBuilds => builds.push(...partialBuilds));
		builds.sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10));
		return builds;
	}
}

async function fetch(client, repository) {
	const fetcher = new Fetcher(client, repository);
	await fetcher.doesRepositoryExist();
	const builds = await fetcher.fetchAllBuilds();
	return new BuildsModel(repository, builds, new Date());
}

module.exports = {
	BuildsModel,
	createClient,
	fetch
};
