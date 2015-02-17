var server = require('./lib/server.js');
var router = require('./lib/router.js');

var App = function(server, router) {
  this.start = server.start;
  this.setFileDestination = server.setFileDestination;
  this.put = router.put;
  this.post = router.post;
  this.del = router.del;
  this.get = router.get;
  this.patch = router.patch;
};

module.exports = new App(server, router);
