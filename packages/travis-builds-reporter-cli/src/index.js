const axios = require('axios');
const program = require('commander');
const prompt = require('prompt');

const { client, fetcher, buildsUtils } = require('travis-builds-reporter-core');

function setupCommander() {
  program
    .version('1.0.0')
    .option('-r, --repo-name <repositoryName>', 'Specify repository name')
    .parse(process.argv);
}

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

function outputBuildsReport(builds) {
  console.log(`Total builds count: ${buildsUtils.getBuildsCount(builds)}`);
  console.log(`Successful builds count: ${buildsUtils.getSuccessfulBuildsCount(builds)}`);
  console.log(`Canceled builds count: ${buildsUtils.getCanceledBuildsCount(builds)}`);
  console.log(`Failed builds count: ${buildsUtils.getFailedBuildsCount(builds)}`);
  console.log(`Errored builds count: ${buildsUtils.getErroredBuildsCount(builds)}`);
  console.log(`Successful builds rate: ${(buildsUtils.getSuccessfulBuildsRate(builds) * 100).toFixed(2)}%`);
  console.log(`Average builds duration: ${buildsUtils.getAverageBuildsDuration(builds, 4)} s`);
  console.log(`Minimum builds duration: ${buildsUtils.getMinimumBuildsDuration(builds)} s`);
  console.log(`Maximum builds duration: ${buildsUtils.getMaximumBuildsDuration(builds)} s`);
}

const beginCommunication = function begin(repositoryName) {
  console.log('Fetching builds...');
  return fetcher.fetch(repositoryName, client.create(axios));
};

console.log('This tool returns basic builds statistics for a Travis enabled PUBLIC-ONLY repository.');

setupCommander();

// TODO: refactor the following block of code to use promises or at least reduce the duplicated code
if (program.repoName) {
  beginCommunication(program.repoName)
    .then((builds) => {
      outputBuildsReport(builds);
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  prompt.start();
  prompt.get(properties, (err, result) => {
    if (err) { return onErr(err); }
    return beginCommunication(result.repositoryName)
      .then((builds) => {
        outputBuildsReport(builds);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
