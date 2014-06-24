'use strict';

var req = require('../');
var thotRequire = req();
var assert = require('assert');

describe('ThotGen', function(){
  it('Should support setting the current working directory', function(done){
    var obj = req('./');
    assert.notEqual(obj.cwd.indexOf('specs'), -1);
    done();
  });

  it('Should support defaulting to the current working directory', function(done){
    var obj = req();
    assert.equal(obj.cwd.indexOf('specs'), -1);
    done();
  });

  it('Should have tracing turned off by default', function(){
    assert.equal(thotRequire.tracingEnabled(), false);
  });

  it('Should allow enable of tracing', function(){
    thotRequire.enableTracing();
    assert.equal(thotRequire.tracingEnabled(), true);
  });

  it('Should allow disabling of tracing', function(){
    thotRequire.disableTracing();
    assert.equal(thotRequire.tracingEnabled(), false);
  });
});