const axios = require('axios');
const TravisBuildsUtils = require('./src/TravisBuildsUtils');
const prompt = require('prompt');

// setup Travis HTTP object
const travisHTTP = axios.create({
  baseURL: 'https://api.travis-ci.org',
  timeout: 10000,
  headers: {
    'User-Agent': 'MyClient/1.0.0',
    Accept: 'application/vnd.travis-ci.2+json',
    Host: 'api.travis-ci.org',
  },
});

// define prompt input schema
const properties = [
  {
    name: 'repositoryName',
  },
];

// define prompt error function
function onErr(err) {
  console.log(err);
  return 1;
}

function fetchAllBuilds(fromBuildNumber, array, repositoryName) {
  return travisHTTP.get(`/repos/${repositoryName}/builds`, {
    params: {
      after_number: fromBuildNumber,
    },
  }).then((response) => {
    console.log(fromBuildNumber);
    const thisPageBuilds = response.data.builds;
    // catch the end of requests chain: response.data is an undefined field after the last request
    if (thisPageBuilds === null || thisPageBuilds === undefined || thisPageBuilds.length === 0) {
      return array;
    }
    const lastCurrentPageBuildCount = thisPageBuilds[thisPageBuilds.length - 1].number;
    return fetchAllBuilds(lastCurrentPageBuildCount, array.concat(thisPageBuilds), repositoryName);
  });
}

const beginCommunication = function begin(repositoryName) {
  console.log('Fetching builds...');
  return fetchAllBuilds(null, [], repositoryName);
};

console.log('This tool returns basic builds statistics for a Travis enabled PUBLIC-ONLY repository.');
prompt.start();

prompt.get(properties, (err, result) => {
  if (err) { return onErr(err); }
  return beginCommunication(result.repositoryName)
  .then((builds) => {
    console.log(`Total builds count: ${TravisBuildsUtils.getBuildsCount(builds)}`);
    console.log(`Successful builds count: ${TravisBuildsUtils.getSuccessfulBuildsCount(builds)}`);
    console.log(`Canceled builds count: ${TravisBuildsUtils.getCanceledBuildsCount(builds)}`);
    console.log(`Failed builds count: ${TravisBuildsUtils.getFailedBuildsCount(builds)}`);
    console.log(`Successful builds rate: ${(TravisBuildsUtils.getSuccessfulBuildsRate(builds) * 100).toFixed(2)}%`);
  })
  .catch((error) => {
    console.log(error);
  });
});
