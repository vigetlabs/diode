describe('invariant', function() {
  let invariant = require('../invariant')

  it ('throws an error if a condition is false', function(done) {
    try {
      invariant(false, 'message')
    } catch(x) {
      x.should.be.instanceof(Error)
      done()
    }
  })

  it ('does not throw an error if the condition is true', function() {
    invariant(true, 'message')
  })

})
