const readFile = require('fs').readFileSync;
const path = require('path');

const utils = require('../src');

describe('builds-utils tests', () => {
	const buildsCount = 10;
	const passedCount = 9;
	const canceledCount = 1;
	const failedCount = 0;
	const erroredCount = 0;

	const filePath = path.join(__dirname, 'builds.json');
	const buildsJSONFile = readFile(filePath, 'utf-8');
	const builds = JSON.parse(buildsJSONFile);

	it('Total builds count should return 10', () => {
		expect(utils.getBuildsCount(builds)).toEqual(buildsCount);
	});

	it('Passed builds count should return 9', () => {
		expect(utils.getSuccessfulBuilds(builds).length).toEqual(passedCount);
		expect(utils.getSuccessfulBuildsCount(builds)).toEqual(passedCount);
	});

	it('Canceled builds count should return 1', () => {
		expect(utils.getCanceledBuilds(builds).length).toEqual(canceledCount);
		expect(utils.getCanceledBuildsCount(builds)).toEqual(canceledCount);
	});

	it('Failed builds count should return 0', () => {
		expect(utils.getFailedBuilds(builds).length).toEqual(failedCount);
		expect(utils.getFailedBuildsCount(builds)).toEqual(failedCount);
	});

	it('Errored builds count should return 0', () => {
		expect(utils.getErroredBuilds(builds).length).toEqual(erroredCount);
		expect(utils.getErroredBuildsCount(builds)).toEqual(erroredCount);
	});

	it('Successful builds rate', () => {
		const rate = passedCount / buildsCount;
		expect(utils.getSuccessfulBuildsRate(builds)).toEqual(rate);
	});

	it('Minimum builds duration', () => {
		const durations = builds.map(build => build.duration);
		const min = Math.min(...durations);
		expect(utils.getMinimumBuildsDuration(builds)).toEqual(min);
	});

	it('Maximum builds duration', () => {
		const durations = builds.map(build => build.duration);
		const max = Math.max(...durations);
		expect(utils.getMaximumBuildsDuration(builds)).toEqual(max);
	});

	it('Average builds duration', () => {
		const durations = builds.map(build => build.duration);
		let sum = 0;
		for (let i = 0; i < durations.length; i += 1) {
			sum += durations[i];
		}

		const average = sum / durations.length;
		expect(utils.getAverageBuildsDuration(builds)).toBeCloseTo(average);
	});

	it('Average builds duration rounding', () => {
		const durations = builds.map(build => build.duration);
		let sum = 0;
		for (let i = 0; i < durations.length; i += 1) {
			sum += durations[i];
		}

		const average = sum / durations.length;
		expect(utils.getAverageBuildsDuration(builds, 3)).toEqual(Number(average.toFixed(3)));
	});

	it('Average builds duration NaN (builds length = 0)', () => {
		const durations = [];
		expect(utils.getAverageBuildsDuration(durations)).toEqual(NaN);
	});

	it('Slicing builds by date', () => {
		const output = utils.sliceBuildsByDate(builds);
		// There must be 3 arrays containing the builds ordered by date
		expect(output.length).toEqual(3);
	});
});
