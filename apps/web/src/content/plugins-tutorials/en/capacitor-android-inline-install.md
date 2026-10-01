---
locale: en
---
# Using @capgo/capacitor-android-inline-install

Android Inline Install Plugin for triggering Google Play in-app install flows.

## Install

```bash
bun add @capgo/capacitor-android-inline-install
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { AndroidInlineInstall } from '@capgo/capacitor-android-inline-install';
```

## API at a glance

| Method | Description |
| --- | --- |
| `startInlineInstall` | Start an inline install flow using the Google Play overlay. |

## Examples

### `startInlineInstall()`

Start an inline install flow using the Google Play overlay.

```typescript
import { AndroidInlineInstall } from '@capgo/capacitor-android-inline-install';

const result = await AndroidInlineInstall.startInlineInstall({
  id: 'com.example.app',
  referrer: 'my-referrer',
  overlay: true,
  fallback: true
});

if (result.started) {
  console.log('Install flow started');
  if (result.fallbackUsed) {
    console.log('Using fallback Play Store link');
  }
}
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-android-inline-install/)
- [Documentation](/docs/plugins/android-inline-install/)
- [API reference](/docs/plugins/android-inline-install/getting-started/)

## Keep going from Using @capgo/capacitor-android-inline-install

If you are using **Using @capgo/capacitor-android-inline-install** to plan store approval and distribution, connect it with [@capgo/capacitor-android-inline-install](/docs/plugins/android-inline-install/) for the implementation detail in @capgo/capacitor-android-inline-install, [Getting Started](/docs/plugins/android-inline-install/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Using @capgo/capacitor-in-app-review](/plugins/capacitor-in-app-review/) for the native capability in Using @capgo/capacitor-in-app-review, and [@capgo/capacitor-native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/capacitor-native-market.
