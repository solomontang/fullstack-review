var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../database/index.js');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  // TODO
  var options = {
    'method': 'GET',
    'uri': `https://api.github.com/users/${req.body.username}/repos`,
    'headers': {
      'User-Agent': 'solomontang'
    }
  };
  request(options, function (error, res, body) {
    body = JSON.parse(body);
    body.forEach( (repo) => {
      var doc = {
        'username': repo.owner.login,
        'repoTitle': repo.name,
        'url': repo.html_url,
        'forks': repo.forks_count,  
      };
      // db.find({repoTitle: repo.html_url}, function (err, docs) {
      //   console.log(docs);
      // });
      db.create( doc, function (error) {
        if (error) {
          console.log('Error creating document: ', error);
        }
      });
    })
  })
  res.sendStatus(201);

});

app.get('/repos', function (req, res) {
  // TODO
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

