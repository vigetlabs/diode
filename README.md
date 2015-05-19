[![NPM](https://nodei.co/npm/diode.png?compact=true)](https://npmjs.org/package/diode)

---

[![Build Status](https://travis-ci.org/vigetlabs/diode.png?branch=master)](https://travis-ci.org/vigetlabs/diode)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/diode/badge.svg)](https://coveralls.io/r/vigetlabs/diode)

---

A simple event emitter with tools for eventual consistency. Diode only
has one event.

```javascript
Diode.listen(callback)
Diode.emit()
```

**Diode can batch event subscriptions using `volley`**. In
short, this means that sequential publications will be clumped:

```javascript
Diode.listen(callback)

for (var i = 1000; i > 0; i--) {
  Diode.volley()
}

// callback will only fire once
```

This means that state changes which would activate multiple times,
such as an action which affects multiple data stores, will trigger
once. This should improve efficiency and simplify actions such as
merging records.

It is also quite small (see [API](#api)). We found ourselves building
something similar to it on several projects and decided it was better
to keep it in one place.

## Usage

For React projects, Diode includes a `Stateful` mixin, it expects a
`getState` method that is called every time Diode publishes a
change.

First include the `Stateful` mixin into a component, and provide a
`getState` method:

```javascript
var React    = require('react/addons');
var Stateful = require('diode/stateful');
var MyStore  = require('./myStore');
var Pure     = React.addons.PureRenderMixin;

var Component = React.createClass({
  mixins: [ Stateful, Pure ],

  getState: function() {
    return {
      items: MyStore.all()
    }
  },

  render: function() {
    // render something purely
  }
})
```

Then in your stores, execute 'publish' on the Diode when you want to
propagate a change:

```javascript
var Diode = require('diode')
var _data = []

MyStore.add = function(record) {
  _data = _data.concat(record)
  Diode.volley()
}
```

And that's it!

## Diode as a decorator

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

## API

### Diode

- `listen,subscribe`: Remove a callback. If only using the `Stateful` mixin
  this probably never needs to be called
- `ignore,unsubscribe`: Add a callback. If only using the `Stateful` mixin
  this probably never needs to be called
- `emit,publish`: Propagate a change. Call this whenever a data store of
  some kind changes (leaning on smart `shouldComponentUpdate` methods
  within your React component tree)
- `volley`: Propagate a change lazily.

### Stateful

- `getState`: This method is called by `Stateful` whenever the `Diode`
  executes `emit` or `volley` to update the state of a component. **It
  is required.**
