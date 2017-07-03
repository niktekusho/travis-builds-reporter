const client = (function iife() {
  // setup Travis axios instance
  function create(axiosPackage, userAgent) {
    let ua = 'MyClient/1.0.0';
    if (userAgent) {
      ua = userAgent;
    }
    return axiosPackage.create({
      baseURL: 'https://api.travis-ci.org',
      timeout: 10000,
      headers: {
        'User-Agent': ua,
        Accept: 'application/vnd.travis-ci.2+json',
        Host: 'api.travis-ci.org',
      },
    });
  }

  return {
    create,
  };
}());

module.exports = client;
