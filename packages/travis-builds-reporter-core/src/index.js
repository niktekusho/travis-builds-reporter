const axios = require('axios');
const fetcher = require('./fetcher');

function createClient({userAgent, timeout, baseURL, host} = {
	userAgent: 'niktekusho/travis-builds-reporter-core/1.0.0',
	timeout: 10000,
	baseURL: 'https://api.travis-ci.org',
	host: 'api.travis-ci.org'
}) {
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

module.exports = {
	BuildsModel,
	createClient,
	fetcher
};
