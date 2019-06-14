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

class BuildsModel {
	constructor(repository, builds, exportedOn) {
		this.repository = repository;
		this.builds = Array.isArray(builds) ? builds : [];
		this.exportedOn = typeof exportedOn === 'string' ? new Date(exportedOn) : exportedOn;
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

// Internal class
class Fetcher {
	constructor(client, repositoryName) {
		this.client = client;
		this.repositoryName = repositoryName;
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
		return this.client.get(`/repos/${this.repositoryName}/builds`, {
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
			const response = await this.fetchBuildsFrom(from, this.repositoryName);
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
	const builds = await fetcher.fetchAllBuilds();
	return new BuildsModel(repository, builds, new Date());
}

module.exports = {
	BuildsModel,
	createClient,
	fetch
};
