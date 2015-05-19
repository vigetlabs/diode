# Changelog

## 4.3.0

- Added `subscribe` alias for `listen`
- Added `unsubscribe` alias for `ignore`
- Added `publish` alias for `emit`
- Diode can be called with the `new` Operator
- Diode can decorate objects as a function itself (in addition to decorate)

```
Compressed : 724 bytes
Gzipped    : 389 bytes
```

## 4.2.0

All Diode methods now return the target. For example, if decorating an existing object:

```javascript
Diode.decorate(object)

object.listen(callback)
      .listen(anotherCallback)
```

## 4.1.0

- `emit` now forwards all arguments to listeners

## 4.0.0

- `Subscribe` and `unsubscribe` are now `listen` and `ignore` to
  match some of our other open source projects.
- Added `decorate` method to add Diode's behavior to existing objects
