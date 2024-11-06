This repo is an example of a dataform repo used to develop shared repo or tools. It contains the follwoing files and folders:
  - index.js: contains a list of common functions that can be reused across different projects
  - the include folder contains a list of javascript files use as configuraions for the code used in the shared_utils functions. More specifically:
      - clones.js : contains the info about the table cloning
      - config.js : contains the set up info about variables and functions
      - crm_config.js : configuration file for the set up of the crm pipeline defined in the definition/shared_utils folder
   
The folder definition/shared_utils contains a series of modules used to automatically perform repetitive operations in dataform
