var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var config = require('./config');
var path = require('path');

var api = new ParseServer({
  databaseURI: config.config.database,
  cloud: config.common_conf.cloudCode,
  appId: config.common_conf.appId,
  masterKey: config.common_conf.masterKey,
  serverURL: config.config.serverURL,
  oauth: config.config.oauth
});

var app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/parse', api);

app.get('/', function(req, res) {
  res.status(200).send('WOWRead API');
});

app.listen(config.config.port, function() {
  console.log('parse-server-example running on port ' + config.config.port + '.');
});
