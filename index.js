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
  this.module_paths = Module.globalPaths;
};

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
};

Require.prototype.addModulePathsRecursively = function(base, dirname, shared){
  var current = base;
  var modules = null;
  if(!shared){
    modules = this.module_paths;
  } else {
    modules = this.shared.module_paths;
  }

  while(current !== '/'){
    modules.push(path.resolve(current, dirname));
    current = path.dirname(current);
  }

  modules.push(path.resolve(current, dirname));
};

Require.prototype.getModulePaths = function(){
  var module_paths = this.module_paths.concat(this.shared.module_paths);

  return module_paths;
};

Require.prototype.setPaths = function(){
  this.module_paths = [];
  this.addModulePathsRecursively(this.cwd, 'node_modules');
};

Require.prototype.addModulePath = function(folder, recursive){
  if(folder[0] === '~'){
    // resolve the local directory path here
    folder = folder.replace('~', '.');
    folder = path.resolve(process.cwd(), folder);
  }

  folder = path.resolve(path.dirname(module.parent.filename), folder);

  // if not recursive we add the path as given
  if(!recursive){
    if(this.shared.module_paths.indexOf(folder) === -1){
      this.shared.module_paths.unshift(folder);
      this.emit('modulePathAdded', folder, recursive);
    }
    return;
  }

  // if recursive we need to get the dirname of the path given and then move upwards from there
  var base = path.basename(folder);
  folder = folder.replace(base, '');
  this.addModulePathsRecursively(folder, base, true);
  this.emit('modulePathAdded', folder, recursive);
};

Require.prototype.removeModulePath = function removeModulePath(folder, recursive){
  var index = this.module_paths.indexOf(folder);
  if(index !== -1){
    this.module_paths.splice(index, 1);
  }

  var sharedIndex = this.shared.module_paths.indexOf(folder);
  if(sharedIndex !== -1){
    this.shared.module_paths.splice(sharedIndex, 1);
  }

  if(recursive){
    var i = 0;
    var cont = true;
    var base = null;

    while(cont){
      if(i >= this.module_paths.length){
        cont = false;
        continue;
      }

      base = path.basename(this.module_paths[i]);
      if(base === folder){
        this.module_paths.splice(i, 1);
        continue;
      }

      i++;
    }

    i = 0;
    cont = true;

    while(cont){
      if(i >= this.shared.module_paths.length){
        cont = false;
        continue;
      }

      base = path.basename(this.shared.module_paths[i]);
      if(base === folder){
        this.shared.module_paths.splice(i, 1);
        continue;
      }

      i++;
    }
  }

  this.emit('modulePathRemoved', folder, recursive);
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