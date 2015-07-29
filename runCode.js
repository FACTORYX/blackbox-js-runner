var fs = require('fs');
var path = require('path');

var code = fs.readFileSync(path.resolve(__dirname, '../code.js'), 'utf8');

(function runEval () {
  'use strict';
  var done = function(){};
  var req = require;
  require = function(name) {
    return req('/app/' + name);
  };

  eval(code);
})();
