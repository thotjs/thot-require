'use strict';

var req = require('./index')();

req.require('./package.json');
req.require('./specs', true);
req.require(['./specs/*.js']);