import { AxiosInstance } from "axios";

/**
 * Object that builds a configured axios client that works with the public Travis APIs.
 */
declare const fetcher: {
	/**
	 * Entry point of the fetcher module.
	 * This method calls internal methods that:
	 *
	 * - validate Travis APIs connections and responses
	 * - initialize basic informations needed for the asynchonous fetcher function
	 * - actually make the concurrent calls to fetch builds
	 *
	 * @param {string} repositoryName Name of the repository from which the module
	 *  will try to fetch builds
	 * @param {AxiosInstance} connection Correctly configured axios instance to make HTTP calls
	 * (@see module:travis-builds-reporter-core/client)
	 * @returns {Promise<object[]>} Array of builds when promise fullfills.
	 */
	fetch: (repositoryName: string, connection: AxiosInstance) => Promise<object[]>
}

export = fetcher;
