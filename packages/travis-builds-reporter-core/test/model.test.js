const readFile = require('fs').readFileSync;
const path = require('path');

const {BuildsModel} = require('../src');

describe('BuildsModel Test Suite', () => {
	describe('when building an object with BuildsModel constructor', () => {
		it('should have the expected defaults', () => {
			const b = new BuildsModel('testRepository');
			expect(b.repository).toEqual('testRepository');
			expect(b.builds).toStrictEqual([]);
			expect(b.exportedOn).toStrictEqual(undefined);
		});
	});

	describe('testing deserialization', () => {
		it('serialized object should deserialize correctly', () => {
			const b = new BuildsModel('serialize me', [], new Date());
			const serializedB = JSON.stringify(b);
			const deserializedB = BuildsModel.fromJSONString(serializedB);
			expect(deserializedB).toStrictEqual(b);
		});
		it('invalid object should not deserialize, but throw errors instead', () => {
			const failing1 = JSON.stringify({a: ''});
			// Need to pass a function (and not its result) since chai wrap the function to catch errors
			expect(() => BuildsModel.fromJSONString(failing1)).toThrow();
			const failing2 = JSON.stringify({repository: 'test'});
			expect(() => BuildsModel.fromJSONString(failing2)).toThrow();
		});
	});

	describe('testing analysis functions', () => {
		const buildsCount = 10;
		const passedCount = 9;
		const canceledCount = 1;
		const failedCount = 0;
		const erroredCount = 0;

		const filePath = path.join(__dirname, 'builds.json');
		const buildsJSONFile = readFile(filePath, 'utf-8');
		const builds = JSON.parse(buildsJSONFile);

		const model = new BuildsModel('test', builds);

		it('Total builds count should return 10', () => {
			expect(model.getBuildsCount()).toEqual(buildsCount);
		});

		it('Passed builds count should return 9', () => {
			expect(model.getSuccessfulBuilds().length).toEqual(passedCount);
			expect(model.getSuccessfulBuildsCount()).toEqual(passedCount);
		});

		it('Canceled builds count should return 1', () => {
			expect(model.getCanceledBuilds().length).toEqual(canceledCount);
			expect(model.getCanceledBuildsCount()).toEqual(canceledCount);
		});

		it('Failed builds count should return 0', () => {
			expect(model.getFailedBuilds().length).toEqual(failedCount);
			expect(model.getFailedBuildsCount()).toEqual(failedCount);
		});

		it('Errored builds count should return 0', () => {
			expect(model.getErroredBuilds().length).toEqual(erroredCount);
			expect(model.getErroredBuildsCount()).toEqual(erroredCount);
		});

		it('Successful builds rate', () => {
			const rate = passedCount / buildsCount;
			expect(model.getSuccessfulBuildsRate()).toEqual(rate);
		});

		it('Minimum builds duration', () => {
			const durations = builds.map(build => build.duration);
			const min = Math.min(...durations);
			expect(model.getMinimumBuildsDuration()).toEqual(min);
		});

		it('Maximum builds duration', () => {
			const durations = builds.map(build => build.duration);
			const max = Math.max(...durations);
			expect(model.getMaximumBuildsDuration()).toEqual(max);
		});

		it('Average builds duration', () => {
			const durations = builds.map(build => build.duration);
			let sum = 0;
			for (let i = 0; i < durations.length; i += 1) {
				sum += durations[i];
			}

			const average = sum / durations.length;
			expect(model.getAverageBuildsDuration()).toBeCloseTo(average);
		});

		it('Average builds duration rounding', () => {
			const durations = builds.map(build => build.duration);
			let sum = 0;
			for (let i = 0; i < durations.length; i += 1) {
				sum += durations[i];
			}

			const average = sum / durations.length;
			expect(model.getAverageBuildsDuration(3)).toEqual(Number(average.toFixed(3)));
		});

		it('Average builds duration NaN (builds length = 0)', () => {
			const nanModel = new BuildsModel('test', []);
			expect(nanModel.getAverageBuildsDuration()).toEqual(NaN);
		});

		it('Slicing builds by date', () => {
			const output = model.sliceBuildsByDate();
			// There must be 3 arrays containing the builds ordered by date
			expect(output.length).toEqual(3);
		});

		it('generate report', () => {
			const report = model.generateReport();

			expect(report).toStrictEqual({
				total: buildsCount,
				times: {
					avgDuration: model.getAverageBuildsDuration(),
					maxDuration: model.getMaximumBuildsDuration(),
					minDuration: model.getMinimumBuildsDuration()
				},
				stats: {
					successfulCount: passedCount,
					canceledCount,
					failedCount,
					erroredCount,
					successRate: Number(90).toFixed(2)
				}
			});
		});
	});
});
