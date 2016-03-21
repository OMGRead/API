"use_strict";

var argv = require('minimist')(process.argv.slice(2));
var environement = argv.env || 'test';

var common_conf = {
  name: "OMGRead",
  version: "0.0.1",
  cloudCode: __dirname + '/cloud/main.js',
  appId: "63966E18-33C1-431B-A50E-4F68652C2A4D",
  masterKey: "5B45972F-36B7-4FBB-85A0-B2EA733586CD"
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
