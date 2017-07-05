const assert = require('chai').assert;
const utils = require('../src/builds-utils.js');
const readFile = require('fs').readFileSync;

describe('builds-utils tests', () => {
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

  it('Minimum builds duration', () => {
    const durations = builds.map(build => build.duration);
    const min = Math.min(...durations);
    assert.equal(utils.getMinimumBuildsDuration(builds), min);
  });

  it('Maximum builds duration', () => {
    const durations = builds.map(build => build.duration);
    const max = Math.max(...durations);
    assert.equal(utils.getMaximumBuildsDuration(builds), max);
  });

  it('Average builds duration', () => {
    const durations = builds.map(build => build.duration);
    let sum = 0;
    for (let i = 0; i < durations.length; i += 1) {
      sum += durations[i];
    }
    const average = sum / durations.length;
    assert.equal(utils.getAverageBuildsDuration(builds), average);
  });

  it('Average builds duration rounding', () => {
    const durations = builds.map(build => build.duration);
    let sum = 0;
    for (let i = 0; i < durations.length; i += 1) {
      sum += durations[i];
    }
    const average = sum / durations.length;
    assert.equal(utils.getAverageBuildsDuration(builds, 3), Math.round(average, 3));
  });

  it('Average builds duration NaN (builds length = 0)', () => {
    const durations = [];
    assert.isNaN(utils.getAverageBuildsDuration(durations));
  });
});
