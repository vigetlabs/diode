var Diode = require('../diode')

describe('Diode', function() {

  function isDiode(object) {
    let truth = new Diode()

    for (let key in truth) {
      object.should.have.property(key)
    }
  }

  it ('is an event emitter itself', function() {
    isDiode(Diode)
  })

  it ('is a decorator function', function() {
    let emitter = Diode({ prop: 'yes' })

    isDiode(emitter)

    emitter.should.have.property('prop', 'yes')
  })

  it ('defaults to an empty object when decorating', function() {
    isDiode(Diode())
  })

  it ('does not flush if there are no callbacks', function() {
    let spy = sinon.spy(window, 'requestAnimationFrame')

    Diode.emit()

    spy.should.not.have.been.called

    spy.restore()
  })

  it ('can subscribe callbacks', function(done) {
    Diode.listen(done)
    Diode.emit()
  })

  it ('batches subscriptions on volley', function(done) {
    let stub = sinon.stub()

    Diode.listen(stub)

    for (var i = 0; i <= 100; i++) {
      Diode.volley(i)
    }

    setTimeout(function() {
      stub.should.have.been.calledOnce
      stub.should.have.been.calledWith(100)
      done()
    }, 50)
  })

  it ('allows high-frequency subscriptions to pass through cancellation', function(done) {
    let stub = sinon.stub()
    let time = Date.now()

    Diode.listen(stub)

    while (Date.now() - time < Diode.FRAMES * 2) {
      Diode.volley()
    }

    setTimeout(function() {
      stub.should.have.been.calledTwice
      done()
    }, 50)
  })

  it ('does not volley if no callbacks exist', function() {
    let emitter = Diode.decorate({})
    let spy = sinon.spy(window, 'requestAnimationFrame')

    emitter.volley()

    spy.should.not.have.been.called
    spy.restore()
  })

  it ('can ignore callbacks', function(done) {
    let stub = sinon.stub()

    Diode.listen(stub)
    Diode.ignore(stub)
    Diode.volley()

    requestAnimationFrame(() => {
      stub.should.not.have.been.called
      done()
    })
  })

  it ('can decorate other objects', function() {
    let target = Diode.decorate({ prop: 'test' })

    target.should.have.property('publish')
    target.should.have.property('subscribe')
    target.should.have.property('prop', 'test')
  })

  it ('passes arguments to children', function(done) {
    let target = Diode.decorate({})

    target.listen(function(name) {
      name.should.equal('Greg')
      done()
    })

    target.emit('Greg')
  })

  describe('chaining api', function() {

    it ('returns to the target context', function() {
      let target = Diode.decorate({})
      let mock   = sinon.mock()

      target.listen(mock).should.equal(target)
      target.ignore(mock).should.equal(target)
      target.emit().should.equal(target)
      target.volley().should.equal(target)
    })
  })

  describe('instantiation', function() {
    it ('can be called with the new operator', function() {
      let target = new Diode()

      target.should.have.property('listen')
    })
  })

  describe('aliases', function() {
    it ('aliases `listen` to `subscribe` callbacks', function() {
      Diode.should.have.property('subscribe', Diode.listen)
    })

    it ('aliases `ignore` to `unsubscribe` callbacks', function() {
      Diode.should.have.property('unsubscribe', Diode.ignore)
    })

    it ('aliases `emit` to `publish` callbacks', function() {
      Diode.should.have.property('publish', Diode.emit)
    })
  })
})
