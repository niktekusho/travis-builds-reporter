// Short for travis-builds-provider 👀
const tbp = require('../src');

const client = tbp.createClient({
	userAgent: 'niktekusho/travis-builds-reporter-core/example'
});

console.log(client);
