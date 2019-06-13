const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const {fetch} = require('../src');

const connection = axios.create();

// This sets the mock adapter on axios instance
const mock = new MockAdapter(connection);

const generateLongBuilds = () => {
	const array = [];
	for (let i = 30; i > 0; i -= 1) {
		array.push({id: 10000 + i, number: i.toString()});
	}

	return array;
};

describe('Fetcher Unit tests', () => {
	const fakeRepo = 'fake';
	describe('when everything is right', () => {
		beforeEach(() => {
			// Mock any GET request to /users
			// arguments for reply are (status, data, headers)
			mock.onGet(`/repos/${fakeRepo}/builds`).reply(200, {
				builds: [
					{id: 216708735, number: '1'},
					{id: 216708154, number: '0'}
				]
			});
		});

		afterEach(() => {
			mock.reset();
		});

		it('should fetch from mocked Travis server', async () => {
			const model = await fetch(connection, fakeRepo);
			expect(model.builds).toHaveLength(2);
		});
	});

	describe('when testing for paginated results', () => {
		beforeEach(() => {
			// Mock any GET request to /users
			// arguments for reply are (status, data, headers)
			const longTest = {params: {after_number: null}}; // eslint-disable-line camelcase
			const longBuilds = generateLongBuilds();
			mock.onGet(`/repos/${fakeRepo}/builds`, longTest).reply(200, {
				builds: longBuilds.slice(0, 20)
			});

			const secondPart = {param: {after_number: 10}}; // eslint-disable-line camelcase
			mock.onGet(`/repos/${fakeRepo}/builds`, secondPart).reply(200, {
				builds: longBuilds.slice(20)
			});
		});

		afterEach(() => {
			mock.reset();
		});

		it('should fetch from mocked Travis server', async () => {
			const model = await fetch(connection, fakeRepo);
			expect(model.builds).toHaveLength(30);
		});
	});

	describe('when something is not working', () => {
		describe('and it is the network (first call)', () => {
			beforeEach(() => {
				mock.onGet(`/repos/${fakeRepo}/builds`).networkError();
			});

			afterEach(() => {
				mock.reset();
			});

			it('should throw an error', () => (
				expect(fetch(connection, fakeRepo)).rejects.toThrow()
			));
		});

		describe('and it is the network (NOT first call)', () => {
			beforeEach(() => {
				const longTest = {params: {after_number: null}}; // eslint-disable-line camelcase
				const longBuilds = generateLongBuilds();
				mock.onGet(`/repos/${fakeRepo}/builds`, longTest).reply(200, {
					builds: longBuilds.slice(0, 20)
				});

				const secondPart = {param: {after_number: 10}}; // eslint-disable-line camelcase
				mock.onGet(`/repos/${fakeRepo}/builds`, secondPart).networkError();
			});

			afterEach(() => {
				mock.reset();
			});

			it('should throw an error', () => (
				expect(fetch(connection, fakeRepo)).rejects.toThrow()
			));
		});

		describe('and it is a change in Travis response', () => {
			beforeEach(() => {
				mock.onGet(`/repos/${fakeRepo}/builds`).reply(200, {
					newBuilds: generateLongBuilds()
				});
			});

			afterEach(() => {
				mock.reset();
			});

			it('should throw an error', () => (
				expect(fetch(connection, fakeRepo)).rejects.toThrow()
			));
		});
	});

	afterAll(() => {
		mock.restore();
	});
});
