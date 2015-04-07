var Diode = require('./diode')

var Stateful = {

  getInitialState: function() {
    if (!this.getState) {
      throw new Error("Stateful mixin requires `getState` implementation.")
    }

    return this.getState()
  },

  _updateState: function() {
    this.setState(this.getState())
  },

  componentDidMount: function() {
    Diode.listen(this._updateState)
  },

  componentWillUnmount: function() {
    Diode.ignore(this._updateState)
  },

  componentWillReceiveProps: function() {
    this._updateState()
  }

}

module.exports = Stateful
