var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  // TODO
  console.log('I GOT POST', req.body);
});

app.get('/repos', function (req, res) {
  // TODO
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

