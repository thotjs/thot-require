'use strict';

var req = require('./index')();

var path = req.require('path');
console.log(typeof path);
//req.require('./package.json');
//req.require('./specs', true);
//req.require(['./specs/*.js']);