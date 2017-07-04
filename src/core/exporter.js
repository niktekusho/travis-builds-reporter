const exporter = (function iife() {
  function create(builds, repositoryName) {
    if (builds == null) {
      throw new Error('Missing builds argument');
    }

    if (repositoryName == null) {
      throw new Error('Missing repository name argument');
    }

    if (Array.isArray(builds)) {
      return {
        repository: repositoryName,
        builds,
      };
    }
    throw new Error('Builds argument is not an array');
  }

  return {
    create,
  };
}());

module.exports = exporter;
