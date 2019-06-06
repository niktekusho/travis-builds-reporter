/**
 * Utilities module
 * @module travis-builds-reporter-utils
 */

const getBuildsForState = (builds, state) => (
	builds.filter(value => value.state === state)
);

const getBuildsCountForState = (builds, state) => getBuildsForState(builds, state).length;

const extractDurations = builds => builds.map(build => build.duration);

const extractDateOnly = date => date.substring(0, 10);

const utilities = {
	/**
	 * @function getMinimumBuildsDuration
	 * @description Get the shortest builds duration.
	 * @param {array} builds   Array of build objects. Each
	 *  build object must have a duration property of type "number".
	 * @returns {number} Shortest builds duration in seconds.
	 */
	getMinimumBuildsDuration(builds) {
		// { build.duration } is a number measured in seconds as of 05/07/2017
		const durations = extractDurations(builds);
		return Math.min(...durations);
	},

	/**
	 * @function getMaximumBuildsDuration
	 * @description Get the longest builds duration.
	 * @param {array} builds   Array of build objects. Each
	 *  build object must have a duration property of type "number".
	 * @returns {number} Longest builds duration in seconds.
	 */
	getMaximumBuildsDuration(builds) {
		const durations = extractDurations(builds);
		return Math.max(...durations);
	},

	/**
	 * @function getAverageBuildsDuration
	 * @description Get the average amongst specified builds.
	 * @param {array} builds   Array of build objects. Each
	 *  build object must have a duration property of type "number".
	 * @param {number} [decimals=undefined] Number of decimals to round the average.
	 * @returns {number} Average builds duration in seconds (eventually rounded to
	 *  specified decimals).
	 */
	getAverageBuildsDuration(builds, decimals) {
		const durations = extractDurations(builds);
		if (durations.length > 0) {
			const totalDuration = durations.reduce((sum, newDuration) => sum + newDuration);
			const average = totalDuration / durations.length;
			if (decimals && typeof decimals === 'number') {
				return Number(average.toFixed(decimals));
			}

			return average;
		}

		return NaN;
	},

	/**
	 * @function sliceBuildsByDate
	 * @description Get an array of arrays of builds divided by date. Builds are
	 *  in the same child array if and only if build.started_at or build.finished_at
	 *  are the same date.
	 * @param {array} builds   Array of build objects. Each build object must
	 *  have at least one of 2 properties: started_at or finished_at (type "Date").
	 * Priority is given to started_at property.
	 * @returns {array} Array of arrays of builds divided by date. Builds are
	 *  in the same child array if and only if build.started_at or build.finished_at
	 *  are the same date (time is ignored).
	 */
	sliceBuildsByDate(builds) {
		// Key will be date only (YYYY-MM-DD), value will be array of builds with that started_at date
		const dateKeysMap = new Map();
		let build;
		const filterFunc = entry => {
			// Pick one that hopefully isn't null
			const entryDate = entry.started_at || entry.finished_at;
			const buildDate = build.started_at || build.finished_at;
			return extractDateOnly(entryDate) === extractDateOnly(buildDate);
		};

		for (let i = 0; i < builds.length; i += 1) {
			build = builds[i];
			const buildDateTime = extractDateOnly(build.started_at || build.finished_at);
			// If the key is present, its return value will be != null and we can skip insertion in map
			const existingValue = dateKeysMap.get(buildDateTime);
			if (existingValue === null || existingValue === undefined) {
				dateKeysMap.set(buildDateTime, builds.filter(filterFunc));
			}
		}

		return [...dateKeysMap.values()];
	},

	/**
	 * @function getBuildsCount
	 * @description Get the number of builds.
	 * @param {array} builds   Array of build objects.
	 * @returns {number} Length of builds argument.
	 */
	getBuildsCount(builds) {
		return builds.length;
	},

	/**
	 * @function getSuccessfulBuilds
	 * @description Get an array containing only successful builds.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {array} Builds in the "passed" state.
	 */
	getSuccessfulBuilds(builds) {
		return getBuildsForState(builds, 'passed');
	},

	/**
	 * @function getSuccessfulBuildsCount
	 * @description Get the number of successful builds in the specified argument.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {number} Number of builds in the "passed" state.
	 */
	getSuccessfulBuildsCount(builds) {
		return getBuildsCountForState(builds, 'passed');
	},

	/**
	 * @function getCanceledBuilds
	 * @description Get an array containing only canceled builds.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {array} Builds in the "canceled" state.
	 */
	getCanceledBuilds(builds) {
		return getBuildsForState(builds, 'canceled');
	},

	/**
	 * @function getCanceledBuildsCount
	 * @description Get the number of canceled builds in the specified argument.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {number} Number of builds in the "canceled" state.
	 */
	getCanceledBuildsCount(builds) {
		return getBuildsCountForState(builds, 'canceled');
	},

	/**
	 * @function getErroredBuilds
	 * @description Get an array containing only errored builds.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {array} Builds in the "errored" state.
	 */
	getErroredBuilds(builds) {
		return getBuildsForState(builds, 'errored');
	},

	/**
	 * @function getErroredBuildsCount
	 * @description Get the number of errored builds in the specified argument.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {number} Number of builds in the "errored" state.
	 */
	getErroredBuildsCount(builds) {
		return getBuildsCountForState(builds, 'errored');
	},

	/**
	 * @function getFailedBuilds
	 * @description Get an array containing only failed builds.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {array} Builds in the "failed" state.
	 */
	getFailedBuilds(builds) {
		return getBuildsForState(builds, 'failed');
	},

	/**
	 * @function getFailedBuildsCount
	 * @description Get the number of failed builds in the specified argument.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {number} Number of builds in the "failed" state.
	 */
	getFailedBuildsCount(builds) {
		return getBuildsCountForState(builds, 'failed');
	},

	/**
	 * @function getSuccessfulBuildsRate
	 * @description Get the percentage of successful builds in the specified argument.
	 * @param {array} builds   Array of build objects. Each build object must have
	 *  the "state" property (type "string").
	 * @returns {number} Percentage of successful builds.
	 */
	getSuccessfulBuildsRate(builds) {
		return getBuildsCountForState(builds, 'passed') / builds.length;
	}
};

module.exports = utilities;
