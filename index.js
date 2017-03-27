const axios = require('axios');
const TravisBuildsUtils = require('./src/TravisBuildsUtils');
const prompt = require('prompt');

let travisAccessToken = '';
let githubAuthId;

// setup the 2 axios instances: one for github and the other one for travis ci http interfaces
function createGitHubHTTP(username, password) {
  return axios.create({
    baseURL: 'https://api.github.com',
    auth: {
      username,
      password,
    },
    'Content-Type': 'application/json',
  });
}

const travisHTTP = axios.create({
  baseURL: 'https://api.travis-ci.org',
  timeout: 10000,
  headers: {
    'User-Agent': 'MyClient/1.0.0',
    Accept: 'application/vnd.travis-ci.2+json',
    Host: 'api.travis-ci.org',
  },
});

console.log('You will be asked to provide your GitHub credentials in order to create a temporary token.');
console.log('Those information will NOT be disclosed, stored and/or transmitted to services outside of Travis and GitHub.');

const properties = [
  {
    name: 'username',
    validator: /^[a-zA-Z\d\s-]+$/,
    warning: 'Username can be letters, digits, spaces, or dashes',
  },
  {
    name: 'password',
    hidden: true,
  },
  {
    name: 'repositoryName',
  },
];

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

const beginCommunication = function begin(username, password, repositoryName) {
  const githubHTTP = createGitHubHTTP(username, password);
  githubHTTP.post('/authorizations', {
    scopes: [
      'read:org', 'user:email', 'repo_deployment',
      'repo:status',
      'public_repo', 'write:repo_hook',
    ],
    note: 'temporary token to auth against travis',
  }).then((response) => {
    console.log('Temporary GitHub token created.');
    console.log('Using the created GitHub temporary token to authenticate against Travis...');
    githubAuthId = response.data.id;
    return travisHTTP.post('/auth/github', {
      github_token: response.data.token,
    });
  }).then((response) => {
    console.log('Travis authentication succeded.');
    travisAccessToken = response.data.access_token;
    travisHTTP.defaults.headers.Authorization = `token ${travisAccessToken}`;

    // now we can delete the temporary github token
    return githubHTTP.delete(`/authorizations/${githubAuthId}`);
  }).then(() => {
    console.log('Github temporary token successfully deleted.');
    console.log('Fetching builds...');
    return fetchAllBuilds(null, [], repositoryName);
  })
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
};

prompt.start();

prompt.get(properties, (err, result) => {
  if (err) { return onErr(err); }
  return beginCommunication(result.username, result.password, result.repositoryName);
});
