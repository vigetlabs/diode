var production = (typeof process === 'undefined') ? false : process.env.NODE_ENV === 'production'

module.exports = function(condition, message) {
  if (!production && !condition) {
    var error = new Error(message);

    error.framesToPop = 1 // we don't care about invariant's own frame

    throw error;
  }
}
