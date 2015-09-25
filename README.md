[![NPM](https://nodei.co/npm/diode.png?compact=true)](https://npmjs.org/package/diode)

---

[![Build Status](https://travis-ci.org/vigetlabs/diode.png?branch=master)](https://travis-ci.org/vigetlabs/diode)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/diode/badge.svg)](https://coveralls.io/r/vigetlabs/diode)

---

A dead simple event emitter. **Diode only has one event.**

```javascript
Diode.listen(callback)
Diode.emit()
```

It is also small (see [API](#api)). We found ourselves building
something similar to it on several projects and decided it was better
to keep it in one place.

Diode is both an event emitter and a decorator that can add event
subscription to another object:

```javascript
var MyData = Diode({
  data: [],
  add: function(record) {
    this.data.push(record)
    this.publish()
  }
})
```

## New instances of Diode

Diode also supports the `new` operator:

```javascript
var myDiode = new Diode()
```

## Managing scope

By providing a second argument to `listen`, callbacks will be executed
within a given context:

```javascript
var emitter = new Diode()

emitter.listen(function() {
  assert.equal(this, 'custom context')
}, 'custom context')

emitter.emit()
```


## API

### `listen(callback, &scope)`

Add a callback. If a second argument is provided, the callback will be
executed within that context.

Alias: `subscribe`.

### `ignore(callback)`

Remove a callback.

Alias: `unsubscribe`.

### `emit(...arguments)`

Trigger all subscriptions.

Alias: 'publish'
