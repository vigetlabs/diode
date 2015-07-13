/**
 * The Diode emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

function Diode (target) {
  var _callbacks = []

  if (this instanceof Diode) {
    target = this
  } else {
    target = target || {}
  }

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  target.listen = target.subscribe = function (callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function')
    }

    _callbacks.push(callback)

    return target
  }

  /**
   * Given a CALLBACK function, remove it from the set of callbacks.
   * Throws an error if the callback is not included in the set.
   */
  target.ignore = target.unsubscribe = function (callback) {
    for (var i = 0, len = _callbacks.length; i < len; i++) {
      if (_callbacks[i] === callback) {
        _callbacks.splice(i, 1)
      }
    }

    return target
  }

  /**
   * Immediately trigger every callback
   */
  target.emit = target.publish = function (...args) {
    /**
     * Important: do not cache the length of _callbacks
     * in the event a callback causes later subscriptions
     * to disappear
     */
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i].apply(target, args)
    }

    return target
  }

  return target
}

module.exports = Diode(Diode)
module.exports.decorate = Diode
