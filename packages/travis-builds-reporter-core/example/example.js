// Short for travis-builds-provider 👀
const {createClient, fetch} = require('../src');

const client = createClient({
	userAgent: 'niktekusho/travis-builds-reporter-core/example'
});

fetch(client, 'niktekusho/travis-builds-reporter')
	.then(model => {
		console.log(model);
	})
	.catch(console.error);
