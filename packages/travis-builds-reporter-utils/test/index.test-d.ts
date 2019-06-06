import {expectType} from 'tsd';

import utils = require('../src');

expectType<number>(utils.getAverageBuildsDuration([]));

expectType<object[]>(utils.getCanceledBuilds([]));
expectType<number>(utils.getCanceledBuildsCount([]));

expectType<object[]>(utils.getErroredBuilds([]));
expectType<number>(utils.getErroredBuildsCount([]));

expectType<object[]>(utils.getFailedBuilds([]));
expectType<number>(utils.getFailedBuildsCount([]));

expectType<object[]>(utils.getSuccessfulBuilds([]));
expectType<number>(utils.getSuccessfulBuildsCount([]));
expectType<number>(utils.getSuccessfulBuildsRate([]));

expectType<number>(utils.getMaximumBuildsDuration([]));
expectType<number>(utils.getMinimumBuildsDuration([]));

expectType<object[][]>(utils.sliceBuildsByDate([]));
