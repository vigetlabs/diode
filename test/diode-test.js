var Diode  = require('../src/diode')
var assert = require('assert')

describe('Diode', function() {

  function isDiode(object) {
    for (var key in new Diode()) {
      assert(key in object)
    }
  }

  it ('is an event emitter itself', function() {
    isDiode(Diode)
  })

  it ('is a decorator function', function() {
    var emitter = Diode({ prop: 'yes' })

    isDiode(emitter)

    assert.equal(emitter.prop, 'yes')
  })

  it ('defaults to instantiation', function() {
    var emitter = Diode()
    isDiode(emitter)
    assert(emitter instanceof Diode)
  })

  it ('can ignore callbacks', function() {
    var emitter = new Diode()

    var stub = function() {
      throw Error('Should not have been called')
    }

    emitter.listen(stub)
    emitter.ignore(stub)

    emitter.emit()
  })

  it ('can subscribe callbacks', function(done) {
    Diode.listen(done)
    Diode.emit()
  })

  it ('can decorate other objects', function() {
    var target = Diode({ prop: 'test' })

    isDiode(target)
    assert('prop' in target)
  })

  it ('passes arguments to children', function(done) {
    var target = Diode()

    target.listen(function(name) {
      assert.equal(name, 'Greg')
      done()
    })

    target.emit('Greg')
  })

  describe('chaining api', function() {

    it ('returns to the target context', function() {
      var target = Diode({})
      var mock   = function () {}

      assert.equal(target.listen(mock), target)
      assert.equal(target.ignore(mock), target)
      assert.equal(target.emit(), target)
    })
  })

  describe('instantiation', function() {
    it ('can be called with the new operator', function() {
      var target = new Diode()

      assert('listen' in target)
      assert.notEqual(target, Diode)
    })
  })

  describe('scope', function() {
    it ('if not specified, it calls within the scope of the instance', function(done) {
      var target = new Diode()

      target.listen(function() {
        assert.equal(this, target)
        done()
      })

      target.emit()
    })

    it ('listeners can be called within an optional different scope', function(done) {
      var target = new Diode()

      target.listen(function() {
        assert.equal(this, 'test')
        done()
      }, 'test')

      target.emit()
    })
  })

  describe('aliases', function() {
    it ('aliases `listen` to `subscribe` callbacks', function() {
      assert.equal(Diode.subscribe, Diode.listen)
    })

    it ('aliases `ignore` to `unsubscribe` callbacks', function() {
      assert.equal(Diode.unsubscribe, Diode.ignore)
    })

    it ('aliases `emit` to `publish` callbacks', function() {
      assert.equal(Diode.publish, Diode.emit)
    })
  })
})
