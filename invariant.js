module.exports = function(condition, message) {
  if ("production" !== process.env.NODE_ENV && !condition) {
    var error = new Error(message);

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}
