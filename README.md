# Introduction

**travis-builds-reporter** is a Travis CI CLI tool that returns basic builds statistics for a Travis enabled ***public*** repository.

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
-   Add some tests...
-   Maybe give more options like:
    -   passing arguments to the scripts
    -   possibility to save the output to a JSON file
-   *What else?* (cit.)
