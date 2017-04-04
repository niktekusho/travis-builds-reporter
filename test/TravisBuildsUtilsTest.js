const assert = require('assert');
const utils = require('../src/TravisBuildsUtils.js');
const readFile = require('fs').readFileSync;

describe('TravisBuildsUtils tests', () => {
  const buildsCount = 10;
  const passedCount = 9;
  const canceledCount = 1;
  const failedCount = 0;

  let builds;
  before(() => {
    const buildsJSONFile = readFile('./test/builds.json', 'utf-8');
    builds = JSON.parse(buildsJSONFile);
  });

  it('Total builds count should return 10', () => {
    assert.equal(buildsCount, utils.getBuildsCount(builds));
  });

  it('Passed builds count should return 9', () => {
    assert.equal(passedCount, utils.getSuccessfulBuildsCount(builds));
  });

  it('Canceled builds count should return 1', () => {
    assert.equal(canceledCount, utils.getCanceledBuildsCount(builds));
  });

  it('Failed builds count should return 0', () => {
    assert.equal(failedCount, utils.getFailedBuildsCount(builds));
  });
});
