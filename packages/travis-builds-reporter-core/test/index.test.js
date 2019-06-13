const {createClient, exporter, fetcher} = require('../src');

describe('Testing the whole library usage (fun test?)', () => {
	it('should return results for this repository', async () => {
		const repo = 'niktekusho/travis-builds-reporter';
		const results = await fetcher.fetch(repo, createClient());
		expect(Array.isArray(results)).toEqual(true);
		const buildsModel = exporter.create(results, repo);
		expect(buildsModel).toBeDefined();
		expect(Array.isArray(buildsModel.builds)).toEqual(true);
		expect(buildsModel.repository).toEqual(repo);
	});
});
