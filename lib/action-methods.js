exports = module.exports = {}

var fs = require('fs');
var dataDir = fs.readdirSync('./data');
var count = dataDir.length;
var methods = {};
exports.setMethods = function(action, res){
  for(var i in all){
    console.log(i);
    res[i] = all[i];
  }
  for(var j in methods[action]){
    res[j] = methods[action][j];
  }
}

var all = {
  send: function(info){
    var contentType = this.contentType || 'text/plain';
    var status = this.status || 200;
    this.writeHead(status, {'Content-Type': contentType})
    this.end(info);
  },
  setStatus: function(status){
    this.status = status;
  },
  setContent: function(type){
    this.contentType = type;
  }
}

methods.POST = {
  save: function(req){
    req.on('end', (function(){
      if(req.params){
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: Use PUT to write to file');
      } else {
        var fileName = req.fileCount + 1;
        var filePath = './data/' + fileName + '.json';
        var body = JSON.stringify(req.body);
        fs.writeFile(filePath, body, (function(err){
          if (err) throw err;
          this.writeHead(200, {'Content-Type': 'application/json'});
          this.end(body);
        }).bind(this))
      }
    }).bind(this))
  }
}

methods.PUT = {
  save: function(req){
    console.log(req.db)
    req.on('end', (function(){
      if(req.db.every(function(el){return el.indexOf(req.params + '.json') == -1})){
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        var fileName = req.params;
        var filePath = './data/' + fileName + '.json';
        var body = JSON.stringify(req.body);
        fs.writeFile(filePath, body, (function(err){
          if (err) throw err;
          this.writeHead(200, {'Content-Type': 'application/json'});
          this.end(body)
        }).bind(this))
      }
    }).bind(this))
  }
}

methods.PATCH = {
  save: function(req){
    req.on('end', (function(){
      if(req.db.every(function(el){return el.indexOf(req.params + '.json') == -1})){
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        var fileName = req.params;
        var filePath = './data/' + fileName + '.json';
        var oldFile = JSON.parse(fs.readFileSync(filePath));
        for (var i in req.body) {
          oldFile[i] = req.body[i]
        }
        var body = JSON.stringify(oldFile);
        fs.writeFile(filePath, body, (function(err){
          if (err) throw err;
          this.writeHead(200, {'Content-Type': 'application/json'});
          this.end(body)
        }).bind(this));
      }
    }).bind(this));
  }
}
methods.DELETE = {
  remove: function(req){
    var contentType = this.contentType || 'text/plain';
    var status = this.status || 200;
    req.on('end', function(){
      fs.unlinkSync('./data/' + req.params + '.json')
      this.writeHead(status, {'Content-Type': contentType})
      this.end(req.params + '.json deleted successfully');
    })
  }
}
