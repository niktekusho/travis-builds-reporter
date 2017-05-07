const getBuildsCountForState = function getBuildsCountForState(builds, state) {
  return builds.filter((value) => {
    if (value.state === state) return true;
    return false;
  }).length;
};

module.exports = {
  getBuildsCount(builds) {
    return builds.length;
  },

  getSuccessfulBuildsCount(builds) {
    return getBuildsCountForState(builds, 'passed');
  },

  getCanceledBuildsCount(builds) {
    return getBuildsCountForState(builds, 'canceled');
  },

  getFailedBuildsCount(builds) {
    return getBuildsCountForState(builds, 'failed');
  },

  getSuccessfulBuildsRate(builds) {
    return getBuildsCountForState(builds, 'passed') / builds.length;
  },
};
