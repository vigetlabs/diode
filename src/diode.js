/**
 * The Diode emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

function Diode(target) {
  var _callbacks = []
  var _tick      = target

  target = target || {}

  /**
   * Callbacks are eventually executed, Diode does not promise
   * immediate consistency so that state propagation can be batched
   */
  var _flush = function() {
    /**
     * Important: do not cache the length of _callbacks
     * in the event a callback causes later subscriptions
     * to disappear
     */
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i].apply(target, arguments)
    }
  }

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  target.listen = function(callback) {
    _callbacks = _callbacks.concat(callback)
  }

  /**
   * Given a CALLBACK function, remove it from the set of callbacks.
   * Throws an error if the callback is not included in the Set.
   */
  target.ignore = function(callback) {
    _callbacks = _callbacks.filter(function(i) {
      return i !== callback
    })
  }

  /**
   * Immediately trigger every callback
   */
  target.emit = function() {
    _flush.apply(target, arguments)
  }

  /**
   * Lazy trigger Trigger every callback
   */
  target.volley = function() {
    var args = arguments

    if (_callbacks.length > 0) {
      cancelAnimationFrame(_tick)
      _tick = requestAnimationFrame(function() {
        _flush.apply(target, args)
      })
    }
  }

  return target
}

module.exports = Diode()
module.exports.decorate = Diode
