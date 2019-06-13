import {expectType} from 'tsd';

import TravisBuildsReporter = require('../src');

expectType<Function>(TravisBuildsReporter.createClient);
expectType<Function>(TravisBuildsReporter.BuildsModel);

expectType<TravisBuildsReporter.BuildsModel>(new TravisBuildsReporter.BuildsModel('test', []));
