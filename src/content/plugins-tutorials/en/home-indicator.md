---
locale: en
---
# @capgo/home-indicator

The `@capgo/home-indicator` package allows you to hide and show the home button indicator in your Capacitor app.

## Installation

To install the package, run the following command in your terminal:

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

The package provides the following methods:

### `hide()`

```typescript
hide() => Promise
```

Hide the home indicator.

**Since:** 0.0.1

### `show()`

```typescript
show() => Promise
```

Show the home indicator.

**Since:** 0.0.1

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

Get the home indicator status.

**Returns:** Promise<{ hidden: boolean; }>

**Since:** 0.0.1

## CSS Variables

You can use `--safe-area-inset-bottom` to make sure your content is not hidden by the home indicator. This variable is injected by the plugin for Android. It's useful if you set real fullscreen mode on Android.

Example usage:

```java
getWindow().setDecorFitsSystemWindows(false);
```

## Credits

This plugin was created originally for [Kick.com](https://kick.com/) by [Capgo](https://capgo.app/)

For more information and updates, check out [Capgo](https://capgo.app/).
