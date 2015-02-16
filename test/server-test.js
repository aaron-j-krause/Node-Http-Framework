var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);
var router = require('../lib/router');

var server = require('../lib/server');
