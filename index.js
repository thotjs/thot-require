'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var isArray = Array.isArray;
var Promise = require('bluebird');

var natives = process.binding('natives');
var nativeKeys = Object.keys(natives);
var nativeModules = {};
nativeKeys.forEach(function(key){
  if(key[0] !== '_'){
    nativeModules[key] = require(key);
  }
});

var ThotRequire = function ThotRequire(cwd){
  this.changeDirectory(cwd);

  EventEmitter.call(this);
};

util.inherits(ThotRequire, EventEmitter);

ThotRequire.prototype.changeDirectory = function setWorkingDirectory(dir){
  if(dir) {
    this.cwd = path.resolve(path.dirname(module.parent.filename), dir);
    if(fs.statSync(this.cwd).isFile()) {
      this.cwd = path.dirname(this.cwd);
    }
  } else {
    this.cwd = process.cwd();
  }

  this.emit('directorySet', this.cwd);
};

ThotRequire.prototype.require = function require(filepath, namespace){
  this.emit('requireStarted', filepath, namespace);

  // we have a glob here
  if(isArray(filepath)){
    console.log('we have a glob');
    this.emit('requireFinished', filepath);
    return null;
  }

  // we have a directory here
  if(namespace){
    console.log('this is for a directory');
    this.emit('requireFinished', filepath);
    return null;
  }

  // we have a single file to include here
  var mod = this._loadFileSync(filepath);
  this.emit('requireFinished', filepath);
  return mod;
};

ThotRequire.prototype.requireAsync = function requireAsync(filepath, namespace, cb){

};

ThotRequire.prototype._loadFileSync = function _loadFileSync(filepath){
  // if it's a native module we can just return it
  if(nativeModules[filepath]){
    return nativeModules[filepath];
  }
};

var main = function main(cwd){
  return new ThotRequire(cwd);
};

module.exports = main;