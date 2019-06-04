const BuildsModel = require('../src/model');

describe('BuildsModel Test Suite', () => {
	describe('when building an object with BuildsModel constructor', () => {
		it('should have the intended properties', () => {
			const b0 = new BuildsModel();
			expect(b0).toHaveProperty('repository');
			expect(b0).toHaveProperty('builds');
		});
	});
	describe('testing setters and getters', () => {
		it('should be possible to get/set the repository', () => {
			const b = new BuildsModel();
			expect(b.Repository).toEqual(undefined);
			b.Repository = 'test';
			expect(b.Repository).toEqual('test');
		});
		it('should be possible to get/set the builds', () => {
			const b = new BuildsModel();
			expect(b.Builds).toEqual([]);
			b.Builds = ['test'];
			expect(b.Builds).toEqual(['test']);
		});
	});
	describe('testing serialization', () => {
		// Needed to mock the exportedOn object property
		const RealDate = Date;
		const mockDate = isoDate => {
			global.Date = class extends RealDate {
				constructor() {
					super(isoDate);
				}
			};
		};

		afterEach(() => {
			global.Date = RealDate;
		});

		it('serialized object should be as expected', () => {
			const now = new Date();
			// Stop time 🕛
			mockDate(now);
			const b = new BuildsModel('test');
			const expectedObj = {
				repository: 'test',
				builds: [],
				exportedOn: now
			};
			expect(JSON.stringify(b)).toEqual(JSON.stringify(expectedObj));
		});
	});
	describe('testing deserialization', () => {
		it('serialized object should deserialized correctly', () => {
			const b = new BuildsModel('serialize me');
			const serializedB = JSON.stringify(b);
			const deserializedB = BuildsModel.fromJSONString(serializedB);
			expect(deserializedB).toEqual(b);
		});
		it('invalid object should not deserialize, but throw errors instead', () => {
			const failing1 = JSON.stringify({a: ''});
			// Need to pass a function (and not its result) since chai wrap the function to catch errors
			expect(() => BuildsModel.fromJSONString(failing1)).toThrow();
			const failing2 = JSON.stringify({repository: 'test'});
			expect(() => BuildsModel.fromJSONString(failing2)).toThrow();
		});
	});
});
