var http = require('http');
 
var routes = {};

exports.get = function(path, callback){
  if(!(routes[path])) routes[path] = {};
  routes[path]['GET'] = callback;
}
exports.post = function(path, callback){
  if(!(routes[path])) routes[path] = {};
  routes[path]['POST'] = callback;
}
exports.put = function(path, callback){
  if(!(routes[path])) routes[path] = {};
  routes[path]['PUT'] = callback;
}
exports.patch = function(path, callback){
  if(!(routes[path])) routes[path] = {};
  routes[path]['PATCH'] = callback;
}
exports.del = function(path, callback){
  if(!(routes[path])) routes[path] = {};
  routes[path]['DELETE'] = callback;
}

exports.route = function(path, action, req, res){
  routes[path][action](req, res);
}
