'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var Module = require('module');

console.log(Object.keys(Module));

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

  var globals = globals || {};

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
  var globals = globals || {};

  globals.__dirname = path.dirname(filepath);
  globals.__filename = path.basename(filepath);

  
};

var loadStringAsync = function loadStringAsync(string, cb){

};

var loadString = function loadString(string, cb){
  if(cb){
    loadStringAsync(string, cb);
  } else {
    return loadStringSync(string);
  }
};

module.exports = {
  'file': loadFile,
  'string': loadString
};