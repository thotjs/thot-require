'use strict';

var thotRequire = require('../');
var req = thotRequire();

// test native modules for both node and thotRequire
suite('thotRequire Sync', function(){
  set('iterations', 100000);
  set('mintime', 2000);

  bench('native', function(){
    req.require('path');
  });

  bench('npm', function(){
    req.require('thot-harmony');
  });
});

suite('thotRequire Async', function(){
  set('iterations', 100000);
  set('mintime', 2000);

  bench('native', function(done){
    req.requireAsync('path').then(function() {
      done();
    });
  });
});

suite('nodeRequire', function(){
  set('iterations', 100000);
  set('mintime', 2000);

  bench('native', function(){
    require('path');
  });

  bench('npm', function(){
    require('thot-harmony');
  });
});