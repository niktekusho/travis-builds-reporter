# Status
[![Build Status](https://travis-ci.org/niktekusho/travis-builds-reporter.svg?branch=master)](https://travis-ci.org/niktekusho/travis-builds-reporter)
[![codecov](https://codecov.io/gh/niktekusho/travis-builds-reporter/branch/master/graph/badge.svg)](https://codecov.io/gh/niktekusho/travis-builds-reporter)

# Introduction

**travis-builds-reporter** is a set of Travis CI CLI tools that makes easy to fetch basic builds statistics for a Travis enabled ***public*** repository.

# What's in here? :sparkles:

This is a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) containing the single packages for the tools. To achieve this result, the project proudly uses [lerna](https://github.com/lerna/lerna).

So... I imagine you have questions...

-   **Where is the code?**  
    You can find the code inside the [`packages`](packages) directory. Inside it there will be the single packages you need.

-   **What's in there?**  
    This is the list of the single packages which makes this (useful hopefully... :wink:) tool:
    -   [`travis-builds-reporter-core`](packages/travis-builds-reporter-core) is the core package of the utility: its goal is to let users configure an axios instance and use it to retrieve builds from Travis CI.
    -   [`travis-builds-reporter-utils`](packages/travis-builds-reporter-utils) is a utility package that offers basic statistics over a builds list (like # of successful builds, etc.). <br/>***Note: this package could potentially work with other providers if they provide a similar interface.***
    -   [`travis-builds-reporter-cli`](packages/travis-builds-reporter-cli) is a **C**ommand **L**ine **I**nterface that allows users to have basic stats of a public Travis CI repository.

# What do you need? :wrench:

You can run this tool in 2 ways:
-   [using **docker**](#docker) (check [official site](https://www.docker.com/get-docker) to get help with Docker's installation):  
    1.  `docker run -it nikgatto/travis-builds-reporter`
-   building from source, which requires Node JS (check [Node.js](https://nodejs.org) for instructions on how to install it):
    1.  `git clone https://github.com/niktekusho/travis-builds-reporter.git`
    2.  `cd travis-builds-reporter/`  
    3.  `npm i && npm start`

#### Node.js 7 is the default target

# Show me some output... :eyeglasses:

Using the [docker](#docker) version with the following input parameter:
-   *repositoryName*: niktekusho/travis-builds-reporter

gives the following output:  
```
This tool returns basic builds statistics for a Travis enabled PUBLIC-ONLY
repositoryName:  niktekusho/travis-builds-reporter
Fetching builds...
Total builds count: 107
Successful builds count: 101
Canceled builds count: 1
Failed builds count: 3
Errored builds count: 2
Successful builds rate: 94.39%
Average builds duration: 79.45 s
Minimum builds duration: 18 s
Maximum builds duration: 197 s
Successful builds rate: 84.88%
```

# Related projects :link:

Checkout [travis-builds-reporter-web](https://github.com/niktekusho/travis-builds-reporter-web) for a browser interface of this utility.

# What's next? :rocket:
To do:
-   Improve script fault-tolerance (including better error-logging)
-   ~~Improve this document...~~  
***update 26/07/2017***: I'm feeling pretty good about this now, if you think there's something missing or that can be improved, please open an [issue](https://github.com/niktekusho/travis-builds-reporter/issues/new)
-   ~~Add some tests...~~ (some are actually here)
-   Give more options like:
    -   ~~passing arguments to the scripts~~ (done)
    -   possibility to save the output to a JSON file
-   *What else?* (cit.)

