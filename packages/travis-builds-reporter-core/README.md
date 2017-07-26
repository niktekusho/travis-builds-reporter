# Introduction

**travis-builds-reporter-core** is a package that makes easy to fetch builds (to do whatever you want) for a Travis enabled ***public*** repository.

# What's in here?

You can find the source code inside the `src` directory, while testing code is inside the `test` directory (pretty standard staff for nodejs pacakges).  
This is the list of the single modules which makes this package:
-   `client` is the module that, provided with a reference to the [`axios`](https://github.com/mzabriskie/axios) package, returns an axios instance configured to call Travis CI APIs. You can use the returned object directly in the `fetcher` module. 
-   `exporter` is the module that produces a JSON file containing metadata and the builds retrieved from Travis APIs.  
***Note: as of 26/07/2017 this is not a complete feature***
-   `fetcher`is the module that, given a correctly configured axios instance and a valid repository, fetches asynchronously builds from Travis APIs.

# How do you use it?
Assuming you have an already functioning node project:
1.   Install this package alongside axios in your project as a dependency. Type this in your favourite terminal/prompt):  
     ```npm i -S axios travis-builds-reporter-core```
2.   In a *`*.js`* file in your project:
     1.   Require the modules contained in this package.  
      ```const { client, fetcher } = require('travis-builds-reporter-core');```
     2.   Require the axios module.  
     ```const axios = require('axios');```
     3.   Create the pre-configured axios instance.
     ```const travis = client.create(axios);```
     4.   Fetch the builds from Travis using the promise returned by fetcher
     ```
     fetcher.fetch('some/repository', travis)
      .then((builds) => {
        // do something with the builds
        console.log(builds);
      })
      .catch((error) => {
        // remember to catch any errors
        console.error(error);
      });
     ```
     The final js file should be something like:
     ```
     const { client, fetcher } = require('travis-builds-reporter-core');
     const axios = require('axios');
     const travis = client.create(axios);
     fetcher.fetch('niktekusho/travis-builds-reporter', travis)
       .then((builds) => {
         // do something with the builds
         console.log(builds);
       })
       .catch((error) => {
         // remember to catch any errors
         console.error(error);
       });
      ``` 
     
# Modules Detail

TODO

# What's next?
To do:
-   Throw meaningful errors (fetcher module)
-   Improve this document...
-   Finish the exporter
-   *What else?* (cit.)

