# nodejs-runner example


#### The test is written with an array of assertions.



```js
module.exports = function(box) {
  return [{
    assertion: function() {
      // errors thrown here will return the hints
      should.exist(box.nodes.name);

    },
    hints: [{
      clue: 'Did you create a variable called name?',
      solution: 'var name = "myname"'
    }]
  }]
}

```

### Test box arguments

The argument `box.nodes` contains an ast parsing of the user's code, broken out into each node

Example:

```
myfn: { path: '<anonymous>',
     start: { line: 8, column: 12 },
     end: { line: 8, column: 18 },
     id: '<anonymous>-callsite-8-12-8-18',
     type: 'callsite',
     name: 'myfn',
     nameStart: { line: 8, column: 12 },
     nameEnd: { line: 8, column: 16 }
  },

```


#### Full test example:

```js

var should = require('runner/node_modules/should');

module.exports = function(box) {
  return [{
    assertion: function() {

      // test if they created the function with the correct name
      should.exist(box.nodes.myfn);

    },
    hints: [{
      clue: 'Did you create a function called myfn?',
      solution: 'myfn = function() {}'
    }]
  },
  {
    assertion: function() {

      var handle = box.tracer.trackLogs({ids: [box.nodes.myfn.id]});
      console.log(handle);
      invocations = box.tracer.logDelta(handle);
      should(invocations.length).be.above(0);

    },
    hints: [{
      clue: 'Did you call myfn?',
      solution: 'myfn();'
    }]
  }

 ];
};

module.exports.timeout = 2000;

```
