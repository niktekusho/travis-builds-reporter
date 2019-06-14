# Introduction

**travis-builds-reporter-core** is a package that makes easy to fetch builds (to do whatever you want) for a Travis enabled ***public*** repository.

# What's in here?

You can find the source code inside the `src` directory, while testing code is inside the `test` directory (pretty standard staff for nodejs pacakges).

You can find an example [here](./example/example.js).

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
     1.   Fetch the builds from Travis using the promise returned by fetcher
     ```javascript
     fetch('some/repository', travis)
      .then(model => {
        // This is a BuildsModel instance
        // do something with the builds
        console.log(model.builds);
      })
      .catch((error) => {
        // remember to catch any errors
        console.error(error);
      });
     ```

# Module Details

## API

### createClient(options?)

Creates a preconfigured axios instance that, _by default_, works with the public Travis APIs available for Open Source projects.
The object returned by this function can and _should_ be reused upon [fetch](#fetch) invocations.

#### options

Type: `object`

##### userAgent

Type: `string`
Default: `niktekusho/travis-builds-reporter-core/{PACKAGE_VERSION}`

Custom user agent.

**The User-Agent cannot be turned off since Travis APIs require a valid and identifiable User Agent header.**
The [createClient](#createclient) function will therefore check for its presence and validity.

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

- validates Travis APIs connections and responses
- initializes basic informations needed for the asynchonous fetcher function
- actually makes the concurrent calls to fetch the builds

Returns a `Promise<BuildsModel>` with the fetched builds.

#### client

Type: `object`

A configured axios instance. Use the [createClient](#createclient) function to create one.

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

#### static fromJSONString(json)

Deserialization method with properties validation.
Returns a [BuildsModel](#buildsmodel) object if the json represents a valid [BuildsModel](#buildsmodel) instance.
Throws if the json arguments:

    - cannot be parsed into a JavaScript object
    - the parsed object does not contain the `builds` and `repository` properties

##### json

Type: `string`

Stringified JSON object of a [BuildsModel](#buildsmodel) instance.
