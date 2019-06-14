function getBuildsForState(builds, state) {
	return builds.filter(value => value.state === state);
}

function getBuildsCountForState(builds, state) {
	return getBuildsForState(builds, state).length;
}

function extractDurations(builds) {
	return builds.map(build => build.duration);
}

function extractDateOnly(date) {
	return date.substring(0, 10);
}

const utilities = {
	getMinimumBuildsDuration(builds) {
		// { build.duration } is a number measured in seconds as of 05/07/2017
		const durations = extractDurations(builds);
		return Math.min(...durations);
	},

	getMaximumBuildsDuration(builds) {
		const durations = extractDurations(builds);
		return Math.max(...durations);
	},

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

	getBuildsCount(builds) {
		return builds.length;
	},

	getSuccessfulBuilds(builds) {
		return getBuildsForState(builds, 'passed');
	},

	getSuccessfulBuildsCount(builds) {
		return getBuildsCountForState(builds, 'passed');
	},

	getCanceledBuilds(builds) {
		return getBuildsForState(builds, 'canceled');
	},

	getCanceledBuildsCount(builds) {
		return getBuildsCountForState(builds, 'canceled');
	},

	getErroredBuilds(builds) {
		return getBuildsForState(builds, 'errored');
	},

	getErroredBuildsCount(builds) {
		return getBuildsCountForState(builds, 'errored');
	},

	getFailedBuilds(builds) {
		return getBuildsForState(builds, 'failed');
	},

	getFailedBuildsCount(builds) {
		return getBuildsCountForState(builds, 'failed');
	},

	getSuccessfulBuildsRate(builds) {
		return getBuildsCountForState(builds, 'passed') / builds.length;
	},

	generateReport(builds) {
		return {
			total: this.getBuildsCount(builds),
			times: {
				avgDuration: this.getAverageBuildsDuration(builds, 2),
				maxDuration: this.getMaximumBuildsDuration(builds),
				minDuration: this.getMinimumBuildsDuration(builds)
			},
			stats: {
				successfulCount: this.getSuccessfulBuildsCount(builds),
				canceledCount: this.getCanceledBuildsCount(builds),
				failedCount: this.getFailedBuildsCount(builds),
				erroredCount: this.getErroredBuildsCount(builds),
				successRate: (this.getSuccessfulBuildsRate(builds) * 100).toFixed(2)
			}
		};
	}
};

module.exports = utilities;
