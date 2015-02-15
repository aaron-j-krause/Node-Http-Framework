exports = module.exports = {}

exports.getMethods = {
  send: function(info){
    var contentType = 'text/plain'
    console.log(contentType);
    this.writeHead(200, {'Content-Type': contentType})
    this.end(info);
  }


}