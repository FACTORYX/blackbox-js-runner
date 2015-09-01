var fs = require('fs');
var path = require('path');

var code = fs.readFileSync(path.resolve(__dirname, '../code.js'), 'utf8');

(function runEval () {
  'use strict';
  var done = function(){};
  var req = require;
  require = function(name) {
    if (name.indexOf('.') > -1 || name.indexOf('/') > -1) {
      return req('/app/' + name);
    }
    return req(name);
  };

  eval(code);
})();
