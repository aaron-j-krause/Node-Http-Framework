var expect = require('chai').expect;
var methods = require('../lib/action-methods');

describe('Action-methods', function() {
  var get = {};
  var post = {};
  var put = {};
  var patch = {};
  var del = {};
  before(function() {
    methods.setMethods('GET', get);
    methods.setMethods('POST', post);
    methods.setMethods('PUT', put);
    methods.setMethods('PATCH', patch);
    methods.setMethods('DELETE', del);
  });
  it('POST should get save method', function() {
    expect(post).to.haveOwnProperty('save');
    expect(post.save).to.be.a('function');
  });
  it('PUT should get save method', function() {
    expect(put).to.haveOwnProperty('save');
    expect(post.save).to.be.a('function');
  });
  it('PATCH should get save method', function() {
    expect(put).to.haveOwnProperty('save');
    expect(post.save).to.be.a('function');
  });
  it('DELETE should get remove method', function() {
    expect(del).to.haveOwnProperty('remove');
    expect(del.remove).to.be.a('function');
  });
  it('All actions should get methods from all object', function() {
    expect(get).to.haveOwnProperty('send');
    expect(get.send).to.be.a('function');
    expect(post).to.haveOwnProperty('send');
    expect(post.send).to.be.a('function');
    expect(put).to.haveOwnProperty('send');
    expect(put.send).to.be.a('function');
    expect(patch).to.haveOwnProperty('send');
    expect(patch.send).to.be.a('function');
    expect(del).to.haveOwnProperty('send');
    expect(del.send).to.be.a('function');
  });
});
