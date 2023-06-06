const assert = require('assert');
const { mix } = require('../dist/index.js');

class A {a(){ return 'a' }}
class B extends A {b(){ return 'b' }}
class C extends B {c(){ return 'c' }}
class D extends C {d(){ return 'd' }}
class Stuff {}

describe('Mixer', function () {
  describe('mix()', function () {
    it('should mix every class and super class', function () {
      mix(Stuff, D);
      assert.equal(new Stuff().a(), 'a');
      assert.equal(new Stuff().b(), 'b');
      assert.equal(new Stuff().c(), 'c');
      assert.equal(new Stuff().d(), 'd');
      console.log(Object.getOwnPropertyNames(Stuff.prototype));
    });
  });
});
