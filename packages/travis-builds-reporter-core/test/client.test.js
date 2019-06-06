const axios = require('axios');
const client = require('../src/client');

jest.mock('axios');

describe('Axios client Test Suite', () => {
	it('should call axios.create with the default params', () => {
		client.create(axios);

		expect(axios.create).toBeCalledWith({
			baseURL: 'https://api.travis-ci.org',
			timeout: 10000,
			headers: {
				'User-Agent': 'niktekusho/travis-builds-reporter-core/1.0.0',
				Accept: 'application/vnd.travis-ci.2+json',
				Host: 'api.travis-ci.org'
			}
		});
	});

	it('should call axios.create with the right params', () => {
		client.create(axios, 'test');

		expect(axios.create).toBeCalledWith({
			baseURL: 'https://api.travis-ci.org',
			timeout: 10000,
			headers: {
				'User-Agent': 'test',
				Accept: 'application/vnd.travis-ci.2+json',
				Host: 'api.travis-ci.org'
			}
		});
	});
});
