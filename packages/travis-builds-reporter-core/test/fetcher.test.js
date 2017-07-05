const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const fetcher = require('../src/fetcher');

const connection = axios.create();

// This sets the mock adapter on axios instance
const mock = new MockAdapter(connection);

const generateLongBuilds = () => {
  const array = [];
  for (let i = 30; i > 0; i -= 1) {
    array.push({ id: 10000 + i, number: i.toString() });
  }
  return array;
};

describe('Fetcher Unit tests', () => {
  const fakeRepo = 'fake';
  describe('when everything is right', () => {
    before(() => {
      // Mock any GET request to /users
      // arguments for reply are (status, data, headers)
      mock.onGet(`/repos/${fakeRepo}/builds`).reply(200, {
        builds: [
          { id: 216708735, number: '1' },
          { id: 216708154, number: '0' },
        ],
      });
    });

    after(() => {
      mock.reset();
    });

    it('should fetch from mocked Travis server', () => {
      fetcher.fetch(fakeRepo, connection)
        .then((builds) => {
          expect(builds).to.be.an('array');
          expect(builds.length).to.equal(2);
        });
    });
  });

  describe('when testing for paginated results', () => {
    before(() => {
      // Mock any GET request to /users
      // arguments for reply are (status, data, headers)
      const longTest = { params: { after_number: null } };
      const longBuilds = generateLongBuilds();
      mock.onGet(`/repos/${fakeRepo}/builds`, longTest).reply(200, {
        builds: longBuilds.slice(0, 20),
      });

      const secondPart = { param: { after_number: 10 } };
      mock.onGet(`/repos/${fakeRepo}/builds`, secondPart).reply(200, {
        builds: longBuilds.slice(20),
      });
    });

    after(() => {
      mock.reset();
    });

    it('should fetch from mocked Travis server', () => {
      fetcher.fetch(fakeRepo, connection)
        .then((builds) => {
          expect(builds).to.be.an('array');
          expect(builds.length).to.equal(30);
        });
    });
  });

  describe('when something is not working', () => {
    describe('and it is the network (first call)', () => {
      before(() => {
        mock.onGet(`/repos/${fakeRepo}/builds`).networkError();
      });

      after(() => {
        mock.reset();
      });

      it('should throw an error', () => (
        expect(fetcher.fetch(fakeRepo, connection)).to.eventually.be.rejected
      ));
    });

    describe('and it is the network (NOT first call)', () => {
      before(() => {
        const longTest = { params: { after_number: null } };
        const longBuilds = generateLongBuilds();
        mock.onGet(`/repos/${fakeRepo}/builds`, longTest).reply(200, {
          builds: longBuilds.slice(0, 20),
        });

        const secondPart = { param: { after_number: 10 } };
        mock.onGet(`/repos/${fakeRepo}/builds`, secondPart).networkError();
      });

      after(() => {
        mock.reset();
      });

      it('should throw an error', () => (
        expect(fetcher.fetch(fakeRepo, connection)).to.eventually.be.rejected
      ));
    });

    describe('and it is a change in Travis response', () => {
      before(() => {
        mock.onGet(`/repos/${fakeRepo}/builds`).reply(200, {
          NEW_builds: generateLongBuilds(),
        });
      });

      after(() => {
        mock.reset();
      });

      it('should throw an error', () => (
        expect(fetcher.fetch(fakeRepo, connection)).to.eventually.be.rejected
      ));
    });
  });

  after(() => {
    mock.restore();
  });
});
