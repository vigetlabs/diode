# Changelog

## 6.0.0

- Removed decorate (just use `Diode(entity)`)
- Removed `<Stateful />` this mixin required the use of Diode as a
  global which caused a lot of issues.
- Made some internal changes for file savings

## 5.0.0

- Remove volley all together. It is great at first but then produces
  difficult hard to reason about event subscription.

## 4.4.0

- When executed continuously, at 120 frames per second, `volley` will
  allow a change event to slip through every frame. This should better
  support streaming change events for animation.

```
Compressed : 592 bytes
Gzipped    : 348 bytes
```

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
