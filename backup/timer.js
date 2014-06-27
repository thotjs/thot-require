'use strict';

require('thot-cwd');

var main = function main(cb) {

  var Module = require('module').Module;
  var _load = Module._load;

  var thotRequire = function thotRequire(request, parent, isMain) {
    var timeIn = process.hrtime();
    var value = _load(request, parent, isMain);
    if(cb){
      var diff = process.hrtime(timeIn);
      cb(diff[0] * 1e9 + diff[1]);
    }
    return value;
  };

  Module._load = thotRequire;
};

module.exports = main;