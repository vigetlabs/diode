# Diode

A simple state propagation tool for React. It works very well when
[components are pure](http://facebook.github.io/react/docs/pure-render-mixin.html).

Diode is an event emitter with one event. By including the Diode
mixin, an expected `getState` method is called every time the Diode
publishes a change.

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
