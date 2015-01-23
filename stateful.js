var Diode     = require('../diode');
var invariant = require('react/lib/invariant');

var Stateful = {

  getInitialState: function() {
    invariant(this.getState, "Stateful mixin requires `getState` implementation.");
    return this.getState();
  },

  _updateState: function() {
    this.setState(this.getState());
  },

  componentDidMount: function() {
    Diode.subscribe(this._updateState);
  },

  componentWillUnmount: function() {
    Diode.unsubscribe(this._updateState);
  },

  componentWillReceiveProps: function() {
    this._updateState();
  }

};

module.exports = Stateful
