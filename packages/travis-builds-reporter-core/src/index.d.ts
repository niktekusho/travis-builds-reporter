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

	/**
	 * Report object
	 */
	export interface Report {
		/**
		 * Number of builds examined
		 */
		total: number;
		/**
		 * Builds times stats
		 */
		times: {
			/**
			 * Average duration (same as getAverageBuildsDuration)
			 */
			avgDuration: number,
			/**
			 * Maximum duration (same as getMaximumBuildsDuration)
			 */
			maxDuration: number,
			/**
			 * Minimum duration (same as getMinimumBuildsDuration)
			 */
			minDuration: number
		},
		/**
		 * Builds count stats
		 */
		stats: {
			/**
			 * Successful count (same as getSuccessfulBuildsCount)
			 */
			successfulCount: number,
			/**
			 * Canceled count (same as getCanceledBuildsCount)
			 */
			canceledCount: number,
			/**
			 * Failed count (same as getFailedBuildsCount)
			 */
			failedCount: number,
			/**
			 * Errored count (same as getErroredBuildsCount)
			 */
			erroredCount: number,
			/**
			 * Successful builds rate (0 <= x <= 100)
			 */
			successRate: number
		}
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
		 * Get the shortest build duration.
		 * @returns Shortest builds duration in seconds.
		 */
		getMinimumBuildsDuration: () => number

		/**
		 * Get the longest build duration.
		 * @returns Longest builds duration in seconds.
		 */
		getMaximumBuildsDuration: () => number

		/**
		 * Get the average duration.
		 * @param decimals Number of decimals to round the average. By default this is `undefined`.
		 *
		 * @returns Average builds duration in seconds (eventually rounded to specified decimals).
		 */
		getAverageBuildsDuration: (decimals?: number) => number

		/**
		 * Get an array of arrays of builds divided by date. Builds are in the same child array if and only if `build.started_at` or `build.finished_at` are the same date.
		 * @returns Array of arrays of builds divided by date. Builds are in the same child array if and only if `build.started_at` or `build.finished_at` are the same date (time is ignored).
		 */
		sliceBuildsByDate: () => object[][]

		/**
		 * Get an array containing only successful builds.
		 * @returns Builds in the `passed` state.
		 */
		getSuccessfulBuilds: () => object[]

		/**
		 * Get the number of successful builds.
		 * @returns Number of builds in the `passed` state.
		 */
		getSuccessfulBuildsCount: ()=> number

		/**
		 * Get an array containing only canceled builds.
		 * @returns Builds in the `canceled` state.
		 */
		getCanceledBuilds: () => object[]

		/**
		 * Get the number of canceled builds.
		 * @returns Number of builds in the `canceled` state.
		 */
		getCanceledBuildsCount: ()=> number

		/**
		 * Get an array containing only errored builds.
		 * @returns Builds in the `errored` state.
		 */
		getErroredBuilds: () => object[]

		/**
		 * Get the number of errored builds.
		 * @returns Number of builds in the `errored` state.
		 */
		getErroredBuildsCount: ()=> number

		/**
		 * Get an array containing only failed builds.
		 * @returns Builds in the `failed` state.
		 */
		getFailedBuilds: () => object[]

		/**
		 * Get the number of failed builds.
		 * @returns Number of builds in the `failed` state.
		 */
		getFailedBuildsCount: ()=> number

		/**
		 * Get the percentage of successful builds.
		 * @returns Percentage of successful builds.
		 */
		getSuccessfulBuildsRate: ()=> number

		/**
		 * Generate a report object containing all metrics exposed by this module.
		 * @returns Report instance
		 */
		generateReport: () => TravisBuildsReporterCore.Report

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
