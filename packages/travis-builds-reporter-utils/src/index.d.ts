// Type definitions for travis-builds-reporter-utils 1.0.0
// Project: travis-builds-reporter-utils
// Definitions by: niktekusho <https://github.com/niktekusho>

declare namespace utils {
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
}

/**
 * Object that contains utility functions
 */
declare const utils: {
	/**
	 * Get the shortest builds duration.
	 * @param builds Array of build objects. Each build object must have a duration property of type `number`.
	 * @returns Shortest builds duration in seconds.
	 */
	getMinimumBuildsDuration: (builds: object[]) => number

	/**
	 * Get the longest builds duration.
	 * @param builds   Array of build objects. Each build object must have a duration property of type `number`.
	 * @returns Longest builds duration in seconds.
	 */
	getMaximumBuildsDuration: (builds: object[]) => number

	/**
	 * Get the average amongst specified builds.
	 * @param builds Array of build objects. Each build object must have a duration property of type `number`.
	 * @param decimals Number of decimals to round the average. By default this is `undefined`.
	 *
	 * @returns Average builds duration in seconds (eventually rounded to specified decimals).
	 */
	getAverageBuildsDuration: (builds: object[], decimals?: number) => number

	/**
	 * Get an array of arrays of builds divided by date. Builds are in the same child array if and only if `build.started_at` or `build.finished_at` are the same date.
	 * @param builds Array of build objects. Each build object must have at least one of 2 properties: `started_at` or `finished_at` (type "Date"). Priority is given to `started_at` property.
	 * @returns Array of arrays of builds divided by date. Builds are in the same child array if and only if `build.started_at` or `build.finished_at` are the same date (time is ignored).
	 */
	sliceBuildsByDate: (builds: object[]) => object[][]

	/**
	 * Get an array containing only successful builds.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Builds in the `passed` state.
	 */
	getSuccessfulBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of successful builds in the specified argument.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Number of builds in the `passed` state.
	 */
	getSuccessfulBuildsCount: (builds: object[])=> number

	/**
	 * Get an array containing only canceled builds.
	 * @param builds   Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Builds in the `canceled` state.
	 */
	getCanceledBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of canceled builds in the specified argument.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Number of builds in the `canceled` state.
	 */
	getCanceledBuildsCount: (builds: object[])=> number

	/**
	 * Get an array containing only errored builds.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Builds in the `errored` state.
	 */
	getErroredBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of errored builds in the specified argument.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Number of builds in the `errored` state.
	 */
	getErroredBuildsCount: (builds: object[])=> number

	/**
	 * Get an array containing only failed builds.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Builds in the `failed` state.
	 */
	getFailedBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of failed builds in the specified argument.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Number of builds in the `failed` state.
	 */
	getFailedBuildsCount: (builds: object[])=> number

	/**
	 * Get the percentage of successful builds in the specified argument.
	 * @param builds Array of build objects. Each build object must have the `state` property (type `string`).
	 * @returns Percentage of successful builds.
	 */
	getSuccessfulBuildsRate: (builds: object[])=> number

	/**
	 * Generate a report object containing all metrics exposed by this module.
	 * @param builds Array of build objects. Each object must be a valid Travis [Build](https://developer.travis-ci.com/resource/build) object
	 * @returns Report instance
	 */
	generateReport: (builds: object[]) => utils.Report
}

export = utils;
