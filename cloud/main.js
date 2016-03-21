var Parse = require('parse/node');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
