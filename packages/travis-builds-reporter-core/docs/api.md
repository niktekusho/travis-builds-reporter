## Modules

<dl>
<dt><a href="#module_travis-builds-reporter-core/client">travis-builds-reporter-core/client</a></dt>
<dd><p>Client configuring module.</p>
</dd>
<dt><a href="#module_travis-builds-reporter-core/exporter">travis-builds-reporter-core/exporter</a></dt>
<dd><p>Builds exporter module.</p>
</dd>
<dt><a href="#module_travis-builds-reporter-core/fetcher">travis-builds-reporter-core/fetcher</a></dt>
<dd><p>Builds fetcher module.</p>
</dd>
</dl>

<a name="module_travis-builds-reporter-core/client"></a>

## travis-builds-reporter-core/client
Client configuring module.

<a name="module_travis-builds-reporter-core/client..create"></a>

### travis-builds-reporter-core/client~create(axiosPackage, [userAgent]) ⇒ <code>Object</code>
Creates a preconfigured axios instance that works with the public Travis APIs.

**Kind**: inner method of [<code>travis-builds-reporter-core/client</code>](#module_travis-builds-reporter-core/client)  
**Returns**: <code>Object</code> - Configured axios instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| axiosPackage | <code>Object</code> |  | Object returned when requiring/importing  the <b>whole</b> axios package (like in: "const axios = require('axios');") |
| [userAgent] | <code>string</code> | <code>&quot;niktekusho/travis-builds-reporter-core/1.0.0&quot;</code> | Custom user agent. |

<a name="module_travis-builds-reporter-core/exporter"></a>

## travis-builds-reporter-core/exporter
Builds exporter module.

<a name="module_travis-builds-reporter-core/exporter..create"></a>

### travis-builds-reporter-core/exporter~create(builds, repositoryName) ⇒ <code>TBD</code>
Creates a serializable object containing metadata (repository name, TODO)and the complete builds history.

**Kind**: inner method of [<code>travis-builds-reporter-core/exporter</code>](#module_travis-builds-reporter-core/exporter)  
**Returns**: <code>TBD</code> - Serializable object  
**Throws**:

- <code>Error</code> if <b>at least</b> one argument is undefined or if the builds parameter is not an array.


| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array containing builds history |
| repositoryName | <code>string</code> | Name of the repository from which builds were fetched |

<a name="module_travis-builds-reporter-core/fetcher"></a>

## travis-builds-reporter-core/fetcher
Builds fetcher module.

<a name="module_travis-builds-reporter-core/fetcher..fetch"></a>

### travis-builds-reporter-core/fetcher~fetch(repositoryName, connection) ⇒ <code>Promise.&lt;array&gt;</code>
Entry point of the fetcher module. This method calls internal methods that:<ol> <li> validate Travis APIs connections and responses </li> <li> initialize basic informations needed for the asynchonous fetcher function </li> <li> actually make the concurrent calls to fetch builds </li></ol>

**Kind**: inner method of [<code>travis-builds-reporter-core/fetcher</code>](#module_travis-builds-reporter-core/fetcher)  
**Returns**: <code>Promise.&lt;array&gt;</code> - Array of builds when promise fullfills.  

| Param | Type | Description |
| --- | --- | --- |
| repositoryName | <code>string</code> | Name of the repository from which the module  will try to fetch builds |
| connection | <code>array</code> | Correctly configured axios instance to make HTTP calls (@see module:travis-builds-reporter-core/client) |

