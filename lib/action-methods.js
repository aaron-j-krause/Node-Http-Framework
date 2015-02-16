exports = module.exports = {};

var fs = require('fs');
var methods = {};
exports.setMethods = function(action, res) {
  for (var i in all) {
    res[i] = all[i];
  }
  for (var j in methods[action]) {
    res[j] = methods[action][j];
  }
};

var all = {
  send: function(info) {
    var contentType = this.contentType || 'text/plain';
    var status = this.status || 200;
    this.writeHead(status, {'Content-Type': contentType});
    this.end(info);
  },
  setStatus: function(status) {
    this.status = status;
  },
  setContent: function(type) {
    this.contentType = type;
  }
};

function writeStuff(filePath, body, context) {
  fs.writeFile(filePath, body, (function(err) {
    if (err) throw err;
    this.writeHead(200, {'Content-Type': 'application/json'});
    this.end(body);
  }).bind(context));
}

methods.POST = {
  save: function(req) {
    req.on('end', (function() {
      if (req.params) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: Use PUT to write to file');
      } else {
        var fileName = req.fileCount + 1;
        var filePath = req.fileDestination + fileName + '.json';
        var body = JSON.stringify(req.body);
        writeStuff(filePath, body, this);
      }
    }).bind(this));
  }
};

methods.PUT = {
  save: function(req) {
    console.log(req.db);
    req.on('end', (function() {
      if (req.db.every(function(el) {
          return el.indexOf(req.params + '.json') == -1;
        })
      ) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        var fileName = req.params;
        var filePath = req.fileDestination + fileName + '.json';
        var body = JSON.stringify(req.body);
        writeStuff(filePath, body, this);
      }
    }).bind(this));
  }
};

methods.PATCH = {
  save: function(req) {
    req.on('end', (function() {
      if (req.db.every(function(el) {
          return el.indexOf(req.params + '.json') == -1;
        })
      ) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        var fileName = req.params;
        var filePath = req.fileDestination + fileName + '.json';
        var oldFile = JSON.parse(fs.readFileSync(filePath));
        for (var i in req.body) {
          oldFile[i] = req.body[i];
        }
        var body = JSON.stringify(oldFile);
        writeStuff(filePath, body, this);
      }
    }).bind(this));
  }
};

methods.DELETE = {
  remove: function(req) {
    var contentType = this.contentType || 'text/plain';
    var status = this.status || 200;
    req.on('end', (function() {
      fs.unlinkSync(req.fileDestination + req.params + '.json');
      this.writeHead(status, {'Content-Type': contentType});
      this.end(req.params + '.json deleted successfully');
    }).bind(this));
  }
};
