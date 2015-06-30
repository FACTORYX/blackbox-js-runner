require('coffee-script/register');
var fs = require('fs');
var runPuzzle = require('./runPuzzle');

code = fs.readFileSync(__dirname+'/../code.js');
test = require('../test');

runPuzzle(code, test, function(result){
  console.log(result);
});