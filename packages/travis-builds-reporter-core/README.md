# Introduction

**travis-builds-reporter-core** is a package that makes easy to fetch builds (to do whatever you want) for a Travis enabled ***public*** repository.

# What's in here?

You can find the source code inside the `src` directory, while testing code is inside the `test` directory (pretty standard staff for nodejs pacakges).

You can find an example usage of this library [here](./example/example.js).

# How do you use it?

Assuming you have an already functioning node project:

1.   Install this package alongside axios in your project as a dependency. Type this in your favourite terminal/prompt:  
     ```npm i -S travis-builds-reporter-core```
2.   In a *`*.js`* file in your project:
     1.   Require the modules contained in this package.  
          ```javascript
          const { createClient, fetch } = require('travis-builds-reporter-core');
          ```
     2.   Create the pre-configured axios instance.
          ```javascript
          const travis = createClient();
          ```
     3.   Fetch the builds from Travis using the promise returned by fetcher
          ```javascript
          fetch(travis, 'some/repository')
               .then(model => {
                    // This is a BuildsModel instance
                    // do something with the builds
                    console.log(model.builds);
               }).catch((error) => {
                    // remember to catch any errors
                    console.error(error);
               });
          ```
          or in an async function:
          ```javascript
          try {
	          const model = await fetch(client, 'some/repo');
              console.log(model);
          } catch (error) {
              // Handle error here
              console.error(error);
          }
          ```

# Module Details

## API

### createClient(options?)

