describe('Diode', function() {
  var Diode = require('diode')

  it ('can subscribe callbacks', function() {
    let stub = sinon.stub()

    Diode.subscribe(stub);
    Diode.publish();

    stub.should.have.been.called
  })

  it ('can unsubscribed callbacks', function() {
    let stub = sinon.stub()

    Diode.subscribe(stub);
    Diode.unsubscribe(stub);
    Diode.publish();

    stub.should.not.have.been.called
  });

});
