'use strict';

var path = require('path');

var ThotRequire = function ThotRequire(cwd){
  this.cwd = path.dirname(module.parent.filename);

  if(cwd){
    this.cwd = path.resolve(this.cwd, cwd);
  }
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

var main = function main(cwd){
  return new ThotRequire(cwd);
};

module.exports = main;