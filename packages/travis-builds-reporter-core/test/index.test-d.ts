import {expectType} from 'tsd';

import TravisBuildsReporter = require('../src');

expectType<Function>(TravisBuildsReporter.client.create);
expectType<Function>(TravisBuildsReporter.exporter.create);
expectType<Function>(TravisBuildsReporter.fetcher.fetch);

expectType<TravisBuildsReporter.BuildsModel>(new TravisBuildsReporter.BuildsModel('test', []));
expectType<Partial<TravisBuildsReporter.BuildsModel>>(new TravisBuildsReporter.BuildsModel('test', []).toJSON());
expectType<TravisBuildsReporter.BuildsModel.JSONBuildsModel>(new TravisBuildsReporter.BuildsModel('test', []).toJSON());
expectType<any[]>(new TravisBuildsReporter.BuildsModel('test', []).Builds);
expectType<string>(new TravisBuildsReporter.BuildsModel('test', []).Repository);
