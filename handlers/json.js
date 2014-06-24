'use strict';

var handleAsync = function handleAsync(module, file, cb){
  // read the file and set the module to the json parsed values
};

var handleSync = function handleSync(module, file){
  // read the file and set the module to the json parsed values
};

module.exports = function jsonHandler(module, file, cb){
  if(cb){
    handleAsync(module, file, cb);
  } else {
    handleSync(module, file);
  }
};