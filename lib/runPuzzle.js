var puzzle = require('puzzle-box');
var parser = require('stack-trace-parser');

module.exports = function(code, test, done) {

  var box = puzzle.create();
  var errors = [];
  var mute = {
    log: function(){},
    error: function(){}
  };

  box.context({
    'require': require,
    'console': mute,
    'module':  module
  });

  box.code('var done=finished;' + code);

  box.on('error', function(e) {
    var trace = parser.parse(e);
    errors.push({
      message: trace.message,
      lineNumber: trace[0].lineNumber
    });

    box.dispose();
    return done(errors);

  });

  box.once('finished', function(){
    // run the test
    var res = test(box);
    res.forEach(function(tst){
      try {
        tst.assertion();
      }
      catch (e) {
        errors.push(tst.hints);
      }
    });
    box.dispose();
    return done(errors);

  });

  box.run();

};
