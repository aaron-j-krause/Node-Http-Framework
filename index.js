var server = require('./lib/server.js');
var router = require('./lib/router.js');

router.get('/', function(req, res){
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('MADE IT FUCKER');
})
router.get('/holyshit', function(req, res){
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('HOLY SHHIIIIIIT');
})
server.start(3000);