var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../database/index.js');
// var utils = requre('/utils.js');

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

      db.find({}, 'url', function (err, docs) {
        console.log(docs);
        // body = body.filter( (repo) => {
        //   return docs.reduce( (found, r) => {
        //     if (!found) {
        //       return found;
        //     }
        //     console.log(r.url, repo.url);
        //     return found = r.url === repo.url;
        //   }, true);
        // });
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

