/**
 * The Diode emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

var invariant  = require('./invariant')
var _callbacks = []
var _tick      = null;

/**
 * Callbacks are eventually executed, Diode does not promise
 * immediate consistency so that state propagation can be batched
 */
var _flush = function() {
  for (var i = 0, length = _callbacks.length; i < length; i++) {
    _callbacks[i]()
  }
}

var Diode = {

  /**
   * Given a CALLBACK function, remove it from the Set of callbacks.
   * Throws an error if the callback is not included in the Set.
   */
  unsubscribe: function(callback) {
    invariant(_callbacks.indexOf(callback) > -1, 'Diode.unsubscribe() was asked to remove callback that it was not subscribed to.');

    _callbacks = _callbacks.filter(function(i) {
      return i !== callback
    });
  },

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  subscribe: function(callback) {
    var type = typeof callback;
    invariant(type === 'function', 'Diode.subscribe() expects a function, instead it received a ' + type);

    _callbacks = _callbacks.concat(callback);
  },

  /**
   * Trigger every callback in the Set
   */
  publish: function() {
    if (_callbacks.length) {
      cancelAnimationFrame(_tick)
      _tick = requestAnimationFrame(_flush)
    }
  }

}

module.exports = Diode
