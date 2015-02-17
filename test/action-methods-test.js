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
    expect(get).to.haveOwnProperty('setStatus');
    expect(get.setStatus).to.be.a('function');
    expect(post).to.haveOwnProperty('setStatus');
    expect(post.setStatus).to.be.a('function');
    expect(put).to.haveOwnProperty('setStatus');
    expect(put.setStatus).to.be.a('function');
    expect(patch).to.haveOwnProperty('setStatus');
    expect(patch.setStatus).to.be.a('function');
    expect(del).to.haveOwnProperty('setStatus');
    expect(del.setStatus).to.be.a('function');
  });

});
