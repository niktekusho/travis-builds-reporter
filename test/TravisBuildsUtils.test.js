const assert = require('assert');
const utils = require('../src/TravisBuildsUtils.js');
const readFile = require('fs').readFileSync;

describe('TravisBuildsUtils tests', () => {
  const buildsCount = 10;
  const passedCount = 9;
  const canceledCount = 1;
  const failedCount = 0;
  const erroredCount = 0;

  let builds;
  before(() => {
    const buildsJSONFile = readFile('./test/builds.json', 'utf-8');
    builds = JSON.parse(buildsJSONFile);
  });

  it('Total builds count should return 10', () => {
    assert.equal(utils.getBuildsCount(builds), buildsCount);
  });

  it('Passed builds count should return 9', () => {
    assert.equal(utils.getSuccessfulBuildsCount(builds), passedCount);
  });

  it('Canceled builds count should return 1', () => {
    assert.equal(utils.getCanceledBuildsCount(builds), canceledCount);
  });

  it('Failed builds count should return 0', () => {
    assert.equal(utils.getFailedBuildsCount(builds), failedCount);
  });

  it('Errored builds count should return 0', () => {
    assert.equal(utils.getErroredBuildsCount(builds), erroredCount);
  });

  it('Successful builds rate', () => {
    const rate = passedCount / buildsCount;
    assert.equal(utils.getSuccessfulBuildsRate(builds), rate);
  });
});
