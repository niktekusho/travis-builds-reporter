const getBuildsCountForState = function getBuildsCountForState(builds, state) {
  return builds.filter(value => value.state === state).length;
};

const extractDurations = builds => builds.map(build => build.duration);

module.exports = {

  getMinimumBuildsDuration(builds) {
    // build.duration is a number measured in seconds as of 05/07/2017
    const durations = extractDurations(builds);
    return Math.min(...durations);
  },

  getMaximumBuildsDuration(builds) {
    const durations = extractDurations(builds);
    return Math.max(...durations);
  },

  getAverageBuildsDuration(builds) {
    const durations = extractDurations(builds);
    if (durations.length > 0) {
      return (durations.reduce((sum, newDuration) => sum + newDuration) / durations.length);
    }
    return NaN;
  },

  getBuildsCount(builds) {
    return builds.length;
  },

  getSuccessfulBuildsCount(builds) {
    return getBuildsCountForState(builds, 'passed');
  },

  getCanceledBuildsCount(builds) {
    return getBuildsCountForState(builds, 'canceled');
  },

  getErroredBuildsCount(builds) {
    return getBuildsCountForState(builds, 'errored');
  },

  getFailedBuildsCount(builds) {
    return getBuildsCountForState(builds, 'failed');
  },

  getSuccessfulBuildsRate(builds) {
    return getBuildsCountForState(builds, 'passed') / builds.length;
  },
};