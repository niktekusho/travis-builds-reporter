const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const fetcher = require('../../src/core/fetcher');

const connection = axios.create();

// This sets the mock adapter on axios instance
const mock = new MockAdapter(connection);

describe('Fetcher Unit tests', () => {
  const fakeRepo = 'fake';
  describe('when everything is right', () => {
    before(() => {
      // Mock any GET request to /users
      // arguments for reply are (status, data, headers)
      const firstParam = { params: { after_number: null } };
      mock.onGet(`/repos/${fakeRepo}/builds`, firstParam).reply(200, {
        builds: [
          { id: 216708735, number: '1' },
          { id: 216708154, number: '0' },
        ],
      });

      const secondParam = { param: { after_number: 0 } };
      mock.onGet(`/repos/${fakeRepo}/builds`, secondParam).reply(200, {
        builds: [],
      });
    });

    after(() => {
      mock.reset();
    });

    it('should fetch from mocked Travis server and print', () => {
      const array = [];
      fetcher.fetch(array, fakeRepo, connection, console.log)
        .then((builds) => {
          expect(builds).to.be.an('array');
          expect(builds.length).to.equal(2);
        });
    });

    it('should fetch from mocked Travis server', () => {
      const array = [];
      fetcher.fetch(array, fakeRepo, connection)
        .then((builds) => {
          expect(builds).to.be.an('array');
          expect(builds.length).to.equal(2);
        });
    });
  });

  describe('when something is not working', () => {
    before(() => {
      mock.onGet(`/repos/${fakeRepo}/builds`).networkError();
    });

    after(() => {
      mock.reset();
    });

    it('should throw an error', () => (
      expect(fetcher.fetch([], fakeRepo, connection)).to.eventually.be.rejected
    ));
  });

  after(() => {
    mock.restore();
  });
});
