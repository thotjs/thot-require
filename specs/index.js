'use strict';

var should = require('should');

var thotRequire = require('../index');
var path = require('path');
var req = thotRequire();

describe('thot-require', function(){
  it('Should resolve to a function');

  it('Should return an object');

  it('Should have a default current working directory');

  it('Should allow setting of the current working directory at creation');

  it('Should allow setting of the current working directory at runtime');

  it('Should return the current working directory');

  it('Should support the current working directory as an absolute path');

  it('Should support the current working directory as a relative path');

  it('Should support the current working directory as a local path');

  it('Should have a method to get the module paths');

  it('Should have a method to add a path to the module paths');

  it('Should be able to set a new module path to recursive');

  it('Should be able to remove a module path');

  it('Should be able to recursively remove a module path');

  it('Should be able to require files synchronously');

  it('Should be able to require files asynchronously');

  it('Should support promises for all async methods');

  it('Should be able to resolve a filepath synchronously');

  it('Should be able to resolve a filepath asynchronously');

  it('Should be able to support requiring directories into a namespace');

  it('Should be able to support requiring based on globs');

  it('Should support resolving a namespace');

  it('Should be able to support resolving a glob');

  it('Should have tracing disabled by default');

  it('Should support enabling tracing at runtime');

  it('Should support disabling tracing at runtime');

  it('Should return the current state of tracing');

  it('Should return the traces that were created');

  // start, resolve, load, transform(s), compile, end, total
  it('Should have multiple points per trace');

  it('Should be able to clear the existing traces');

  it('Should support caching');

  it('Should support getting the cache');

  it('Should support clearing the cache');

  it('Should support removing a single item from the cache');

  it('Should support loading strings synchronously');

  it('Should support loading strings asynchronously');

  it('Should override the built-in require on required modules');

  it('Should support requires in loaded modules');

  it('Should support requiring built in modules');

  it('Should support requiring modules from npm');

  it('Should support requiring absolute paths');

  it('Should support requiring relative paths');

  it('Should support requiring local paths');

  it('Should allow adding a new resolver');

  it('Should return a list of the current resolvers');

  it('Should allow the adding of new loaders');

  it('Should return a list of the current loaders');

  it('Should allow disabling a loader');

  it('Should allow enabling a loader');

  it('Should return a list of the active loaders');

  it('Should support adding new transformers');

  it('Should support getting a list of transformers');

  it('Should support disabling a transformer');

  it('Should support enabling a transformer');

  it('Should support getting list of the active transformers');

  it('Should support using multiple transformers in a single handler');

  it('Should support adding new compilers');

  it('Should support getting a list of compilers');

  it('Should support disabling a compiler');

  it('Should support enabling a compiler');

  it('Should return a list of active compilers');

  it('Should return a list of extensions');

  it('Should support disabling an extension');

  it('Should support enabling an extension');

  it('Should return a list of active extensions');

  it('Should have a preResolve hook');

  it('Should have a preLoad hook');

  it('Should have a preTransform hook');

  it('Should have a postTransform hook');

  it('Should have a postCompile hook');

  it('Should extend eventEmitter');

  it('Should support commonjs modules');

  it('Should support amd modules');

  it('Should support es6 modules');

  it('Should support loading over http');

  it('Should support async loading over http');

  it('Should support stack traces properly');

  // need to figure out what events to support...

});