var http = require('http');
var url = require('url');
var router = require('./router.js');
var methods = require('./action-methods');
var fs = require('fs');

var options = {};

var actualServer;

function startActualServer(callback, port) {
  actualServer = http.createServer(callback).listen(port, function() {
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
}

function onRequest(req, res) {
  var pathName = url.parse(req.url).pathname;
  var splitUrl = (pathName).split('/');
  var action = req.method;
  var routes = router.showRoutes();
  req.pathname = pathName == '/' ? '/' : '/' + splitUrl[1];
  req.params = splitUrl[2];

  if (!routes[req.pathname]) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('ERROR: No route defined for ' + req.pathname);
  } else {
    req.fileDestination = options[req.pathname].fileDestination;
    req.db = fs.readdirSync(req.fileDestination);
    req.fileCount = fs.readdirSync(req.fileDestination).length;
    req.on('data', function(data) {
      req.body = JSON.parse(data);
    });
    methods.setMethods(action, res);
    router.route(req.pathname, action, req, res);
  }
}

exports.stop = function() {
  actualServer.close();
};

exports.start = function(port) {
  startActualServer(onRequest, port);
};

exports.setFileDestination = function(route, path) {
  options[route] = {};
  var dir = __dirname + '/../';
  var dirContents = fs.readdirSync(dir);
  if (dirContents.indexOf(path) === -1) {
    console.log('Directory: ' + path + ' not found, creating directory.');
    fs.mkdirSync(dir + path);
  } else {
    options[route].fileDestination = dir + path + '/';
  }
};

exports.returnOptions = function() {
  return options;
};

exports.resetOptions = function() {
  options = {};
};
