/**
 * The Diode emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

/**
 * Important: 120 FPS is granular enough to get around differences
 * in the animation and time clock
 */
var FRAMES = 1000 / 120

function Diode(target) {
  var _callbacks = []
  var _tick      = target
  var _lastFire  = null

  if (this instanceof Diode) {
    target = this
  } else {
    target = target || {}
  }

  /**
   * Callbacks are eventually executed, Diode does not promise
   * immediate consistency so that state propagation can be batched
   */
  var _flush = function(args) {
    /**
     * Important: do not cache the length of _callbacks
     * in the event a callback causes later subscriptions
     * to disappear
     */
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i].apply(target, args)
    }
  }

  var _cancel = function() {
    var now = +new Date() // IE8 love

    if (_lastFire && now - _lastFire < 10) {
      cancelAnimationFrame(_tick)
    } else {
      _lastFire = now
    }

  }

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  target.listen = target.subscribe = function(callback) {
    _callbacks = _callbacks.concat(callback)

    return target
  }

  /**
   * Given a CALLBACK function, remove it from the set of callbacks.
   * Throws an error if the callback is not included in the Set.
   */
  target.ignore = target.unsubscribe = function(callback) {
    _callbacks = _callbacks.filter(function(i) {
      return i !== callback
    })

    return target
  }

  /**
   * Immediately trigger every callback
   */
  target.emit = target.publish = function() {
    _flush(arguments)
    return target
  }

  /**
   * Lazy trigger Trigger every callback
   */
  target.volley = function() {
    if (_callbacks.length > 0) {
      _cancel()
      _tick = requestAnimationFrame(_flush.bind(undefined, arguments))
    }

    return target
  }

  return target
}

module.exports          = Diode(Diode)
module.exports.decorate = Diode
module.exports.FRAMES   = FRAMES
