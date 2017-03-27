# Introduction

**travis-builds-reporter** is a Travis CI CLI tool that returns basic builds statistics for a Travis enabled GitHub ***public*** repository.

# What do you need?

You can run this tool in 2 ways:
-   [using **docker**](#docker) (check [official site](https://www.docker.com/get-docker) to get help with Docker's installation):
    `docker run -it nikgatto/travis-builds-reporter`
-   building from source (check [Node.js](https://nodejs.org) for instructions to install it):
    1.  `git clone https://github.com/niktekusho/travis-builds-reporter.git`
    2.  `cd travis-builds-reporter/`  
    3.  `npm i && npm start`

# Show me some output...

Using the [docker](#docker) version with the following input parameters:
-   *username*: niktekusho
-   *password*: (should I share it? Naaahhh)
-   *repositoryName*: or-bit/WIP-docs

gives the following output:  
`Total builds count: 549`  
`Successful builds count: 466`  
`Canceled builds count: 1`  
`Failed builds count: 68`  
`Successful builds rate: 84.88%`

# What's next?
-   Improve script fault-tolerance (including better error-logging)
-   Add some tests...
-   Maybe give more options like:
    -   passing arguments to the scripts
    -   possibility to save the output to a JSON file
-   *What else?* (cit.)
