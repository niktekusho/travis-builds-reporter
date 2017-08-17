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
<dt><a href="#module_travis-builds-reporter-core/model">travis-builds-reporter-core/model</a></dt>
<dd><p>Contains model used in exporter module</p>
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

### travis-builds-reporter-core/exporter~create(builds, repositoryName) ⇒ <code>BuildsModel</code>
Creates a serializable object containing metadata (repository name, TODO)and the complete builds history.

**Kind**: inner method of [<code>travis-builds-reporter-core/exporter</code>](#module_travis-builds-reporter-core/exporter)  
**Returns**: <code>BuildsModel</code> - Serializable object  
**Throws**:

- <code>Error</code> if <b>at least</b> one argument is undefined or if the builds parameter is not an array.


| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Array containing builds history |
| repositoryName | <code>string</code> | Name of the repository from which builds were fetched |

<a name="module_travis-builds-reporter-core/fetcher"></a>

## travis-builds-reporter-core/fetcher
Builds fetcher module.

<a name="module_travis-builds-reporter-core/fetcher..fetch"></a>

### travis-builds-reporter-core/fetcher~fetch(repositoryName, connection) ⇒ <code>Promise.&lt;array&gt;</code>
Entry point of the fetcher module.This method calls internal methods that:<ol> <li> validate Travis APIs connections and responses </li> <li> initialize basic informations needed for the asynchonous fetcher function </li> <li> actually make the concurrent calls to fetch builds </li></ol>

**Kind**: inner method of [<code>travis-builds-reporter-core/fetcher</code>](#module_travis-builds-reporter-core/fetcher)  
**Returns**: <code>Promise.&lt;array&gt;</code> - Array of builds when promise fullfills.  

| Param | Type | Description |
| --- | --- | --- |
| repositoryName | <code>string</code> | Name of the repository from which the module  will try to fetch builds |
| connection | <code>array</code> | Correctly configured axios instance to make HTTP calls (@see module:travis-builds-reporter-core/client) |

<a name="module_travis-builds-reporter-core/model"></a>

## travis-builds-reporter-core/model
Contains model used in exporter module


* [travis-builds-reporter-core/model](#module_travis-builds-reporter-core/model)
    * [~BuildsModel](#module_travis-builds-reporter-core/model..BuildsModel)
        * [new BuildsModel(repository, builds)](#new_module_travis-builds-reporter-core/model..BuildsModel_new)
        * _instance_
            * [.Repository](#module_travis-builds-reporter-core/model..BuildsModel+Repository) ⇒ <code>string</code>
            * [.Repository](#module_travis-builds-reporter-core/model..BuildsModel+Repository)
            * [.Builds](#module_travis-builds-reporter-core/model..BuildsModel+Builds) ⇒ <code>array</code>
            * [.Builds](#module_travis-builds-reporter-core/model..BuildsModel+Builds)
            * [.toJSON()](#module_travis-builds-reporter-core/model..BuildsModel+toJSON) ⇒ <code>object</code>
        * _static_
            * [.fromJSONString(json)](#module_travis-builds-reporter-core/model..BuildsModel.fromJSONString) ⇒ <code>BuildsModel</code>

<a name="module_travis-builds-reporter-core/model..BuildsModel"></a>

### travis-builds-reporter-core/model~BuildsModel
Class that holds 2 basic info:<ol><li>repository (from which builds have been fetched).</li><li>builds themselves.</li></ol>

**Kind**: inner class of [<code>travis-builds-reporter-core/model</code>](#module_travis-builds-reporter-core/model)  

* [~BuildsModel](#module_travis-builds-reporter-core/model..BuildsModel)
    * [new BuildsModel(repository, builds)](#new_module_travis-builds-reporter-core/model..BuildsModel_new)
    * _instance_
        * [.Repository](#module_travis-builds-reporter-core/model..BuildsModel+Repository) ⇒ <code>string</code>
        * [.Repository](#module_travis-builds-reporter-core/model..BuildsModel+Repository)
        * [.Builds](#module_travis-builds-reporter-core/model..BuildsModel+Builds) ⇒ <code>array</code>
        * [.Builds](#module_travis-builds-reporter-core/model..BuildsModel+Builds)
        * [.toJSON()](#module_travis-builds-reporter-core/model..BuildsModel+toJSON) ⇒ <code>object</code>
    * _static_
        * [.fromJSONString(json)](#module_travis-builds-reporter-core/model..BuildsModel.fromJSONString) ⇒ <code>BuildsModel</code>

<a name="new_module_travis-builds-reporter-core/model..BuildsModel_new"></a>

#### new BuildsModel(repository, builds)
Create the builds model.


| Param | Type | Description |
| --- | --- | --- |
| repository | <code>string</code> | Repository from which builds have been fetched. |
| builds | <code>array</code> | Builds fetched from a CI provider/service. |

<a name="module_travis-builds-reporter-core/model..BuildsModel+Repository"></a>

#### buildsModel.Repository ⇒ <code>string</code>
Get the repository name.

**Kind**: instance property of [<code>BuildsModel</code>](#module_travis-builds-reporter-core/model..BuildsModel)  
**Returns**: <code>string</code> - Repository name  
<a name="module_travis-builds-reporter-core/model..BuildsModel+Repository"></a>

#### buildsModel.Repository
Set the repository name.

**Kind**: instance property of [<code>BuildsModel</code>](#module_travis-builds-reporter-core/model..BuildsModel)  

| Param | Type | Description |
| --- | --- | --- |
| repository | <code>string</code> | Repository name |

<a name="module_travis-builds-reporter-core/model..BuildsModel+Builds"></a>

#### buildsModel.Builds ⇒ <code>array</code>
Get the builds list.

**Kind**: instance property of [<code>BuildsModel</code>](#module_travis-builds-reporter-core/model..BuildsModel)  
**Returns**: <code>array</code> - Builds  
<a name="module_travis-builds-reporter-core/model..BuildsModel+Builds"></a>

#### buildsModel.Builds
Set the builds.

**Kind**: instance property of [<code>BuildsModel</code>](#module_travis-builds-reporter-core/model..BuildsModel)  

| Param | Type | Description |
| --- | --- | --- |
| builds | <code>array</code> | Builds |

<a name="module_travis-builds-reporter-core/model..BuildsModel+toJSON"></a>

#### buildsModel.toJSON() ⇒ <code>object</code>
"Override" implementation of object's default toJSON().<p><strong>Gets automatically called by `JSON.stringify(obj);`</strong></p>

**Kind**: instance method of [<code>BuildsModel</code>](#module_travis-builds-reporter-core/model..BuildsModel)  
**Returns**: <code>object</code> - Serialized builds model.  
<a name="module_travis-builds-reporter-core/model..BuildsModel.fromJSONString"></a>

#### BuildsModel.fromJSONString(json) ⇒ <code>BuildsModel</code>
Deserialization method.

**Kind**: static method of [<code>BuildsModel</code>](#module_travis-builds-reporter-core/model..BuildsModel)  
**Returns**: <code>BuildsModel</code> - Deserialzed BuildsModel instance.<strong>For now exportedOn is ignored.</strong>  
**Throws**:

- <code>Error</code> Thrown when the given JSON representation of the model is <i>"corrupt"</i>: missing the repository or builds properties.


| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | Builds model JSON notation |

