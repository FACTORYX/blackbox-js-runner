var should = require('should');

module.exports = function(box) {

  return [{
      test: 'foo',
      assertion: function() { true.should.equal(false);},
      hints: [{
        message: "true should not be false",
        lineNumber: 0
      }]
    },
    {
      test: "mongoose should be defined",
      assertion: function() { box.sandbox().mongoose.should.have.property('connections');},
      hints: [{
        message: "did you forget to define mongoose?",
        lineNumber: 0
      }]
    }];
};
