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
});
