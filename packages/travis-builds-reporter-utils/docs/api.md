<a name="module_travis-builds-reporter-utils"></a>

## travis-builds-reporter-utils
Utilities module


* [travis-builds-reporter-utils](#module_travis-builds-reporter-utils)
    * [~getMinimumBuildsDuration(builds)](#module_travis-builds-reporter-utils..getMinimumBuildsDuration) ⇒ <code>number</code>
    * [~getMaximumBuildsDuration(builds)](#module_travis-builds-reporter-utils..getMaximumBuildsDuration) ⇒ <code>number</code>
    * [~getAverageBuildsDuration(builds, [decimals])](#module_travis-builds-reporter-utils..getAverageBuildsDuration) ⇒ <code>number</code>
    * [~sliceBuildsByDate(builds)](#module_travis-builds-reporter-utils..sliceBuildsByDate) ⇒ <code>array</code>
    * [~getBuildsCount(builds)](#module_travis-builds-reporter-utils..getBuildsCount) ⇒ <code>number</code>
    * [~getSuccessfulBuilds(builds)](#module_travis-builds-reporter-utils..getSuccessfulBuilds) ⇒ <code>array</code>
    * [~getSuccessfulBuildsCount(builds)](#module_travis-builds-reporter-utils..getSuccessfulBuildsCount) ⇒ <code>number</code>
    * [~getCanceledBuilds(builds)](#module_travis-builds-reporter-utils..getCanceledBuilds) ⇒ <code>array</code>
    * [~getCanceledBuildsCount(builds)](#module_travis-builds-reporter-utils..getCanceledBuildsCount) ⇒ <code>number</code>
    * [~getErroredBuilds(builds)](#module_travis-builds-reporter-utils..getErroredBuilds) ⇒ <code>array</code>
    * [~getErroredBuildsCount(builds)](#module_travis-builds-reporter-utils..getErroredBuildsCount) ⇒ <code>number</code>
    * [~getFailedBuilds(builds)](#module_travis-builds-reporter-utils..getFailedBuilds) ⇒ <code>array</code>
    * [~getFailedBuildsCount(builds)](#module_travis-builds-reporter-utils..getFailedBuildsCount) ⇒ <code>number</code>
    * [~getSuccessfulBuildsRate(builds)](#module_travis-builds-reporter-utils..getSuccessfulBuildsRate) ⇒ <code>number</code>

<a name="module_travis-builds-reporter-utils..getMinimumBuildsDuration"></a>

### travis-builds-reporter-utils~getMinimumBuildsDuration(builds) ⇒ <code>number</code>
Get the shortest builds duration.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Shortest builds duration in seconds.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each  build object must have a duration property of type "number". |

<a name="module_travis-builds-reporter-utils..getMaximumBuildsDuration"></a>

### travis-builds-reporter-utils~getMaximumBuildsDuration(builds) ⇒ <code>number</code>
Get the longest builds duration.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Longest builds duration in seconds.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each  build object must have a duration property of type "number". |

<a name="module_travis-builds-reporter-utils..getAverageBuildsDuration"></a>

### travis-builds-reporter-utils~getAverageBuildsDuration(builds, [decimals]) ⇒ <code>number</code>
Get the average amongst specified builds.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Average builds duration in seconds (eventually rounded to specified decimals).  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each  build object must have a duration property of type "number". |
| [decimals] | <code>number</code> | Number of decimals to round the average. |

<a name="module_travis-builds-reporter-utils..sliceBuildsByDate"></a>

### travis-builds-reporter-utils~sliceBuildsByDate(builds) ⇒ <code>array</code>
Get an array of arrays of builds divided by date. Builds are in the same child array if and only if build.started_at or build.finished_at are the same date.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>array</code> - Array of arrays of builds divided by date. Builds are in the same child array if and only if build.started_at or build.finished_at are the same date (time is ignored).  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must  have at least one of 2 properties: started_at or finished_at (type "Date"). Priority is given to started_at property. |

<a name="module_travis-builds-reporter-utils..getBuildsCount"></a>

### travis-builds-reporter-utils~getBuildsCount(builds) ⇒ <code>number</code>
Get the number of builds.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Length of builds argument.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. |

<a name="module_travis-builds-reporter-utils..getSuccessfulBuilds"></a>

### travis-builds-reporter-utils~getSuccessfulBuilds(builds) ⇒ <code>array</code>
Get an array containing only successful builds.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>array</code> - Builds in the "passed" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getSuccessfulBuildsCount"></a>

### travis-builds-reporter-utils~getSuccessfulBuildsCount(builds) ⇒ <code>number</code>
Get the number of successful builds in the specified argument.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Number of builds in the "passed" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getCanceledBuilds"></a>

### travis-builds-reporter-utils~getCanceledBuilds(builds) ⇒ <code>array</code>
Get an array containing only canceled builds.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>array</code> - Builds in the "canceled" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getCanceledBuildsCount"></a>

### travis-builds-reporter-utils~getCanceledBuildsCount(builds) ⇒ <code>number</code>
Get the number of canceled builds in the specified argument.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Number of builds in the "canceled" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getErroredBuilds"></a>

### travis-builds-reporter-utils~getErroredBuilds(builds) ⇒ <code>array</code>
Get an array containing only errored builds.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>array</code> - Builds in the "errored" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getErroredBuildsCount"></a>

### travis-builds-reporter-utils~getErroredBuildsCount(builds) ⇒ <code>number</code>
Get the number of errored builds in the specified argument.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Number of builds in the "errored" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getFailedBuilds"></a>

### travis-builds-reporter-utils~getFailedBuilds(builds) ⇒ <code>array</code>
Get an array containing only failed builds.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>array</code> - Builds in the "failed" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getFailedBuildsCount"></a>

### travis-builds-reporter-utils~getFailedBuildsCount(builds) ⇒ <code>number</code>
Get the number of failed builds in the specified argument.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Number of builds in the "failed" state.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

<a name="module_travis-builds-reporter-utils..getSuccessfulBuildsRate"></a>

### travis-builds-reporter-utils~getSuccessfulBuildsRate(builds) ⇒ <code>number</code>
Get the percentage of successful builds in the specified argument.

**Kind**: inner method of [<code>travis-builds-reporter-utils</code>](#module_travis-builds-reporter-utils)  
**Returns**: <code>number</code> - Percentage of successful builds.  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array of build objects. Each build object must have  the "state" property (type "string"). |

