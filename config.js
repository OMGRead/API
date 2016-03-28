"use_strict";

var auth = require('config.json')('./auth.json');
var argv = require('minimist')(process.argv.slice(2));
var environement = argv.env || 'test';

var common_conf = {
  name: "OMGRead",
  version: "0.0.1",
  cloudCode: __dirname + '/cloud/main.js',
  appId: auth.appId,
  masterKey: auth.masterKey,
  oauth: {
   facebook: {
     appIds: auth.facebookAppIds
   }
  }
};

var conf = {
  production: {
    ip: argv.ip || "127.0.0.1",
    port: argv.port || "8001",
    database: "mongodb://localhost/OMGRead_prod",
    serverURL: "http://localhost:8001/parse"
  },
  test: {
    ip: argv.ip || "127.0.0.1",
    port: argv.port || "8002",
    database: "mongodb://localhost/OMGRead_dev",
    serverURL: "http://localhost:8002/parse"
  }
};

module.exports.config = conf[environement];
module.exports.common_conf = common_conf;
