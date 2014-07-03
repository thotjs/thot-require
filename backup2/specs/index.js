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

  it('Should allow changing the current directory async', function(done){
    thotRequire.changeDirectoryAsync(null, function(err, results){
      assert.equal(results, process.cwd());
      assert.equal(err, null);
      done();
    });
  });

  it('Should support promises', function(done){
    var prom = thotRequire.changeDirectoryAsync('./');
    prom.then(function(result){
      assert.equal(result, process.cwd() + '/specs');
      done();
    }, function(err){
      assert.equal(err, null);
      done();
    });
  });

  it('Should allow reverting back to the default working directory', function(done){
    thotRequire.changeDirectory();
    assert.equal(thotRequire.cwd, process.cwd());
    done();
  });

  it('Should be able to require native modules', function(done){
    var path = thotRequire.require('path');
    assert.equal(typeof path.resolve, 'function');
    done();
  });

  it('Should be able to require native modules async', function(done){
    thotRequire.requireAsync('path', function(err, result){
      assert.equal(typeof result.resolve, 'function');
      assert.equal(err, null);
      done();
    });
  });

  it('Should be able to require npm modules', function(done){
    var harmony = thotRequire.require('thot-harmony');
    assert.equal(typeof harmony, 'function');
    done();
  });

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

  it('Should allow clearing the cache', function(done){
    thotRequire.clearCache();
    assert.equal(Object.keys(thotRequire.getCache()).length, 0);
    done();
  });

  it('Should allow removing a specific file from the cache');// this should follow the same logic as require

  it('Should return the current cache', function(done){
    var cache = thotRequire.getCache();
    assert.equal(typeof cache, 'object');
    done();
  });

  it('Should allow loading a string as a module');

  it('Should allow loading a string as a module async');

  it('Should be able to handle dependencies when a string is loaded');

  it('Should be able to handle dependencies when a string is loaded async');

  it('Should have the default handlers enabled by default');

  it('Should allow adding new extension handlers');

  it('Should return a list of handlers', function(done){
    var handlers = thotRequire.getHandlers();
    assert.equal(typeof handlers, 'object');
    done();
  });

  it('Should allow disabling of handlers');

  it('Should allow enabling of handlers');
});