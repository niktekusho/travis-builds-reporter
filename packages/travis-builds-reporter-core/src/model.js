/**
 * Contains model used in exporter module
 * @module travis-builds-reporter-core/model
 */

/**
 * Class that holds 2 basic info:
 * <ol>
 * <li>repository (from which builds have been fetched).</li>
 * <li>builds themselves.</li>
 * </ol>
 */
class BuildsModel {
  /**
   * Create the builds model.
   * @param {string} repository - Repository from which builds have been fetched.
   * @param {array} builds - Builds fetched from a CI provider/service.
   */
  constructor(repository, builds) {
    this.repository = repository;
    // use set "property" (validates input)
    this.Builds = builds;
  }

  /**
   * Get the repository name.
   * @return {string} Repository name
   */
  get Repository() {
    return this.repository;
  }

  /**
   * Set the repository name.
   * @param {string} repository - Repository name
   */
  set Repository(repository) {
    this.repository = repository;
  }

  /**
   * Get the builds list.
   * @return {array} Builds
   */
  get Builds() {
    return this.builds;
  }

  /**
   * Set the builds.
   * @param {array} builds - Builds
   */
  set Builds(builds) {
    if (Array.isArray(builds)) {
      this.builds = builds;
    } else {
      this.builds = [];
    }
  }

  /**
   * "Override" implementation of object's default toJSON().
   * <p><strong>Gets automatically called by `JSON.stringify(obj);`</strong></p>
   * @return {object} Serialized builds model.
   */
  toJSON() {
    return {
      repository: this.repository,
      builds: this.builds,
      exportedOn: new Date(),
    };
  }
}

/**
 * Deserialization method.
 * @param {string} json - Builds model JSON notation
 * @return {BuildsModel} Deserialzed BuildsModel instance.
 * <strong>For now exportedOn is ignored.</strong>
 * @throws {Error} Thrown when the given JSON representation of the model is
 *  <i>"corrupt"</i>: missing the repository or builds properties.
 */
BuildsModel.fromJSONString = (json) => {
  const { repository, builds } = JSON.parse(json);
  const commonError = 'Deserialization failed. Check if your json file has ';
  if (repository == null) {
    throw new Error(`${commonError} the repository field.`);
  }
  if (builds == null) {
    throw new Error(`${commonError} the builds field.`);
  }
  return new BuildsModel(repository, builds);
};

module.exports = BuildsModel;
