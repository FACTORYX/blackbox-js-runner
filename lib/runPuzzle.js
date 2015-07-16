var puzzle = require('puzzle-box');
var parser = require('stack-trace-parser');

module.exports = function(code, test, done) {

  var box = puzzle.create();
  var errors = [];
  var delay = test.delay || 3000;

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

  kill = setTimeout(function() {
    box.emit('finished');
  }, delay);

  box.on('error', function(e) {
    var trace = parser.parse(e);
    if (!trace[0]) {
      return;
    }
    errors.push({
      message: trace.message,
      lineNumber: trace[0].lineNumber
    });

    box.dispose();
    return done(errors);

  });

  box.once('finished', function(){
    clearTimeout(kill);
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
