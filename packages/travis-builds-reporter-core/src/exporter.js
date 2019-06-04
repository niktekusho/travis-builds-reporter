/**
 * Builds exporter module.
 * @module travis-builds-reporter-core/exporter
 */

const BuildsModel = require('./model');

const exporter = (function () {
	function create(builds, repositoryName) {
		if (builds === null || builds === undefined) {
			throw new Error('Missing builds argument');
		}

		if (repositoryName === null || repositoryName === undefined) {
			throw new Error('Missing repository name argument');
		}

		if (Array.isArray(builds)) {
			return new BuildsModel(repositoryName, builds);
		}

		throw new Error('Builds argument is not an array');
	}

	return {
		/**
		 * @function
		 * @description Creates a serializable object containing repository name
		 *  and the complete builds history.
		 * @param {array} builds         Array containing builds history
		 * @param {string} repositoryName Name of the repository from which builds were fetched
		 * @throws {Error} if <b>at least</b> one argument is undefined or
		 *  if the builds parameter is not an array.
		 * @return {BuildsModel} Serializable object
		 */
		create
	};
})();

module.exports = exporter;
