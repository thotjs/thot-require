'use strict';

var handleSyncFile = require('./lib/syncFIle');

var jsonHandler = require('./handlers/json.js');
var jsHandler = require('./handlers/js.js');
var nodeHandler = require('./handlers/node.js');

var setDefaultHandlers = function setDefaultHandlers(obj){
  obj.addExtension('js', jsHandler);
  obj.addExtension('json', jsonHandler);
  obj.addExtension('node', nodeHandler);
};

var ThotRequire = function ThotRequire(cwd){
  this.tracing = false;
  this.cache = {};
  this.handlers = {};

  setDefaultHandlers(this);
};

ThotRequire.prototype.require = function require(filePath, namespace){
  var result = null;

  //handle globs here
  if(Array.isArray(filePath)){
    this.emit('requireStarted', filePath, 'glob');
    result = null;//handleSyncGlob(filePath);
    return result;
  }

  // handle directories here
  if(namespace){
    this.emit('requireStarted', filePath, 'directory');

    result = null;//handleSyncDirectory(filePath);
    return result;
  }

  // handle files here
  result = handleSyncFile(filePath, this.cwd, this.handlers);
  return result;
};

ThotRequire.prototype.requireAsync = function require(filePath, namespace, cb){

};

ThotRequire.prototype.loadString = function loadString(ext, contents){

};

ThotRequire.prototype.loadStringAsync = function loadStringAsync(ext, contents){

};

ThotRequire.prototype.tracingEnabled = function tracingEnabled(){
  return this.tracing;
};

ThotRequire.prototype.enableTracing = function enableTracing(){
  this.tracing = true;
  this.emit('tracingEnabled');
};

ThotRequire.prototype.disableTracing = function disableTracing(){
  this.tracing = false;
  this.emit('tracingDisabled');
};

ThotRequire.prototype.getCache = function getCache(){
  return this.cache;
};

ThotRequire.prototype.cleanCache = function cleanCache(){
  this.cache = {};
  this.emit('cacheCleaned');
};

ThotRequire.prototype.removeFromCache = function removeFromCache(filePath){
  var cache = this.cache;
  if(cache[filePath]){
    delete cache[filePath];
  }

  this.emit('RemovedFromCache', filePath);
};

ThotRequire.prototype.addExtension = function addExtension(ext, func){
  if(typeof ext !== 'string' || typeof func !== 'function'){
    throw new Error('both ext and func must be provided and be of the correct type');
  }

  this.handlers[ext] = {
    'enabled': true,
    'handler': func
  };

  this.emit('handlerAdded', ext);
};

ThotRequire.prototype.listHandlers = function listHandlers(){
  return this.handlers;
};

ThotRequire.prototype.enableHandler = function(ext){
  var handlers = this.handlers;
  if(handlers[ext]){
    handlers[ext].enabled = true;
  }

  this.emit('extensionEnabled', ext);
};

ThotRequire.prototype.disableHandler = function(ext){
  var handlers = this.handlers;
  if(handlers[ext]){
    handlers[ext].enabled = false;
  }

  this.emit('extensionDisabled', ext);
};