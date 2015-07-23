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

    box.calls = {};
    box.functions = {};
    box.nodes = box._sandbox.nodes.body;

    box.nodes.forEach(function(v, k) {
      var ref, ref1, ref2, ref3, ref4;

      if (v.type === 'VariableDeclaration') {
        if (((ref = v.declarations[0]) != null ? (ref1 = ref.id) != null ? ref1.name : void 0 : void 0) == null) {
          return;
        }
        parsed.variables[v.declarations[0].id.name] = v;
      }

      if (v.type === 'FunctionDeclaration') {
        if (((ref2 = v.id) != null ? ref2.name : void 0) == null) {
          return;
        }
        parsed.functions[v.id.name] = v;
      }

      if (v.type === 'ExpressionStatement') {
        if (((ref3 = v.expression) != null ? (ref4 = ref3.callee) != null ? ref4.name : void 0 : void 0) == null) {
          return;
        }
        parsed.calls[v.expression.callee.name] = v.expression;
      }
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
