describe('Diode', function() {
  var Diode = require('diode')

  it ('does not flush if there are no callbacks', function() {
    let spy = sinon.spy(window, 'requestAnimationFrame')

    Diode.publish();

    spy.should.not.have.been.called

    spy.restore();
  })

  it ('can subscribe callbacks', function(done) {
    Diode.subscribe(done);
    Diode.publish();
  })

  it ('batches subscriptions', function(done) {
    let stub = sinon.stub()

    Diode.subscribe(stub);

    for (var i = 1000; i > 0; i--) {
      Diode.publish()
    }

    requestAnimationFrame(() => {
      stub.should.have.been.calledOnce
      done()
    })
  })

  it ('can unsubscribed callbacks', function(done) {
    let stub = sinon.stub()

    Diode.subscribe(stub);
    Diode.unsubscribe(stub);
    Diode.publish();

    requestAnimationFrame(() => {
      stub.should.not.have.been.called
      done()
    })
  });

});
