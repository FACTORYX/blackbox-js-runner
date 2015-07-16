var fs = require('fs');
var path = require('path');

var code = fs.readFileSync(path.resolve(__dirname, '../code.js'), 'utf8');

(function runEval () {
  'use strict';
  var done = function(){};
  eval(code);
})();
