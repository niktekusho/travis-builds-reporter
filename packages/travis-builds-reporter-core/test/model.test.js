const expect = require('chai').expect;
const sinon = require('sinon');

const BuildsModel = require('../src/model');

describe('BuildsModel Test Suite', () => {
  describe('when building an object with BuildsModel constructor', () => {
    it('should have the intended properties', () => {
      const b0 = new BuildsModel();
      expect(b0).to.have.property('repository');
      expect(b0).to.have.property('builds');
    });
  });
  describe('testing setters and getters', () => {
    it('should be possible to get/set the repository', () => {
      const b = new BuildsModel();
      expect(b.Repository).to.equal(undefined);
      b.Repository = 'test';
      expect(b.Repository).to.equal('test');
    });
    it('should be possible to get/set the builds', () => {
      const b = new BuildsModel();
      expect(b.Builds).to.deep.equal([]);
      b.Builds = ['test'];
      expect(b.Builds).to.deep.equal(['test']);
    });
  });
  describe('testing serialization', () => {
    it('serialized object should be as expected', () => {
      const now = new Date();
      // stop time 🕛
      const clock = sinon.useFakeTimers(now.getTime());
      const b = new BuildsModel('test');
      const expectedObj = {
        repository: 'test',
        builds: [],
        exportedOn: now,
      };
      expect(JSON.stringify(b)).to.equal(JSON.stringify(expectedObj));
      clock.restore();
    });
  });
  describe('testing deserialization', () => {
    it('serialized object should deserialized correctly', () => {
      const b = new BuildsModel('serialize me');
      const serializedB = JSON.stringify(b);
      const deserializedB = BuildsModel.fromJSONString(serializedB);
      expect(deserializedB).to.deep.equal(b);
    });
    it('invalid object should not deserialize, but throw errors instead', () => {
      const failing1 = JSON.stringify({ a: '' });
      // need to pass a function (and not its result) since chai wrap the function to catch errors 
      expect(() => BuildsModel.fromJSONString(failing1)).to.throw();
      const failing2 = JSON.stringify({ repository: 'test' });
      expect(() => BuildsModel.fromJSONString(failing2)).to.throw();
    });
  });
});