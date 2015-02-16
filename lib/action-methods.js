exports = module.exports = {};

var fs = require('fs');
var methods = {};
exports.setMethods = function(action, res) {
  for (var i in methods.all) {
    res[i] = methods.all[i];
  }
  for (var j in methods[action]) {
    res[j] = methods[action][j];
  }
};

function writeStuff(filePath, body, context) {
  fs.writeFile(filePath, body, (function(err) {
    if (err) throw err;
    this.writeHead(200, {'Content-Type': 'application/json'});
    this.end(body);
  }).bind(context));
}

methods.all = {
  setStatus: function(status) {
    this.status = status;
  },
  setContent: function(type) {
    this.contentType = type;
  }
};
methods.GET = {
  send: function(info) {
    info = typeof info == 'object' ?
          info = fs.readdirSync(info.fileDestination).join(', ') :
          info || 'request received';

    var contentType = this.contentType || 'text/plain';
    var status = this.status || 200;
    this.writeHead(status, {'Content-Type': contentType});
    this.end(info);
  }
};
methods.POST = {
  save: function(req) {
    req.on('end', (function() {
      if (req.params) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: Use PUT to write to file');
      } else {
        var filePath = req.fileDestination + (req.fileCount + 1) + '.json';
        var body = JSON.stringify(req.body);
        writeStuff(filePath, body, this);
      }
    }).bind(this));
  }
};

methods.PUT = {
  save: function(req) {
    req.on('end', (function() {
      if (req.db.indexOf(req.params + '.json') === -1) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        var filePath = req.fileDestination + req.params + '.json';
        var body = JSON.stringify(req.body);
        writeStuff(filePath, body, this);
      }
    }).bind(this));
  }
};

methods.PATCH = {
  save: function(req) {
    req.on('end', (function() {
      if (req.db.indexOf(req.params + '.json') === -1) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        var filePath = req.fileDestination + req.params + '.json';
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
      if (req.db.indexOf(req.params + '.json') === -1) {
        this.writeHead(404, {'Content-Type': 'text/plain'});
        this.end('ERROR: File not found');
      } else {
        fs.unlinkSync(req.fileDestination + req.params + '.json');
        this.writeHead(status, {'Content-Type': contentType});
        this.end(req.params + '.json deleted successfully');
      }
    }).bind(this));
  }
};
