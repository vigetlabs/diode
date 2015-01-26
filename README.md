# Diode

A simple state propagation tool for React. It takes advantage of
[components that are pure](http://facebook.github.io/react/docs/pure-render-mixin.html)
to significantly simplify event subscription when propagating changes
in the data layer.

Diode has no dependencies.

**Diode is an event emitter with one event**. By including the `Stateful`
mixin, an expected `getState` method is called every time the Diode
publishes a change.

It is also quite small (see [API](#api)). We found ourselves building
something similar to it on several projects and decided it was better
to keep it in one place.

---

[![Build Status](https://travis-ci.org/vigetlabs/diode.png?branch=master)](https://travis-ci.org/vigetlabs/diode)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/diode/badge.svg)](https://coveralls.io/r/vigetlabs/diode)

---

## Usage

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
  Diode.publish()
}
```

And that's it!

## API

### Diode

- `unsubscribe`: Remove a callback. If only using the `Stateful` mixin
  this probably never needs to be called
- `subscribe`: Add a callback. If only using the `Stateful` mixin
  this probably never needs to be called
- `publish`: Propagate a change. Call this whenever a data store of
  some kind changes (leaning on smart `shouldComponentUpdate` methods
  within your React component tree)

### Stateful

- `getState`: This method is called by `Stateful` whenever the `Diode`
  executes `publish` to update the state of a component. **It is required.**
