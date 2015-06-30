var mongoose = require('mongoose');
// connect to db
mongoose.connect('learntobuild.org:27015/test');
var db = mongoose.connection;

// on error
db.on('error', console.error.bind(console, 'connection error:'));

// on connection
db.once('open', function () {
  console.log('mongoose connected!')
// define schema

  var kittySchema = mongoose.Schema({
    name: String
    });

  // register schema
  var Kitten = mongoose.model('Kitten', kittySchema)

  var silence = new Kitten({ name: 'Test' })
  console.log(silence.name) // 'Test'

  // save to DB
  silence.save(function (err, silence) {
    if (err) return console.error(err);
    done(silence);
  });
});