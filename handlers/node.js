'use strict';

var handleAsync = function handleAsync(module, file, cb){

};

var handleSync = function handleSync(module, file){

};

module.exports = function nodeHandler(module, file, cb){
  if(cb){
    handleAsync(module, file, cb);
  } else {
    handleSync(module, file);
  }
};