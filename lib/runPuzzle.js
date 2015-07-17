var puzzle = require('puzzle-box');
var parser = require('stack-trace-parser');

module.exports = function(code, test, done) {

  var box = puzzle.create();
  var output = {
    errors: []
  };
  var timeout = test.timeout || 3000;

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
  }, timeout);

  box.on('error', function(e) {
    var trace = parser.parse(e);
    if (!trace[0]) {
      return;
    }
    output.errors.push({
      message: trace.message,
      lineNumber: trace[0].lineNumber
    });

    box.dispose();
    return done(output);

  });

  box.once('finished', function(){
    clearTimeout(kill);
    // run the test
    box.tracer = box._context.__tracer;
    box.nodes = {};

    box.tracer.nodes().forEach(function(v, k) {
      box.nodes[v.name] = v;
    });

    var res = test(box);
    var solved = true;
    res.forEach(function(tst){
      try {
        tst.assertion();
      }
      catch (e) {
        tst.hints.forEach(function(v, k) {
          output.errors.push(v);
        });
        solved = false;
      }
    });
    output.solved = solved;
    box.dispose();
    return done(output);

  });

  box.run();

};
