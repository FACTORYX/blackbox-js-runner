runPuzzle = require('../runPuzzle');

code = require('fs').readFileSync(__dirname+'/code.js', 'utf8');
test = require('./test');

runPuzzle(code, test, function(result){
  console.log('ran puzzle');
  console.log(result);
  process.exit();
});
