var http = require('http');

exports.start = function(port){
  http.createServer(function(request, response){


  }).listen(port, function(){
    console.log('server running on port:' + port)
  })
};
