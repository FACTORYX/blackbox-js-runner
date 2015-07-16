var fs = require('fs');
var path = require('path');
var runPuzzle = require('./lib/runPuzzle');

var code = fs.readFileSync(path.resolve(__dirname, '../code.js'), 'utf8');
process.env.NODE_PATH = __dirname;
var test = require(path.resolve(__dirname, '../test'));

runPuzzle(code, test, function(result){
  console.log(JSON.stringify(result));
  process.exit();
});
