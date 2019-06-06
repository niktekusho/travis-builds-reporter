// Type definitions for travis-builds-reporter-utils 1.0.0
// Project: travis-builds-reporter-utils
// Definitions by: niktekusho <https://github.com/niktekusho>

/**
 * Object that contains utility functions
 */
declare const utils: {
	/**
	 * Get the shortest builds duration.
	 * @param {object[]} builds Array of build objects. Each build object must have a duration property of type "number".
	 * @returns {number} Shortest builds duration in seconds.
	 */
	getMinimumBuildsDuration: (builds: object[]) => number

	/**
	 * Get the longest builds duration.
	 * @param {object[]} builds   Array of build objects. Each
	 *  build object must have a duration property of type "number".
	 * @returns {number} Longest builds duration in seconds.
	 */
	getMaximumBuildsDuration: (builds: object[]) => number

	/**
	 * Get the average amongst specified builds.
	 * @param {object[]} builds   Array of build objects. Each build object must have a duration property of type "number".
	 * @param {number} [decimals=undefined] Number of decimals to round the average.
	 * @returns {number} Average builds duration in seconds (eventually rounded to specified decimals).
	 */
	getAverageBuildsDuration: (builds: object[], decimals?: number) => number

	/**
	 * Get an array of arrays of builds divided by date. Builds are in the same child array if and only if build.started_at or build.finished_at are the same date.
	 * @param {object[]} builds Array of build objects. Each build object must have at least one of 2 properties: started_at or finished_at (type "Date"). Priority is given to started_at property.
	 * @returns {object[][]} Array of arrays of builds divided by date. Builds are in the same child array if and only if build.started_at or build.finished_at are the same date (time is ignored).
	 */
	sliceBuildsByDate: (builds: object[]) => object[][]

	/**
	 * Get an array containing only successful builds.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {object[]} Builds in the "passed" state.
	 */
	getSuccessfulBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of successful builds in the specified argument.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {number} Number of builds in the "passed" state.
	 */
	getSuccessfulBuildsCount: (builds: object[])=> number

	/**
	 * Get an array containing only canceled builds.
	 * @param {object[]} builds   Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {object[]} Builds in the "canceled" state.
	 */
	getCanceledBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of canceled builds in the specified argument.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {number} Number of builds in the "canceled" state.
	 */
	getCanceledBuildsCount: (builds: object[])=> number

	/**
	 * Get an array containing only errored builds.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {object[]} Builds in the "errored" state.
	 */
	getErroredBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of errored builds in the specified argument.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {number} Number of builds in the "errored" state.
	 */
	getErroredBuildsCount: (builds: object[])=> number

	/**
	 * Get an array containing only failed builds.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {object[]} Builds in the "failed" state.
	 */
	getFailedBuilds: (builds: object[]) => object[]

	/**
	 * Get the number of failed builds in the specified argument.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {number} Number of builds in the "failed" state.
	 */
	getFailedBuildsCount: (builds: object[])=> number

	/**
	 * Get the percentage of successful builds in the specified argument.
	 * @param {object[]} builds Array of build objects. Each build object must have the "state" property (type "string").
	 * @returns {number} Percentage of successful builds.
	 */
	getSuccessfulBuildsRate: (builds: object[])=> number
}

export = utils;
