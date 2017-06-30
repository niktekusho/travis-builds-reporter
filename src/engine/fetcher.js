const fetcher = (function iife() {
  let travisHTTP;

  function fetchAllBuilds(fromBuildNumber, array, repositoryName) {
    return travisHTTP.get(`/repos/${repositoryName}/builds`, {
      params: {
        after_number: fromBuildNumber,
      },
    }).then((response) => {
      console.log(fromBuildNumber);
      const thisPageBuilds = response.data.builds;
      // catch the end of requests chain: response.data is an undefined field after the last request
      // == null check for === null OR === undefined (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
      if (thisPageBuilds == null || thisPageBuilds.length === 0) {
        return array;
      }
      const lastCurrentPageBuildCount = thisPageBuilds[thisPageBuilds.length - 1].number;
      return fetchAllBuilds(
        lastCurrentPageBuildCount,
        array.concat(thisPageBuilds),
        repositoryName);
    }).catch((error) => { throw error; });
  }

  function fetch(array, repositoryName, connection) {
    travisHTTP = connection;
    return fetchAllBuilds(null, array, repositoryName);
  }

  return {
    fetch,
  };
}());

module.exports = fetcher;
