const {createClient, fetch} = require('../src');

describe('Testing the whole library usage (fun test?)', () => {
	it('should return results for this repository', async () => {
		debugger;
		const repo = 'niktekusho/travis-builds-reporter';
		const model = await fetch(createClient(), repo);
		expect(model.builds.length > 0).toEqual(true);
	});
});
