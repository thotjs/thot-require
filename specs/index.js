'use strict';

var should = require('should');

var thotRequire = require('../index');
var req = thotRequire();
var path = require('path');

describe('thot-require', function(){
  it('Should resolve to a function', function(done){
    thotRequire.should.be.an.instanceOf(Function);
    done();
  });

  it('Should return an object', function(done){
    req.should.be.an.instanceOf(Object);
    done();
  });

  it('Should have a default current working directory', function(done){
    req.getCWD().should.be.an.instanceOf(String);
    done();
  });

  it('Should have the same default directory as the requiring file', function(done){
    req.getCWD().should.be.equal(__dirname);
    done();
  });

  it('Should allow setting of the current working directory at creation', function(done){
    let reqTemp = thotRequire('../');
    reqTemp.getCWD().should.be.equal(path.resolve(__dirname, '../'));
    done();
  });

  it('Should allow setting of the current working directory at runtime', function(done){
    req.setCWD('../');
    req.getCWD().should.be.equal(path.resolve(__dirname, '../'));
    req.setCWD();
    done();
  });

  it('Should emit a directory changed event', function(done){
    req.setCWD('../');
    req.once('directory.changed', function(){
      done();
    });
    req.setCWD();
  });

  it('Should return the current working directory', function(done){
    req.getCWD().should.be.equal(__dirname);
    done();
  });

  it('Should support the current working directory as an absolute path', function(done){
    req.setCWD('/');
    req.getCWD().should.be.equal('/');
    req.setCWD();
    done();
  });

  it('Should support the current working directory as a relative path', function(done){
    req.setCWD('../');
    req.getCWD().should.be.equal(path.resolve(__dirname, '../'));
    req.setCWD();
    done();
  });

  it('Should support the current working directory as a local path', function(done){
    req.setCWD('~/index.js');
    req.getCWD().should.be.equal(path.resolve(__dirname, '../'));
    req.setCWD();
    done();
  });

// module paths
  it('Should set the default module paths when required', function(done){
    var module_paths = req.getModulePaths();
    module_paths.should.be.an.instanceOf(Array);
    module_paths.length.should.be.greaterThan(4);
    done();
  });

  it('Should add the module paths based on the parent module when it\' instantiated', function(done){
    var module_paths = req.getModulePaths();
    module_paths[0].should.be.equal(__dirname + '/node_modules');
    done();
  });

  it('Should update the module paths when the cwd is updated', function(done){
    req.setCWD('../');
    var module_paths = req.getModulePaths();
    module_paths[0].should.be.equal(path.dirname(__dirname) + '/node_modules');
    req.setCWD();
    done();
  });

  it('Should have a method to get the module paths', function(done){
    req.getModulePaths.should.be.an.instanceOf(Function);
    done();
  });

  it('Should be able to add a new module path', function(done){
    req.addModulePath('./');
    req.shared.module_paths[0].should.be.equal(__dirname);
    done();
  });

  it('Should have a module path added event', function(done){
    req.once('modulePathAdded', function(){
      done();
    });
    req.addModulePath('../');
  });

  it('Should be able to set a new module path to recursive', function(done){
    req.addModulePath('custom_modules', true);
    var modules = req.getModulePaths();
    modules.indexOf('/custom_modules').should.not.be.equal(-1);
    done();
  });

  it('Should be able to remove a module path', function(done){
    req.removeModulePath(path.dirname(__dirname) + '/custom_modules');

    var modules = req.getModulePaths();
    modules.indexOf(path.dirname(__dirname) + '/custom_modules').should.be.equal(-1);

    req.addModulePath(path.dirname(__dirname) + '/custom_modules');
    done();
  });

  it('Should emit a module path removed event', function(done){
    req.once('modulePathRemoved', function(){
      done();
    });
    req.removeModulePath('/custom_modules');
    req.addModulePath('/custom_modules');
  });

  it('Should be able to recursively remove a module path', function(done){
    req.removeModulePath('custom_modules', true);
    var modules = req.getModulePaths();
    modules.should.not.containEql('/custom_modules');
    done();
  });

// requires
  it('Should be able to require files synchronously');

  it('Should emit a require started event');

  it('Should emit a require finished event');

  it('Should be able to require files asynchronously');

  it('Should be able to support requiring directories into a namespace');

  it('Should be able to support requiring based on globs');

  it('Should override the built-in require on required modules');

  it('Should support requires in loaded modules');

  it('Should support requiring built in modules');

  it('Should support requiring modules from npm');

  it('Should support requiring absolute paths');

  it('Should support requiring relative paths');

  it('Should support requiring local paths');

// promises
  it('Should support promises and callbacks');

// resolving
  it('Should be able to resolve a filepath synchronously', function(done){
    done();
  });

  it('Should be able to resolve a filepath asynchronously');

  it('Should support resolving a namespace');

  it('Should be able to support resolving a glob');

  it('Should allow adding a new resolver');

  it('Should emit a resolver added event');

  it('Shoulsd return a list of the current resolvers');

// tracing
  it('Should have tracing disabled by default');

  it('Should support enabling tracing at runtime');

  it('Should emit a tracing enabled event');

  it('Should support disabling tracing at runtime');

  it('Should emit a tracing disabled event');

  it('Should return the current state of tracing');

  it('Should return the traces that were created');

  // start, resolve, load, transform(s), compile, end, total
  it('Should have multiple points per trace');

  it('Should be able to clear the existing traces');

  it('Should emit a tracing cleared event');

// caching
  it('Should support caching');

  it('Should support getting the cache');

  it('Should support clearing the cache');

  it('Should support a cache cleared event');

  it('Should support removing a single item from the cache');

  it('Should emit a cache item removed event');

// strings
  it('Should support loading strings synchronously');

  it('Should emit a string load started event');

  it('Should emit a string load finished event');

  it('Should support loading strings asynchronously');

// loaders
  it('Should allow the adding of new loaders');

  it('Should emit a loader added event');

  it('Should return a list of the current loaders');

  it('Should allow disabling a loader');

  it('Should emit a loader disabled event');

  it('Should allow enabling a loader');

  it('Should emit a loader enabled event');

  it('Should return a list of the active loaders');

// transformers
  it('Should support adding new transformers');

  it('Should emit a transformer added event');

  it('Should support getting a list of transformers');

  it('Should support disabling a transformer');

  it('Should emit a transformer disabled event');

  it('Should support enabling a transformer');

  it('Should emit a transformer enabled event');

  it('Should support getting list of the active transformers');

  it('Should support using multiple transformers in a single handler');

// compilers
  it('Should support adding new compilers');

  it('Should emit a compiler added event');

  it('Should support getting a list of compilers');

  it('Should support disabling a compiler');

  it('Should emit a compiler disabled event');

  it('Should support enabling a compiler');

  it('Should emit a compiler enabled event');

  it('Should return a list of active compilers');

// extensions
  it('Should return a list of extensions');

  it('Should support disabling an extension');

  it('Should emit an extension disabled event');

  it('Should support enabling an extension');

  it('Should emit an extension enabled event');

  it('Should return a list of active extensions');

// hooks
  it('Should have a preResolve hook');

  it('Should emit a hook added event');

  it('Should have a preLoad hook');

  it('Should have a preTransform hook');

  it('Should have a postTransform hook');

  it('Should have a postCompile hook');

// event emitter
  it('Should extend eventEmitter2');

// module support
  it('Should support commonjs modules');

  it('Should support amd modules');

  it('Should support es6 modules');

// http
  it('Should support loading over http');

  it('Should support async loading over http');

// stack traces & errors
  it('Should support stack traces properly');

  it('Should emit an error event');
});