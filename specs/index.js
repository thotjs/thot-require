'use strict';

var req = require('../');
var thotRequire = req();
var assert = require('assert');

describe('thotRequire', function(){
  it('Should default to the current working directory', function(done){
    assert.equal(thotRequire.cwd, process.cwd());
    done();
  });

  it('Should allow changing the current directory', function(done){
    thotRequire.changeDirectory('../specs');
    assert.equal(thotRequire.cwd, process.cwd() + '/specs');
    done();
  });

  it('Should allow changing the current directory async');

  it('Should allow reverting back to the default working directory', function(done){
    thotRequire.changeDirectory();
    assert.equal(thotRequire.cwd, process.cwd());
    done();
  });

  it('Should emit the directory set event', function(done){
    thotRequire.on('directorySet', function(dir){
      assert.equal(dir, process.cwd());
      done();
    });
    thotRequire.changeDirectory();
  });

  it('Should be able to require native modules', function(done){
    var path = thotRequire.require('path');
    assert.equal(typeof path.resolve, 'function');
    done();
  });

  it('Should emit requireStarted', function(done){
    thotRequire.once('requireStarted', function(filePath){
      assert.equal('path', filePath);
      done();
    });
    var path = thotRequire.require('path');
    assert.equal(typeof path.resolve, 'function');
  });

  it('Should emit requireFinished', function(done){
    thotRequire.once('requireFinished', function(filePath){
      assert.equal('path', filePath);
      done();
    });
    var path = thotRequire.require('path');
    assert.equal(typeof path.resolve, 'function');
  });

  it('Should be able to require native modules async');

  it('Should be able to require npm modules');

  it('Should be able to require npm modules async');

  it('Should be able to require npm modules up the tree');

  it('Should be able to require npm modules up the tree async');

  it('Should be able to require relative modules');

  it('Should be able to require relative modules async');

  it('Should be able to require absolute modules');

  it('Should be able to require absolute modules async');

  it('Should be able to require local modules');

  it('Should be able to require local modules async');

  it('Should be able to handle namespaced directory includes');

  it('Should be able to handle namespaced directory includes async');

  it('Should be able to handle globs');

  it('Should be able to handle globs async');

  it('Should be able to handle dependencies');

  it('Should be able to handle dependencies async');

  it('Should be able to handle circular dependencies');

  it('Should be able to handle circular dependencies async');

  it('Should have tracing disable by default');

  it('Should allow tracing to be enabled');

  it('Should emit tracingEnabled');

  it('Should allow tracing to be disabled');

  it('Should emit tracingDisabled');

  it('Should emit cacheHit');

  it('Should emit cacheMiss');

  it('Should allow clearing the cache');

  it('Should emit cacheCleaned');

  it('Should allow removing a specifc file from the cache');

  it('Should emit removedFromCache');

  it('Should return the current cache');

  it('Should allow loading a string as a module');

  it('Should emit stringLoaded');

  it('Should allow loading a string as a module async');

  it('Should be able to handle dependencies when a string is loaded');

  it('Should be able to handle dependencies when a string is loaded async');

  it('Should allow adding new extension handlers');

  it('Should emit extensionAdded');

  it('Should return a list of handlers');

  it('Should allow disabling of handlers');

  it('Should emit extensionDisabled');

  it('Should allow enabling of handlers');

  it('Should emit extensionEnabled');
});