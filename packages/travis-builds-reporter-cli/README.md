# Introduction

**travis-builds-reporter-cli** is the package that offers a **C**ommand **L**ine **I**nterface to use the travis-builds-reporter project from your terminal.

# What's in here?

You can find the source code inside the `src` directory.  
In this package you can see *only* a [`start script`](./src/index.js).

# How do you use it?
Assuming you have an already functioning node installation:
1.   Install this package globally. Type this in your favourite terminal/prompt:  
     ```npm i -g travis-builds-reporter-cli```
2.   When installation is complete, you can invoke the command from your terminal:  
    ```builds_reporter```
    
# Sample use
## From your favourite Terminal
```builds_reporter niktekusho/travis-builds-reporter```  
(use another *public* repository in place of this repository 😄)


## Output
```
Total builds count: 127
Successful builds count: 121
Canceled builds count: 1
Failed builds count: 3
Errored builds count: 2
Successful builds rate: 95.28%
Average builds duration: 79.67 s
Minimum builds duration: 16 s
Maximum builds duration: 197 s
```

# 🆒 demo

***COMING SOON!***

# What's next?
To do:
-   ~~Show meaningful errors and not the complete node stack (only with a "--debug" flag we should show it)~~
-   Improve this document...
-   *What else?* (cit.)
