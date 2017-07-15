# Status
[![Build Status](https://travis-ci.org/niktekusho/travis-builds-reporter.svg?branch=master)](https://travis-ci.org/niktekusho/travis-builds-reporter)
[![codecov](https://codecov.io/gh/niktekusho/travis-builds-reporter/branch/master/graph/badge.svg)](https://codecov.io/gh/niktekusho/travis-builds-reporter)

# Introduction

**travis-builds-reporter** is a set of Travis CI CLI tools that makes easy to fetch basic builds statistics for a Travis enabled ***public*** repository.

# What's in here?

This is a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) containing the single packages for the tools. To achieve this result, the project proudly uses [lerna](https://github.com/lerna/lerna).

So... I imagine you have a few questions...

-  **Where is the code?**  
   The code is located inside the [`packages`](packages) directory. Inside it there will be the single packages you need.

-  **What's in there?**  
   This is the list of the single modules which makes this (useful hopefully... ;) ) tool:
   -  

# What do you need?

You can run this tool in 2 ways:
-   [using **docker**](#docker) (check [official site](https://www.docker.com/get-docker) to get help with Docker's installation):  
    1.  `docker run -it nikgatto/travis-builds-reporter`
    2.  `npm start`
-   building from source (check [Node.js](https://nodejs.org) for instructions on how to install it) (**Node.js 7 is the default target**):
    1.  `git clone https://github.com/niktekusho/travis-builds-reporter.git`
    2.  `cd travis-builds-reporter/`  
    3.  `npm i && npm start`

# Show me some output...

Using the [docker](#docker) version with the following input parameter:
-   *repositoryName*: or-bit/WIP-docs

gives the following output:  
`Total builds count: 549`  
`Successful builds count: 466`  
`Canceled builds count: 1`  
`Failed builds count: 68`  
`Successful builds rate: 84.88%`

# What's next?
List of things to do:
-   Improve script fault-tolerance (including better error-logging)
-   Improve this document...
-   ~~Add some tests...~~ (some are actually here)
-   Maybe give more options like:
    -   ~~passing arguments to the scripts~~ (done)
    -   possibility to save the output to a JSON file
-   *What else?* (cit.)
