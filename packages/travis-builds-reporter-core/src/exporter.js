/**
 * Builds exporter module.
 * @module travis-builds-reporter-core/exporter
 */

const exporter = (function iife() {
  function create(builds, repositoryName) {
    if (builds == null) {
      throw new Error('Missing builds argument');
    }

    if (repositoryName == null) {
      throw new Error('Missing repository name argument');
    }

    if (Array.isArray(builds)) {
      return {
        repository: repositoryName,
        builds,
      };
    }
    throw new Error('Builds argument is not an array');
  }

  return {
    /**
     * @function
     * @description Creates a serializable object containing metadata (repository name, TODO)
     * and the complete builds history.
     * @param {array} builds         Array containing builds history
     * @param {string} repositoryName Name of the repository from which builds were fetched
     * @throws {Error} if <b>at least</b> one argument is undefined or
     *  if the builds parameter is not an array.
     * @return {TBD} Serializable object
     */
    create,
  };
}());

module.exports = exporter;
