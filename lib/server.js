var http = require('http');
var url = require('url');
var router = require('./router.js');
var methods = require('./action-methods')

exports.start = function(port) {
  function onRequest(req, res) {
    var splitUrl = (url.parse(req.url).pathname).split('/')
    req.pathname = '/' + splitUrl[1];
    req.params = splitUrl[2];
    console.log(res.status, 'response status', res.hasOwnProperty('status'))
    console.log(req.pathname, req.params);
    var action = req.method;
    req.on('data', function(data){
      req.body = JSON.parse(data);
    })
    res.send = methods.getMethods.send;
    router.route(req.pathname, action, req, res);
  }
  http.createServer(onRequest).listen(port, function() {
    console.log('server running on port:' + port);
  });
};