Creates a preconfigured axios instance that, _by default_, works with the public Travis APIs available for Open Source projects.
The object returned by this function can and _should_ be reused upon multiple [`fetch`](#fetchclient-repository) invocations.

#### options

Type: `object`

##### userAgent

Type: `string`
Default: `niktekusho/travis-builds-reporter-core/{PACKAGE_VERSION}`

Custom user agent.

**The User-Agent cannot be turned off since Travis APIs require a valid and identifiable User Agent header.**
The [`createClient`](#createclientoptions) function will therefore check for its presence and validity.

##### timeout

Type: `number`
Default: `10000`

Requests timeout in milliseconds. The default is 10 seconds.

##### baseURL

Type: `string`
Default: `https://api.travis-ci.org`

Base url to fetch builds from. The default can be used to query the Travis APIs for Open Source projects.

##### host

Type: `string`
Default: `api.travis-ci.org`

Host to fetch builds from. The default can be used to query the Travis APIs for Open Source projects.

### fetch(client, repository)

This function does the following:

-  validates Travis APIs connections and responses
-  initializes basic informations needed for the asynchonous fetcher function
-  actually makes the concurrent calls to fetch the builds

Returns a `Promise<`[`BuildsModel`](#buildsmodel)`>` with the fetched builds.

#### client

Type: `object`

A configured axios instance. Use the [`createClient`](#createclientoptions) function to create one.

#### repository

Type: `string`

Name of the repository from which the module will try to fetch builds

### BuildsModel

Class that contains repository's builds info.

#### constructor(repository, builds, exportedOn?)

Constructs a new model.

##### repository

Type: `string`

Name of the repository from which the module fetched the builds.

##### builds

Type: `object[]`

Array of all builds received from Travis APIs. Each `build` object is as specified in the [Travis API specification for the Build object](https://developer.travis-ci.com/resource/build).

##### exportedOn

Type: `Date`
Default: `new Date()`

Date in which the builds are fetched.

#### getMinimumBuildsDuration(builds)

Returns the shortest builds duration in seconds (`number`).

##### builds

Type: `object[]`

Array of build objects. Each build object must have a duration property of type `number`.

#### getMaximumBuildsDuration(builds)

Returns the longest builds duration in seconds (`number`).

##### builds

Type: `object[]`

Array of build objects. Each build object must have a duration property of type `number`.

#### getAverageBuildsDuration(builds, decimals?)

Returns the average builds duration in seconds (eventually rounded to specified decimals if the appropriate argument is defined).

##### builds

Type: `object[]`

Array of build objects. Each build object must have a duration property of type `number`.

##### decimals

Type: `number`
Default: `undefined`

Number of decimals to round the average to.

#### sliceBuildsByDate(builds)

Returns: `object[][]`

Returns an array of arrays of builds divided by date. Builds are in the same child array if and only if `build.started_at` or `build.finished_at` are the same date (**time is ignored**).

##### builds

Type: `object[]`

Array of build objects. Each build object must have at least one of two properties:

-  `started_at` of type `Date`;
-  `finished_at` of type `Date`.

Priority is given to `started_at` property.

#### getSuccessfulBuilds(builds)

Returns: `object[]`

Get an array containing only successful builds.

**Builds are successful if the `state` property equals to `passed`.**

##### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

#### getSuccessfulBuildsCount(builds)

Returns: `number`

Get the number of successful builds. See [getSuccessfulBuilds](#getsuccessfulbuildsbuilds) for details.

#### getCanceledBuilds(builds)

Returns: `object[]`

Get an array containing only canceled builds.

**Builds are canceled if the `state` property equals to `canceled`.**

##### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

#### getCanceledBuildsCount(builds)

Returns: `number`

Get the number of canceled builds. See [getCanceledBuilds](#getcanceledbuildsbuilds) for details.

#### getFailedBuilds(builds)

Returns: `object[]`

Get an array containing only failed builds.

**Builds are failed if the `state` property equals to `failed`.**

##### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

#### getFailedBuildsCount(builds)

Returns: `number`

Get the number of failed builds. See [getFailedBuilds](#getfailedbuildsbuilds) for details.

#### getErroredBuilds(builds)

Returns: `object[]`

Get an array containing only errored builds.

**Builds are errored if the `state` property equals to `errored`.**

##### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

#### getErroredBuildsCount(builds)

Returns: `number`

Get the number of errored builds. See [getErroredBuilds](#geterroredbuildsbuilds) for details.

#### getSuccessfulBuildsRate(builds)

Returns: `number`
Minimum: `0`
Maximum: `1`

Get the percentage of successful builds.

##### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

#### generateReport(builds)

Returns: `object`

Generate a report object containing all metrics exposed by this module.

##### Report

###### total

Type: `number`

Number of examined builds.

###### times.avgDuration

Type: `number`

Average duration (same as [getAverageBuildsDuration](getaveragebuildsdurationbuilds)).

###### times.maxDuration

Type: `number`

Maximum duration (same as [getMaximumBuildsDuration](getmaximumbuildsdurationbuilds)).

###### times.minDuration

Type: `number`

Minimum duration (same as [getMinimumBuildsDuration](getminimumbuildsdurationbuilds)).

###### stats.successfulCount

Type: `number`

Successful builds count (same as [getSuccessfulBuildsCount](getsuccessfulbuildscountbuilds)).

###### stats.canceledCount

Type: `number`

Canceled builds count (same as [getCanceledBuildsCount](getcanceledbuildscountbuilds)).

###### stats.failedCount

Type: `number`

Failed builds count (same as [getFailedBuildsCount](getfailedbuildscountbuilds)).

###### stats.erroredCount

Type: `number`

Errored builds count (same as [getErroredBuildsCount](geterroredbuildscountbuilds)).

###### stats.successRate

Type: `number`

Successful builds rate, between 0 and 100.


#### static fromJSONString(json)

Deserialization method with properties validation.
Returns a [`BuildsModel`](#buildsmodel) object if the json represents a valid [`BuildsModel`](#buildsmodel) instance.
Throws if the json arguments:

-  cannot be parsed into a JavaScript object
-  the parsed object does not contain the `builds` and `repository` properties

##### json

Type: `string`

Stringified JSON object of a [`BuildsModel`](#buildsmodel) instance.
