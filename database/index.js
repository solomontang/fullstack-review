var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repoTitle: String,
  url: String,
  forks: Number

});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;