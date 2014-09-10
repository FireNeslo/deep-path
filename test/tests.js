var DeepPath = require('..');
var expect = require('chai').expect;
var string = 'array[0].deep.item';
var value;
var path;

function throwsError(path) {
  try {
    DeepPath(path).get(value)
  } catch(e) {
    return true;
  }
  return false;
}

describe('DeepPath', function(){
  it('should work as a constructor', function() {
    expect(new DeepPath(string)).to.be.an.instanceof(DeepPath);
  })
  it('should work as a function', function() {
    expect(DeepPath(string)).to.be.an.instanceof(DeepPath);
  })
  beforeEach(function(){
    value = {
      "object": {},
      "fn" : function() {},
      "element" : {children:true, nodeName:true},
      "element-alternate" : {children:true, prop : true, attr: true, find : true},
      "global": global
    };
    path = DeepPath(string);
  });
  describe('#set(value)', function(){
    it('should set the deep value and return the new value', function() {
      expect(path.set(value, true)).to.equal(true);
      expect(value.array).to.be.an.instanceof(Array);
      expect(value.array[0]).to.be.ok;
      expect(value.array[0].deep).to.be.ok;
      expect(value.array[0].deep.item).to.equal(true);
    })
  })
  describe('#get(value)', function(){
    it('should get the deep value', function() {
      path.set(value, true)
      expect(path.get(value)).to.equal(true);
    })
    it('should return undefined on non existing value', function() {
      expect(path.get(value)).to.equal(undefined);
    })
    it('should prevent unsafe access', function() {
      expect(throwsError('element')).to.equal(true);
      expect(throwsError('element-alternate')).to.equal(true);
      expect(throwsError('fn.constructor')).to.equal(true);
      expect(throwsError('global')).to.equal(true);
      expect(throwsError('object.constructor')).to.equal(true);
    })
  })
});