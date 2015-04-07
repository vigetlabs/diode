var Diode    = require('../diode')
var React    = require('react/addons')
var Stateful = require('../stateful')
var Test     = React.addons.TestUtils

describe('Stateful', function() {
  var getComponent = function() {
    return React.createClass({
      mixins: [ Stateful ],
      getState() { return { state: 'new' } },
      render() { return (<p>{ 'Hello' }</p>) }
    })
  }

  it ('listens to the diode when the component mounts', function() {
    var Component = getComponent()
    var spy       = sinon.spy(Diode, 'listen')

    Test.renderIntoDocument(<Component />)

    spy.should.have.been.called

    spy.restore()
  })

  it ('ignores the diode when the component mounts', function() {
    var Component = React.createClass({
      render() {
        return React.createElement(getComponent())
      }
    })

    sinon.spy(Diode, 'ignore')

    React.render(<Component />, document.body)
    React.render(<Component />, document.body)

    Diode.ignore.should.have.been.called

    Diode.ignore.restore()
  })

  it ('calls getState to update the state of the component', function() {
    var Component = getComponent()
    var component = Test.renderIntoDocument(<Component />)

    component.setState({ state: 'stale' })
    component._updateState();

    component.state.should.have.property('state', 'new')
  })

  it ('calls updateState when it recieves new properties', function() {
    var Component = getComponent()
    var component = Test.renderIntoDocument(<Component />)
    var spy       = sinon.spy(component, '_updateState')

    component.setProps({ foo: 'bar' })

    spy.should.have.been.called

    spy.restore()
  })

  it ('throws an error if it the component does not have getState', function(done) {
    var Component = React.createClass({
      mixins: [ Stateful ],
      render() { return (<p>{ 'Hello' }</p>) }
    })

    try {
      Test.renderIntoDocument(<Component />)
    } catch(x) {
      x.should.be.instanceOf(Error)
      done()
    }
  })

})
