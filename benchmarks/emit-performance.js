var Time  = require('microtime')
var Diode = require('../src/diode')
var SIZE  = 10000

console.log("Profiling %s event handlers:\n", SIZE)

global.gc()

var subject = Diode()
var fn      = n => n

var memoryBefore = process.memoryUsage().heapUsed
for (var i = 0; i < SIZE; i++) {
  subject.subscribe(fn)
}
var memoryUsage = (process.memoryUsage().heapUsed - memoryBefore) / 1000

console.log("Memory    : ~%skb", memoryUsage.toFixed(0))

// Warmup
for (var q = 0; q < 10; q++) {
  subject.publish(true)
}

var then = Time.now()
subject.publish(true)
var cost = (Time.now() - then) / 1000
console.log("Execution : %s", cost)
console.log("")
