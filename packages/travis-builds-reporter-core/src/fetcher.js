const fetcher = (function iife() {
  let travisHTTP;

  function spliceBuilds(buildsCount, buildsPerPage) {
    const splicedBuilds = [];
    // start from the latest build
    let currentBuildsIndex = buildsCount;
    while (currentBuildsIndex > buildsPerPage) {
      currentBuildsIndex -= buildsPerPage;
      splicedBuilds.push(currentBuildsIndex);
    }
    return splicedBuilds;
  }

  function fetchBuildsFrom(from, repositoryName) {
    return travisHTTP.get(`/repos/${repositoryName}/builds`, {
      params: {
        after_number: from,
      },
    });
  }

  function validateTravisResponse(response) {
    const thisPageBuilds = response.data.builds;
    return thisPageBuilds != null && thisPageBuilds.length > 0;
  }

  function initializeBuildsInfo(repositoryName) {
    return new Promise((resolve, reject) => {
      fetchBuildsFrom(null, repositoryName).then((response) => {
        if (validateTravisResponse(response)) {
          const thisPageBuilds = response.data.builds;
          const buildsCount = parseInt(thisPageBuilds[0].number, 10);
          const buildsPerPage = thisPageBuilds.length;
          const builds = [];
          builds.push(...thisPageBuilds);
          const info = {
            buildsCount,
            buildsPerPage,
            builds,
          };
          return resolve(info);
        }
        return reject(new Error('Invalid response'));
      }).catch(error => reject(error));
    });
  }

  function fetchAllBuilds(repositoryName) {
    return new Promise((resolve, reject) => {
      initializeBuildsInfo(repositoryName).then((info) => {
        const { builds, buildsCount, buildsPerPage } = info;
        const splicedBuilds = spliceBuilds(buildsCount, buildsPerPage);

        const promise = from => (
          /*
           validation here is not performed:
           if Travis changed API in some ways, we would have caught that error
           in the initializeBuildsInfo (use the same fetchBuildsFrom function)
           */
          fetchBuildsFrom(from, repositoryName)
            .then(response => response.data.builds)
            .catch(error => reject(error))
        );

        const promises = splicedBuilds.map(fromBuild => promise(fromBuild));
        Promise.all(promises)
          .then((result) => {
            result.forEach(partialBuilds => builds.push(...partialBuilds));
            builds.sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10));
            return resolve(builds);
          })
          .catch(error => reject(error));
      }).catch(error => reject(error));
    });
  }

  function fetch(repositoryName, connection) {
    travisHTTP = connection;
    return fetchAllBuilds(repositoryName);
  }

  return {
    fetch,
  };
}());

module.exports = fetcher;
