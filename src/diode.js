/**
 * Event subscription for Microcosm
 */

var Diode = function (app) {
  var callbacks = []

  if (this instanceof Diode) {
    app = this
  } else if (arguments.length == 0){
    return new Diode()
  }

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
  app.ignore = app.unsubscribe = function (unwanted) {
    callbacks = callbacks.filter(function(entry) {
      return entry.callback !== unwanted
    })

    return app
  }

  /**
   * Immediately trigger every callback
   */
  app.emit = app.publish = function () {
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i].callback.apply(callbacks[i].scope, arguments)
    }

    return app
  }

  return app
}

module.exports = Diode(Diode)
