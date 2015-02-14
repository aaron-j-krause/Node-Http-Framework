var http = require('http');
var url = require('url');
var router = require('./router.js');

exports.start = function(port){
  function onRequest(req, res){
    var path = url.parse(req.url).pathname;
    var action = req.method;
    router.route(path, action, req, res);
  }
  http.createServer(onRequest).listen(port, function(){
    console.log('server running on port:' + port);
  })
};
