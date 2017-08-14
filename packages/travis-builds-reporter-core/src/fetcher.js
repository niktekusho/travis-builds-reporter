/**
 * Builds fetcher module.
 * @module travis-builds-reporter-core/fetcher
 */
const fetcher = (function iife() {
  let travisHTTP;

  /**
   * @function
   * @description Given the total builds count, this method create an array of
   *  builds index that can be used to spawn multiple concurrent http requests.
   *
   * @param {number} buildsCount   Total number of builds
   * @param {number} buildsPerPage Number of builds inside a Travis API response (paginated results)
   *
   * @return {array} Array of indexes that can be used to query Travis APIs
   */
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

  /**
   * @function
   * @description Method that start the HTTP calls to Travis API.
   *
   * @param {number} from Start index of the call (paginated results)
   * @param {string} repositoryName Name of the repository
   *
   * @return {Promise<array>} Array of builds from the "from" index when promise fullfills
   */
  function fetchBuildsFrom(from, repositoryName) {
    return travisHTTP.get(`/repos/${repositoryName}/builds`, {
      params: {
        after_number: from,
      },
    });
  }

  /**
   * @function
   * @description Validates Travis response: in the response there must be a
   * a <b>"builds"</b> object that is of type "array".
   *
   * @param {object} response HTTP response from Travis API
   *
   * @return {boolean} <code>true</code> if the response contains needed builds,
   *  <code>false</code> otherwise.
   */
  function validateTravisResponse(response) {
    const thisPageBuilds = response.data.builds;
    return thisPageBuilds != null && thisPageBuilds.length > 0;
  }

  /*
   * first call to Travis APIs in order to:
   * 1) retrieve first builds (up to 25 as of 27/07/2017) and store them for later use
   * 2) initialize array that manages concurrent HTTP calls
   */
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
    /**
     * @function
     * @description Entry point of the fetcher module.
     * This method calls internal methods that:
     * <ol>
     *  <li> validate Travis APIs connections and responses </li>
     *  <li> initialize basic informations needed for the asynchonous fetcher function </li>
     *  <li> actually make the concurrent calls to fetch builds </li>
     * </ol>
     * 
     * @param {string} repositoryName Name of the repository from which the module
     *  will try to fetch builds
     * @param {array} connection Correctly configured axios instance to make HTTP calls
     * (@see module:travis-builds-reporter-core/client)
     * @return {Promise<array>} Array of builds when promise fullfills.
     */
    fetch,
  };
}());

module.exports = fetcher;
