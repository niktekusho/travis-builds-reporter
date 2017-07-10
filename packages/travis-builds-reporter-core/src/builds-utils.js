const getBuildsForState = (builds, state) => (
  builds.filter(value => value.state === state)
);

const getBuildsCountForState = (builds, state) => getBuildsForState(builds, state).length;

const extractDurations = builds => builds.map(build => build.duration);

const extractDateOnly = date => date.substring(0, 10);

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

  getAverageBuildsDuration(builds, decimals) {
    const durations = extractDurations(builds);
    if (durations.length > 0) {
      const totalDuration = durations.reduce((sum, newDuration) => sum + newDuration);
      const average = totalDuration / durations.length;
      if (decimals && typeof decimals === 'number') {
        return +average.toFixed(decimals);
      }
      return average;
    }
    return NaN;
  },

  sliceBuildsByDate(builds) {
    // key will be date only (YYYY-MM-DD), value will be array of builds with that started_at date
    const dateKeysMap = new Map();
    let build;
    const filterFunc = entry => (
      extractDateOnly(entry.started_at) === extractDateOnly(build.started_at)
    );
    for (let i = 0; i < builds.length; i += 1) {
      build = builds[i];
      const buildDateTime = extractDateOnly(build.started_at);
      // if the key is present, its return value will be != null and we can skip insertion in map
      if (dateKeysMap.get(buildDateTime) == null) {
        dateKeysMap.set(buildDateTime, builds.filter(filterFunc));
      }
    }
    return Array.from(dateKeysMap.values());
  },

  getBuildsCount(builds) {
    return builds.length;
  },

  getSuccessfulBuilds(builds) {
    return getBuildsForState(builds, 'passed');
  },

  getSuccessfulBuildsCount(builds) {
    return getBuildsCountForState(builds, 'passed');
  },

  getCanceledBuilds(builds) {
    return getBuildsForState(builds, 'canceled');
  },

  getCanceledBuildsCount(builds) {
    return getBuildsCountForState(builds, 'canceled');
  },

  getErroredBuilds(builds) {
    return getBuildsForState(builds, 'errored');
  },

  getErroredBuildsCount(builds) {
    return getBuildsCountForState(builds, 'errored');
  },

  getFailedBuilds(builds) {
    return getBuildsForState(builds, 'failed');
  },

  getFailedBuildsCount(builds) {
    return getBuildsCountForState(builds, 'failed');
  },

  getSuccessfulBuildsRate(builds) {
    return getBuildsCountForState(builds, 'passed') / builds.length;
  },
};
