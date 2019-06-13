// Type definitions for travis-builds-reporter-core 1.0.0
// Project: travis-builds-reporter-core
// Definitions by: niktekusho <https://github.com/niktekusho>

import {AxiosInstance, AxiosRequestConfig} from 'axios';

declare namespace TravisBuildsReporterCore {
	export interface ClientOptions  {
		/**
		 * Custom user agent.
		 *
		 * @default 'niktekusho/travis-builds-reporter-core/1.0.0'
		 */
		readonly userAgent?: string;
		/**
		 * Requests timeout.
		 *
		 * @default 10000
		 */
		readonly timeout?: number;
		/**
		 * Base url to fetch builds from.
		 *
		 * @default 'https://api.travis-ci.org' (Open Source Travis APIs).
		 */
		readonly baseURL?: string;
		/**
		 * Host to fetch builds from.
		 *
		 * @default 'api.travis-ci.org' (Open Source Travis APIs).
		 */
		readonly host?: string;
	}

	export class BuildsModel {
		constructor(repository: string, builds: any[], exportedOn?: Date);

		/**
		 * Repository from which the library retrieved the builds
		 */
		repository: string;
		/**
		 * Array of all builds
		 */
		builds: any[];
		/**
		 * Date in which the builds are retrieved
		 */
		exportedOn?: Date;

		/**
		 * Deserialization method with additional validation.
		 *
		 * Checks that repository and builds are defined in the parsed object.
		 *
		 */
		static fromJSONString: (json: string) => BuildsModel
	}

	/**
	 * Creates a preconfigured axios instance that works with the public Travis APIs.
	 *
	 * @param {TravisBuildsReporterCore.ClientOptions} options Client options.
	 *
	 * @returns {AxiosInstance} Configured axios instance
	 */
	export function createClient(options?: TravisBuildsReporterCore.ClientOptions): AxiosInstance

	/**
	* This function does the following:
	*
	* - validates Travis APIs connections and responses
	* - initializes basic informations needed for the asynchonous fetcher function
	* - actually makes the concurrent calls to fetch builds
	*
	* @param client Correctly configured axios instance to make HTTP calls (createClient function provides one)
	* @param repository Name of the repository from which the module will try to fetch builds
	* @returns {Promise<BuildsModel>}
	*/
	export function fetch(client: AxiosInstance, repository: string): Promise<BuildsModel>
}

export = TravisBuildsReporterCore;
