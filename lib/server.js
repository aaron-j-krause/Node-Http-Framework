var http = require('http');
var url = require('url');
var router = require('./router.js');
var methods = require('./action-methods');
var fs = require('fs');

var options = {
  fileDestination: './'
};

exports.start = function(port) {
  function onRequest(req, res) {
    var splitUrl = (url.parse(req.url).pathname).split('/');
    var action = req.method;
    var routes = router.showRoutes();

    req.fileDestination = options.fileDestination;
    req.pathname = '/' + splitUrl[1];
    req.params = splitUrl[2];
    req.fileCount = fs.readdirSync(req.fileDestination).length;
    req.on('data', function(data) {
      req.body = JSON.parse(data);
    });

    if (!routes[req.pathname]) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('ERROR: No route defined for ' + req.pathname);
    } else {
      methods.setMethods(action, res);
      router.route(req.pathname, action, req, res);
    }
  }
  http.createServer(onRequest).listen(port, function() {
    console.log('server running on port:' + port);
  });
};

exports.setFileDestination = function(path) {
  options.fileDestination = path;
};
