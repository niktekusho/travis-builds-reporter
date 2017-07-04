const expect = require('chai').expect;
const exporter = require('../src/exporter');

describe('Exporter module Test Suite', () => {
  describe('when passing fake but right args', () => {
    it('should return the expected object', () => {
      const builds = [{
        id: 216708154,
        repository_id: 12735279,
        commit_id: 62362078,
        number: '4',
        event_type: 'push',
        pull_request: false,
        pull_request_title: null,
        pull_request_number: null,
        config: [],
        state: 'passed',
        started_at: '2017-03-30T10:44:08Z',
        finished_at: '2017-03-30T10:45:52Z',
        duration: 104,
        job_ids: [],
      },
      {
        id: 216693298,
        repository_id: 12735279,
        commit_id: 62357433,
        number: '3',
        event_type: 'push',
        pull_request: false,
        pull_request_title: null,
        pull_request_number: null,
        config: [],
        state: 'canceled',
        started_at: '2017-03-30T09:50:51Z',
        finished_at: '2017-03-30T09:53:31Z',
        duration: 160,
        job_ids: [],
      }];
      const repoName = 'test';
      const expectedObj = {
        repository: repoName,
        builds,
      };
      expect(exporter.create(builds, repoName)).to.deep.equal(expectedObj);
    });
  });
  describe('when testing for type checking', () => {
    describe('when builds is undefined or null', () => {
      it('should throw an Error', () => {
        expect(() => exporter.create(undefined)).to.throw('Missing builds argument');
        expect(() => exporter.create(null)).to.throw('Missing builds argument');
      });
    });
    describe('when repository name is undefined or null', () => {
      it('should throw an Error', () => {
        expect(() => exporter.create([], undefined)).to.throw('Missing repository name argument');
        expect(() => exporter.create([], null)).to.throw('Missing repository name argument');
      });
    });
    describe('when builds is defined but not an array', () => {
      it('should throw an Error', () => {
        expect(() => exporter.create({}, 'test')).to.throw('Builds argument is not an array');
      });
    });
  });
});