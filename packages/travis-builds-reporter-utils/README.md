# Introduction

**travis-builds-reporter-utils** is a package that makes easy to make calculations on builds retrieved by the [core API](../travis-builds-reporter-core).

# What's in here?

You can find the source code inside the `src` directory, while testing code is inside the `test` directory (pretty standard staff for NodeJS pacakges).  
There is a single module in this package and it includes all the functionalities:
-   average, minimum and maximum builds durations (seconds)
-   builds by date
-   how much and which builds passed, errored and so on :smile:
-   successful builds rate
 
# How do you use it?
Assuming you have an already functioning node project:
1.   Install this package in your project as a dependency. Type this in your favourite terminal/prompt):  
     ```npm i -S travis-builds-reporter-utils```
2.   In a *`*.js`* file in your project:
     1.   Require the module contained in this package.  
      ```javascript
      const buildsUtils = require('travis-builds-reporter-utils');
      ```
     2.   Use it with a builds array:
     ```javascript
     // ...
     // retrieve builds in some ways
     // for example by using travis-builds-reporter-core
     console.log(`Total builds count: ${buildsUtils.getBuildsCount(builds)}`);
     if (buildsUtils.getSuccessfulBuildsRate(builds) > 0.6) {
        alert('Good boy!');
     } else {
        alert('No good my friend, no good...');
     }
     ```
     
# Module Details

## API

### getMinimumBuildsDuration(builds)

Returns the shortest builds duration in seconds (`number`).

#### builds

Type: `object[]`

Array of build objects. Each build object must have a duration property of type `number`.

### getMaximumBuildsDuration(builds)

Returns the longest builds duration in seconds (`number`).

#### builds

Type: `object[]`

Array of build objects. Each build object must have a duration property of type `number`.

### getAverageBuildsDuration(builds, decimals?)

Returns the average builds duration in seconds (eventually rounded to specified decimals if the appropriate argument is defined).

#### builds

Type: `object[]`

Array of build objects. Each build object must have a duration property of type `number`.

#### decimals

Type: `number`
Default: `undefined`

Number of decimals to round the average to.

### sliceBuildsByDate(builds)

Returns: `object[][]`

Returns an array of arrays of builds divided by date. Builds are in the same child array if and only if `build.started_at` or `build.finished_at` are the same date (**time is ignored**).

#### builds

Type: `object[]`

Array of build objects. Each build object must have at least one of two properties:

-  `started_at` of type `Date`;
-  `finished_at` of type `Date`.

Priority is given to `started_at` property.

### getSuccessfulBuilds(builds)

Returns: `object[]`

Get an array containing only successful builds.

**Builds are successful if the `state` property equals to `passed`.**

#### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

### getSuccessfulBuildsCount(builds)

Returns: `number`

Get the number of successful builds. See [getSuccessfulBuilds](#getsuccessfulbuildsbuilds) for details.

### getCanceledBuilds(builds)

Returns: `object[]`

Get an array containing only canceled builds.

**Builds are canceled if the `state` property equals to `canceled`.**

#### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

### getCanceledBuildsCount(builds)

Returns: `number`

Get the number of canceled builds. See [getCanceledBuilds](#getcanceledbuildsbuilds) for details.

### getFailedBuilds(builds)

Returns: `object[]`

Get an array containing only failed builds.

**Builds are failed if the `state` property equals to `failed`.**

#### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

### getFailedBuildsCount(builds)

Returns: `number`

Get the number of failed builds. See [getFailedBuilds](#getfailedbuildsbuilds) for details.

### getErroredBuilds(builds)

Returns: `object[]`

Get an array containing only errored builds.

**Builds are errored if the `state` property equals to `errored`.**

#### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

### getErroredBuildsCount(builds)

Returns: `number`

Get the number of errored builds. See [getErroredBuilds](#geterroredbuildsbuilds) for details.

### getSuccessfulBuildsRate(builds)

Returns: `number`
Minimum: `0`
Maximum: `1`

Get the percentage of successful builds.

#### builds

Type: `object[]`

Array of build objects. Each build object must have a `state` property of type `string`.

### generateReport(builds)

Returns: `object`

Generate a report object containing all metrics exposed by this module.

#### Report

##### total

Type: `number`

Number of examined builds.

##### times.avgDuration

Type: `number`

Average duration (same as [getAverageBuildsDuration](getaveragebuildsdurationbuilds)).

##### times.maxDuration

Type: `number`

Maximum duration (same as [getMaximumBuildsDuration](getmaximumbuildsdurationbuilds)).

##### times.minDuration

Type: `number`

Minimum duration (same as [getMinimumBuildsDuration](getminimumbuildsdurationbuilds)).

##### stats.successfulCount

Type: `number`

Successful builds count (same as [getSuccessfulBuildsCount](getsuccessfulbuildscountbuilds)).

##### stats.canceledCount

Type: `number`

Canceled builds count (same as [getCanceledBuildsCount](getcanceledbuildscountbuilds)).

##### stats.failedCount

Type: `number`

Failed builds count (same as [getFailedBuildsCount](getfailedbuildscountbuilds)).

##### stats.erroredCount

Type: `number`

Errored builds count (same as [getErroredBuildsCount](geterroredbuildscountbuilds)).

##### stats.successRate

Type: `number`

Successful builds rate, between 0 and 100.

# What's next?

I consider this package pretty much feature complete.  
If you have something to add or have issues, please check the [issues page](https://github.com/niktekusho/travis-builds-reporter/issues/) to see if someone has already requested your idea or open a [new issue](https://github.com/niktekusho/travis-builds-reporter/issues/new) using the tag/label ***utils***.
