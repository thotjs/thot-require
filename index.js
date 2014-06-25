'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var handleSyncFile = require('./lib/syncFIle');

var jsonHandler = require('./handlers/json.js');
var jsHandler = require('./handlers/js.js');
var nodeHandler = require('./handlers/node.js');

var setDirectory = function setDirectory(obj, cwd){
  if(cwd){
    obj.cwd = path.resolve(path.dirname(module.parent.filename), cwd);
    if(fs.statSync(obj.cwd).isFile()){
      this.cwd = path.dirname(obj.cwd);
    }
  } else {
    obj.cwd = process.cwd();
  }
};

var setDefaultHandlers = function setDefaultHandlers(obj){
  obj.addExtension('js', jsHandler);
  obj.addExtension('json', jsonHandler);
  obj.addExtension('node', nodeHandler);
};

var ThotRequire = function ThotRequire(cwd){
  this.tracing = false;
  this.cache = {};
  this.handlers = {};

  setDirectory(this, cwd);
  setDefaultHandlers(this);

  EventEmitter.call(this);

  this.emit('initialized', this.cwd);
};

util.inherits(ThotRequire, EventEmitter);

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

ThotRequire.prototype.requireAsync = function requireAsync(filePath, namespace, cb){

};

ThotRequire.prototype.loadString = function loadString(ext, contents){

};

ThotRequire.prototype.loadStringAsync = function loadStringAsync(ext, contents, cb){

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

ThotRequire.prototype.changeDirectory = function(cwd){
  setDirectory(this, cwd);
};

var main = function main(cwd){
  return new ThotRequire(cwd);
};

module.exports = main;