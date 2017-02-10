/**
 * Event subscription for Microcosm
 */

function Diode (app) {

  if (this instanceof Diode) {
    app = this
  } else if (arguments.length == 0){
    return new Diode()
  }

  var callbacks = []

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  app.listen = app.subscribe = function (callback, scope) {
    callbacks.push({ callback: callback, scope: scope || app })
    return app
  }

  /**
   * Given a CALLBACK function, remove it from the set of callbacks.
   * Throws an error if the callback is not included in the set.
   */
  app.ignore = app.unsubscribe = function (callback, scope) {
    var hasScope = arguments.length > 1

    var i = 0
    while (i < callbacks.length) {
      var cb = callbacks[i]

      if (cb.callback === callback && (!hasScope || cb.scope === scope)) {
        callbacks.splice(i, 1)
        continue
      }

      i += 1
    }

    return app
  }

  /**
   * Immediately trigger every callback
   */
  app.emit = app.publish = function () {
    for (var i = 0; i < callbacks.length; i++) {
      if (callbacks[i]) {
        callbacks[i].callback.apply(callbacks[i].scope, arguments)
      }
    }

    return app
  }

  return app
}

module.exports = Diode(Diode)
