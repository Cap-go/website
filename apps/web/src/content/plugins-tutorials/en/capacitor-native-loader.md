---
title: Using @capgo/capacitor-native-loader
description: Show native animated loaders, transparent overlays, Lottie assets, and WebView-resizing loading states in Capacitor apps.
---

# Using @capgo/capacitor-native-loader

`@capgo/capacitor-native-loader` renders loading states through native iOS and Android views. Use it when a loader needs to stay smooth while the WebView is busy, when transparent fullscreen effects are expensive in CSS, or when another native plugin needs to show loading UI before JavaScript is ready.

## Install

```bash
npm install @capgo/capacitor-native-loader
npx cap sync
```

## Fullscreen Native Loader

```ts
import { NativeLoader } from '@capgo/capacitor-native-loader';

const { id } = await NativeLoader.show({
  style: 'siri',
  placement: 'fullscreen',
  message: 'Preparing your session',
  backgroundColor: '#05081699',
  tintColor: '#7dd3fc',
  secondaryTintColor: '#a78bfa',
  interaction: 'block',
});

await initializeAppData();
await NativeLoader.hide({ id });
```

## Edge Loader With WebView Resize

```ts
await NativeLoader.setWebViewLayout({
  mode: 'inset',
  insets: { top: 96 },
  animated: true,
});

await NativeLoader.show({
  style: 'wave',
  placement: 'top',
  message: 'Syncing changes',
  interaction: 'passThrough',
});
```

When loading finishes, restore the WebView:

```ts
await NativeLoader.hideAll({ restoreWebView: true });
```

## Lottie Loader

```ts
await NativeLoader.show({
  style: 'lottie',
  placement: 'center',
  asset: {
    type: 'lottie',
    source: 'loader.json',
    bundle: true,
    loop: true,
  },
});
```

Bundled assets are best for startup loaders because they are available before network requests and JavaScript initialization.

## Native Plugin Calls

The plugin exposes public native APIs so another plugin can show or hide loaders directly.

Swift:

```swift
import CapgoCapacitorNativeLoader

let id = NativeLoader.shared.show([
  "style": "orbit",
  "placement": "fullscreen",
  "message": "Opening secure session"
])

NativeLoader.shared.hide(id: id)
```

Kotlin:

```kotlin
import app.capgo.nativeloader.NativeLoader

val id = NativeLoader.show(
  activity = activity,
  bridge = bridge,
  options = mapOf(
    "style" to "orbit",
    "placement" to "fullscreen",
    "message" to "Loading profile",
  ),
)

NativeLoader.hide(id)
```

## Useful Links

- GitHub: https://github.com/Cap-go/capacitor-native-loader/
- Docs: /docs/plugins/native-loader/

## Keep going from Using @capgo/capacitor-native-loader

If you are using **Using @capgo/capacitor-native-loader** to plan native media and interface behavior, connect it with [@capgo/capacitor-native-loader](/docs/plugins/native-loader/) for implementation details, [Getting Started](/docs/plugins/native-loader/getting-started/) for setup, [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for native chrome and WebView layout, and [Using @capgo/capacitor-transitions](/plugins/capacitor-transitions/) for WebView route motion.
