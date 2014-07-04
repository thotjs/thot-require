'use strict';

var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var Emitter = require('eventemitter2').EventEmitter2;
var util = require('util');
var Module = require('module');

var emitterConfig = {
  wildcard: true,
  maxListeners: 20
};

var ThotRequire = function ThotRequire(){
  Emitter.call(this, emitterConfig);

  this.module_paths = Module.globalPaths;
};

util.inherits(ThotRequire, Emitter);

var thotRequire = new ThotRequire();

var Require = function Require(cwd){
  Emitter.call(this, emitterConfig);

  this.cwd = path.dirname(module.parent.filename);

  if(cwd){
    if(cwd[0] === '~'){
      // we need to resolve this to the equivalent absolute path first
      cwd = cwd.replace('~', '.');
      cwd = path.resolve(process.cwd(), cwd);
    }

    this.cwd = path.resolve(this.cwd, cwd);
  }

  this.shared = thotRequire;
  this.module_paths = [];
  this.setDefaultPaths();
};

util.inherits(Require, Emitter);

Require.prototype.setDefaultPaths = function setDefaultPaths(){
  var baseDir = path.dirname(module.parent.filename);

  this.addModulePathsRecursively(baseDir, 'node_modules');

  console.log(this.module_paths);
  console.log(this.shared.module_paths);
};

Require.prototype.addModulePathsRecursively = function(base, dirname){
  var current = base;

  while(current !== '/'){
    this.module_paths.push(path.resolve(current, dirname));
    current = path.dirname(current);
  }
};

Require.prototype.setPaths = function(){
  this.module_paths = [];
  this.addModulePathsRecursively(this.cwd, 'node_modules');
};

Require.prototype.setCWD = function setCWD(dir){
  if(dir){
    if(dir[0] === '~'){
      // we need to resolve this to the equivalent absolute path first
      dir = dir.replace('~', '.');
      dir = path.resolve(process.cwd(), dir);
    }
    this.cwd = path.resolve(path.dirname(module.parent.filename), dir);
    if(fs.statSync(this.cwd).isFile()){
      this.cwd = path.dirname(this.cwd);
    }
  } else {
    this.cwd = path.dirname(module.parent.filename);
  }

  this.setPaths();

  this.emit('directory.changed');
};

Require.prototype.getCWD = function getCWD(){
  return this.cwd;
};

var main = function main(cwd){
  return new Require(cwd);
};

module.exports = main;