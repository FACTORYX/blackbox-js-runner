var should = require('should');

module.exports = function(box) {
  var tracer = box._context.__tracer;
  return [{
    test: 'foo',
    assertion: function() {
      var handle = tracer.trackLogs({ids: [tracer.nodes()[1].id]});
      invocations = tracer.logDelta(handle);
      should(tracer.nodes()[1].name).equal('console.log');
      // should(invocations[0].arguments[0].value.value).equal('test');
    },
    hints: [{
      message: "console.log should be added"
    }]
  }];
};
