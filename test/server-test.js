var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
var expect = chai.expect;
chai.use(chaihttp);
var server = require('../lib/server.js');

describe('Server', function() {

  before(function() {
    server.setFileDestination('/test', 'TestDirForTests');
    server.start(3333);
  });

  after(function() {
    fs.rmdirSync(__dirname + '/../TestDirForTests');
    server.resetOptions();
    server.stop();
  });

  it('should start a server', function(done) {
    chai.request('localhost:3333/')
        .get('/test')
        .end(function(err, data) {
          expect(data).to.have.status(404);
          done();
        });
  });

  it('should create a directory', function(done) {
    fs.readdir(__dirname + '/../', function(err, data) {
      expect(data).to.contain('TestDirForTests');
      done();
    });
  });

  it('should add path to paths', function() {
    var results = server.returnOptions();
    expect(results).to.have.property('/test');
  });

});
