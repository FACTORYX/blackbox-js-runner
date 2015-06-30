var puzzle = require('puzzle-box');
var parser = require('stack-trace-parser');
//process.on('uncaughtException', function(e) {
//  console.log(e.stack);
//});

module.exports = function(code, test, done) {

  var box = puzzle.create();

  box.context({
    'require': require,
    'console': console,
    'module':  module
  });

  box.code('var done=finished;' + code);
  box.track('code');

  try {
    box.run()
  }
  catch (e) {

    var trace = parser.parse(e);

    done({
      errors: [
        {
          message: trace.message,
          lineNumber: trace[0].lineNumber
        }
      ]
    });

  }

  box.on('finished', function(){

    // TODO: tracing
    // var tracer = box.tracer();

    // run the test
    var res = test(box);
    res.forEach(function(tst){
      try {
        tst.assertion();
      }
      catch (e) {

        done({
          errors: tst.hints
        });

      }
    });

    box.dispose();
    done();

  });

}