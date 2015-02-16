var http = require('http');
var url = require('url');
var router = require('./router.js');
var methods = require('./action-methods')
var fs = require('fs');

exports.start = function(port) {
  function onRequest(req, res) {
    var splitUrl = (url.parse(req.url).pathname).split('/')
    var action = req.method;
    req.pathname = '/' + splitUrl[1];
    req.params = splitUrl[2];
    req.db = fs.readdirSync('./data');
    req.fileCount = req.db.length;
    req.on('data', function(data){
      req.body = JSON.parse(data);
    })
    methods.setMethods(action, res);
    router.route(req.pathname, action, req, res);
  }
  http.createServer(onRequest).listen(port, function() {
    console.log('server running on port:' + port);
  });
};
