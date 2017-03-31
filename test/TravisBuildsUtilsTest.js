const assert = require('assert');
const utils = require('../src/TravisBuildsUtils.js');
const readFile = require('fs').readFileSync;

const buildsJSONFile = readFile('./test/builds.json', 'utf-8');
const builds = JSON.parse(buildsJSONFile);

const buildsCount = 10;
const passedCount = 9;
const canceledCount = 1;
const failedCount = 0;

describe('Total Count', () => {
  it('should return 10', () => {
    assert.equal(buildsCount, utils.getBuildsCount(builds));
  });
});

describe('Passed Count', () => {
  it('should return 9', () => {
    assert.equal(passedCount, utils.getSuccessfulBuildsCount(builds));
  });
});

describe('Canceled Count', () => {
  it('should return 1', () => {
    assert.equal(canceledCount, utils.getCanceledBuildsCount(builds));
  });
});

describe('Failed Count', () => {
  it('should return 0', () => {
    assert.equal(failedCount, utils.getFailedBuildsCount(builds));
  });
});
