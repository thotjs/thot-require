'use strict';

var path = require('path');
var fs = require('fs');
var isArray = Array.isArray;
var Promise = require('bluebird');
var resolve = require('resolve');

var jsHandler = require('./handlers/jsHandler');

var natives = process.binding('natives');
var nativeKeys = Object.keys(natives);
var nativeModules = {};
nativeKeys.forEach(function(key){
  if(key[0] !== '_'){
    nativeModules[key] = require(key);
  }
});

var ThotRequire = function ThotRequire(cwd){
  this.cache = {};
  this.handlers = {};

  this.changeDirectory(cwd);
  this._setDefaultHandlers();
};

ThotRequire.prototype._setDefaultHandlers = function _setDefaultHandlers(){
  this.handlers['js'] = {
    'enabled': true,
    'method': jsHandler
  };
};

ThotRequire.prototype.changeDirectory = function setWorkingDirectory(dir){
  if(dir) {
    this.cwd = path.resolve(path.dirname(module.parent.filename), dir);
    if(fs.statSync(this.cwd).isFile()) {
      this.cwd = path.dirname(this.cwd);
    }
  } else {
    this.cwd = process.cwd();
  }
};

ThotRequire.prototype.changeDirectoryAsync = function changeDirectoryAsync(dir, cb){
  var self = this;
  var prom = new Promise(function(resolve, reject){
    if(dir){
      self.cwd = path.resolve(path.dirname(module.parent.filename), dir);

      fs.stat(self.cwd, function(err, result){
        if(err){
          reject(err);
          return;
        }

        if(result.isFile()){
          self.cwd = path.dirname(self.cwd);
        }
        resolve(self.cwd);
      });
    } else {
      self.cwd = process.cwd();
      resolve(self.cwd);
    }
  });

  return prom.nodeify(cb);
};

ThotRequire.prototype.require = function require(filepath, namespace){
  // we have a glob here
  if(isArray(filepath)){
    console.log('we have a glob');
    return null;
  }

  // we have a directory here
  if(namespace){
    console.log('this is for a directory');
    return null;
  }

  // we have a single file to include here
  if(this.cache[filepath]){
    return this.cache[filepath];
  }

  return this._loadFileSync(filepath);
};

ThotRequire.prototype.requireAsync = function requireAsync(filepath, namespace, cb){
  if(typeof namespace === 'function'){
    cb = namespace;
    namespace = null;
  }

  var self = this;
  var prom = new Promise(function(resolve, reject){
    if(isArray(filepath)){
      console.log('we have a glob');
      resolve(null);
      return;
    }

    if(namespace){
      console.log('we have a directory');
      resolve(null);
      return;
    }

    var mod = self._loadFileAsync(filepath);
    mod.then(function(result){
      resolve(result);
    }, function(err){
      reject(err);
    });
  });

  return prom.nodeify(cb);
};

ThotRequire.prototype._loadFileSync = function _loadFileSync(filepath){
  // if it's a native module we can just return it
  if(nativeModules[filepath]){
    this.cache[filepath] = nativeModules[filepath];
    return nativeModules[filepath];
  }

  if(filepath[0] === '~'){
    // we have a local require so we need to resolve it
    filepath = this.cwd + filepath.substring(1);
  }

  // now we're down to a normal resolve algorithm so we find the files absolute path
  // we need to add any extensions enabled to this as an options
  var resolved = resolve.sync(filepath, {basedir: __dirname});

  if(this.cache[resolved]){
    return this.cache[resolved];
  }

  // here we need to use our extension handler based on the extension of the file and defaulting to .js
  return this._handleLoadSync(resolved);
};

ThotRequire.prototype._loadFileAsync = function _loadFileAsync(filepath){
  var prom = new Promise(function(resolve, reject){
    if(nativeModules[filepath]){
      resolve(nativeModules[filepath]);
      return;
    }

    // this has to be an npm module so we use the built-in recursion algorithm

    reject(new Error('Module not found'));
  });
  return prom;
};

ThotRequire.prototype._handleLoadSync = function _handleLoadSync(resolved, string){
  var handler = this.handlers['js'];
  var ext = path.extname(resolved);
  if(!ext){
    ext = 'js';
  }

  if(this.handlers[ext]){
    handler = this.handlers[ext];
  }

  var method = handler.method.file;
  if(string){
    method = handler.method.string;
  }

  var module = method(resolved);

  if(!string){
    this.cache[resolved] = module;
  }

  return module;
};

ThotRequire.prototype.getCache = function getCache(){
  return this.cache;
};

ThotRequire.prototype.clearCache = function clearCache(){
  this.cache = {};
};

ThotRequire.prototype.removeFromCache = function removeFromCache(){

};

ThotRequire.prototype.getHandlers = function getHandlers(){
  return this.handlers;
};

var main = function main(cwd){
  return new ThotRequire(cwd);
};

module.exports = main;