const axios = require('axios');

function createClient({userAgent, timeout, baseURL, host} = {
	userAgent: 'niktekusho/travis-builds-reporter-core/1.0.0',
	timeout: 10000,
	baseURL: 'https://api.travis-ci.org',
	host: 'api.travis-ci.org'
}) {
	if (typeof userAgent !== 'string') {
		throw new TypeError(`User agent must be a string, but I got ${typeof userAgent}`);
	}

	if (userAgent.trim().length === 0) {
		throw new Error('Travis APIs require a not empty User agent');
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

const exporter = require('./exporter');
const fetcher = require('./fetcher');
const BuildsModel = require('./model');

module.exports = {
	BuildsModel,
	createClient,
	exporter,
	fetcher
};
