const axios = require('axios');
const {createClient} = require('../src');

jest.mock('axios');

describe('Axios client Test Suite', () => {
	it('should call axios.create with the default params', () => {
		createClient();

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
		createClient({
			baseURL: 'foo',
			host: 'bar',
			userAgent: 'baz',
			timeout: 123
		});

		expect(axios.create).toBeCalledWith({
			baseURL: 'foo',
			timeout: 123,
			headers: {
				'User-Agent': 'baz',
				Accept: 'application/vnd.travis-ci.2+json',
				Host: 'bar'
			}
		});
	});
});
