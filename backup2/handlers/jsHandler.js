'use strict';

var fs = require('fs');
var path = require('path');
var Module = require('module');
var vm = require('vm');
var resolve = require('resolve');

function stripBOM(content) {
  // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
  // because the buffer-to-string conversion in `fs.readFileSync()`
  // translates it to FEFF, the UTF-16 BOM.
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var loadFileSync = function loadFileSync(filepath){
  var contents = stripBOM(fs.readFileSync(filepath, {'encoding': 'utf-8'}));

  return loadStringSync(contents, filepath);
};

var loadFileAsync = function loadFileAsync(filepath, cb){

};

var loadFile = function loadFile(filePath, cb){
  if(cb){
    loadFileAsync(filePath, cb);
  } else {
    return loadFileSync(filePath);
  }
};

var loadStringSync = function loadStringSync(string, filepath){
  var dirname = path.dirname(filepath);
  var wrapper = Module.wrap(string);

  var compiledWrapper = vm.runInThisContext(wrapper, { filename: filepath });

  var req = require('../index');
  var child = req(dirname);

  var exports = {};
  child.id = filepath;
  child.exports = exports;
  child.loaded = false;
  child.parent = module.parent.parent;
  child.filename = filepath;
  child.children = [];
  child.parent.paths = Module._nodeModulePaths(path.dirname(child.parent.filename));
  child.paths = Module._nodeModulePaths(dirname);

  var childReq = child.require.bind(child);
  childReq.cache = child.getCache();
  childReq.extensions = child.getHandlers();
  childReq.main = process.mainModule;
  child.resolve = function(path){
    return resolve.sync(path, {basedir: dirname});
  };

  var args = [exports, childReq, child, filepath, dirname];
  compiledWrapper.apply(exports, args);

  child.loaded = true;
  child.parent.children.push(child);

  return child.exports;
};

var loadStringAsync = function loadStringAsync(string, filepath, cb){

};

var loadString = function loadString(string, filepath, cb){
  if(cb){
    loadStringAsync(string, filepath, cb);
  } else {
    return loadStringSync(string, filepath);
  }
};

module.exports = {
  'file': loadFile,
  'string': loadString
};