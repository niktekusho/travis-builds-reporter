import BuildsModel = require('./model');

/**
 * Object that let you build
 */
declare const exporter: {
	/** Creates a serializable object containing repository name and the complete builds history.
	 * @param {object[]} builds Array containing builds history
	 * @param {string} repositoryName Name of the repository from which builds were fetched
	 * @throws {Error} if <b>at least</b> one argument is undefined or if the builds parameter is not an array.
	 * @return {BuildsModel} Serializable object
	 */
	create: (builds: object[], repositoryName?: string) => BuildsModel;
}

export = exporter;
