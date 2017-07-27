const axios = require('axios');
const sinon = require('sinon');
const client = require('../src/client');

const sandbox = sinon.sandbox.create();

describe('Axios client Test Suite', () => {
  let axiosStub;

  before(() => {
    axiosStub = sandbox.stub(axios, 'create');
  });

  after(() => {
    axiosStub.restore();
  });

  it('should call axios.create with the default params', () => {
    client.create(axios);
    sinon.assert.calledWith(axiosStub, {
      baseURL: 'https://api.travis-ci.org',
      timeout: 10000,
      headers: {
        'User-Agent': 'niktekusho/travis-builds-reporter-core/1.0.0',
        Accept: 'application/vnd.travis-ci.2+json',
        Host: 'api.travis-ci.org',
      },
    });
  });

  it('should call axios.create with the right params', () => {
    client.create(axios, 'test');
    sinon.assert.calledWith(axiosStub, {
      baseURL: 'https://api.travis-ci.org',
      timeout: 10000,
      headers: {
        'User-Agent': 'test',
        Accept: 'application/vnd.travis-ci.2+json',
        Host: 'api.travis-ci.org',
      },
    });
  });
});
