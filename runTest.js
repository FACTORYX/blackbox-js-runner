var fs = require('fs');
var runPuzzle = require('./lib/runPuzzle');

code = fs.readFileSync('./code.js');
test = require('../test');

runPuzzle(code, test, function(result){
  console.log(JSON.stringify(result));
  process.exit();
});
