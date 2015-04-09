var Diode = require('../diode')

describe('Diode', function() {

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

    for (var i = 1000; i > 0; i--) {
      Diode.volley()
    }

    requestAnimationFrame(() => {
      stub.should.have.been.calledOnce
      done()
    })
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

    for (var i in Diode) {
      if (i !== 'decorate') {
        target.should.have.property(i)
      }
    }

    target.should.have.property('prop', 'test')
  })

  it ('passes arguments to children', function(done) {
    let target = Diode.decorate({ prop: 'test' })

    target.listen(function(name) {
      name.should.equal('Greg')
      done()
    })

    target.emit('Greg')
  })

})
