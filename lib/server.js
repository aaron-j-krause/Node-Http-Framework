var http = require('http');
var url = require('url');
var router = require('./router.js');
var methods = require('./action-methods');
var fs = require('fs');

var options = {};

exports.start = function(port) {
  function onRequest(req, res) {
    var splitUrl = (url.parse(req.url).pathname).split('/');
    var action = req.method;
    var routes = router.showRoutes();

    req.pathname = '/' + splitUrl[1];
    req.params = splitUrl[2];
    req.fileDestination = options[req.pathname].fileDestination;
    req.db = fs.readdirSync(req.fileDestination);
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
    var routes = router.showRoutes();
    for (var i in routes) {
      if (routes.hasOwnProperty(i)) {
        if (!(i in options)) {
          var err = new Error('No file destination set for path: ' + i);
          throw err;
        }
      }
    }
    console.log('server running on port:' + port);
  });
};

exports.setFileDestination = function(route, path) {
  options[route] = {};
  var dir = fs.readdirSync(__dirname + '/../');
  if (dir.indexOf(path) === -1) {
    var err = new Error('Directory: ' + path +
      ' not found. Create directory or choose another.');
    throw err;
  } else {
    options[route].fileDestination = __dirname + '/../' + path + '/';
  }
};
