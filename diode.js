/**
 * The Diode emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

var _callbacks = []
var _tick      = null

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
    _callbacks = _callbacks.filter(function(i) {
      return i !== callback
    });
  },

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  subscribe: function(callback) {
    _callbacks = _callbacks.concat(callback)
  },

  /**
   * Trigger every callback in the Set
   */
  publish: function() {
    if (_callbacks.length > 0) {
      cancelAnimationFrame(_tick)
      _tick = requestAnimationFrame(_flush)
    }
  }

}

module.exports = Diode
