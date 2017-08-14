/**
 * Client configuring module.
 * @module travis-builds-reporter-core/client
 */
const client = (function iife() {
  function create(axiosPackage, userAgent) {
    let ua = 'niktekusho/travis-builds-reporter-core/1.0.0';
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
    /**
     * @function
     * @description Creates a preconfigured axios instance that works with the public Travis APIs.
     *
     * @param {Object} axiosPackage Object returned when requiring/importing
     *  the <b>whole</b> axios package (like in: "const axios = require('axios');")
     * @param {string} [userAgent=niktekusho/travis-builds-reporter-core/1.0.0] Custom user agent.
     *
     * @return {Object} Configured axios instance
     */
    create,
  };
}());

module.exports = client;
