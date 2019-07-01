import {expectType} from 'tsd';

import TravisBuildsReporter = require('../src');

expectType<Function>(TravisBuildsReporter.createClient);
expectType<Function>(TravisBuildsReporter.BuildsModel);

const model = new TravisBuildsReporter.BuildsModel('test', []);

expectType<TravisBuildsReporter.BuildsModel>(model);

expectType<number>(model.getAverageBuildsDuration());

expectType<object[]>(model.getCanceledBuilds());
expectType<number>(model.getCanceledBuildsCount());

expectType<object[]>(model.getErroredBuilds());
expectType<number>(model.getErroredBuildsCount());

expectType<object[]>(model.getFailedBuilds());
expectType<number>(model.getFailedBuildsCount());

expectType<object[]>(model.getSuccessfulBuilds());
expectType<number>(model.getSuccessfulBuildsCount());
expectType<number>(model.getSuccessfulBuildsRate());

expectType<number>(model.getMaximumBuildsDuration());
expectType<number>(model.getMinimumBuildsDuration());

expectType<object[][]>(model.sliceBuildsByDate());

expectType<TravisBuildsReporter.Report>(model.generateReport());

