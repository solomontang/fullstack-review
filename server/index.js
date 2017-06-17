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
  console.log(req.body);
  var options = {
    'method': 'GET',
    'uri': `https://api.github.com/users/${req.body.username}/repos`,
    'headers': {
      'User-Agent': 'solomontang'
    }
  };

  request(options, function (error, res, body) {
    body = JSON.parse(body);
    if (error) {
      console.log('Could not get response from GitHub', error);
    } else if (Array.isArray(body)) {
      // console.log(body);
      db.find({}, 'url', function (err, docs) {
        console.log('url', docs);
        body = body.filter ( (git) => {
          return docs.reduce( (found, db) => {
            if (!found) {
              return false;
            }
            return db.url !== git.html_url
          },true);
        })
        
        // console.log(body);
        console.log(body.length);
        body.forEach( (repo) => {
          console.log(repo.name);
          var doc = {
            'username': repo.owner.login,
            'repoTitle': repo.name,
            'url': repo.html_url,
            'forks': repo.forks_count,  
          };
          
          db.create( doc, function (error) {
            if (error) {
              console.log('Error creating document: ', error);
            }
          });
        });
      });
    }
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

