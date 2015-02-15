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
  res.send('waow');
});

router.post('/', function(req, res) {
  req.on('end', function(){
    var filePath = './data/test.json';
    var info = JSON.stringify(req.body);
    fs.writeFile('./data/test.json', info, function(err){
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(info);
    })
  })
})
router.put('/data/test', function(req, res) {
})
server.start(3000);
