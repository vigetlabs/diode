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
  app.listen = app.subscribe = function (callback) {
    callbacks.push(callback)
    return app
  }

  /**
   * Given a CALLBACK function, remove it from the set of callbacks.
   * Throws an error if the callback is not included in the set.
   */
  app.ignore = app.unsubscribe = function (unwanted) {
    callbacks = callbacks.filter(function(entry) {
      return entry !== unwanted
    })

    return app
  }

  /**
   * Immediately trigger every callback
   */
  app.emit = app.publish = function () {
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i].apply(app, arguments)
    }

    return app
  }

  return app
}

module.exports = Diode(Diode)
