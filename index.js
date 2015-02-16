var server = require('./lib/server.js');
var router = require('./lib/router.js');
var fs = require('fs');

router.get('/', function(req, res) {
  req.on('end', function(){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('MADE IT FUCKER');
  })
});

router.get('/waow', function(req, res) {
  res.setStatus(201);
  res.setContent('text/plain');
  console.log(res.contentType, res.status);
  res.send('waow');
});

router.post('/users', function(req, res) {
  res.save(req);
})
router.put('/users', function(req, res) {
  res.save(req);
})

router.patch('/users', function(req, res) {
  res.save(req);
})
router.del('/users', function(req, res) {
  res.remove(req);
})
server.start(3000);
