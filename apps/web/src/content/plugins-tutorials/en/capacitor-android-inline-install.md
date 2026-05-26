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

## What This Plugin Exposes

- `startInlineInstall` - Start an inline install flow using the Google Play overlay.

## Example Usage

### `startInlineInstall`

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

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-android-inline-install/
- Docs: /docs/plugins/android-inline-install/

## Keep going from Using @capgo/capacitor-android-inline-install

If you are using **Using @capgo/capacitor-android-inline-install** to plan store approval and distribution, connect it with [@capgo/capacitor-android-inline-install](/docs/plugins/android-inline-install/) for the implementation detail in @capgo/capacitor-android-inline-install, [Getting Started](/docs/plugins/android-inline-install/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Using @capgo/capacitor-in-app-review](/plugins/capacitor-in-app-review/) for the native capability in Using @capgo/capacitor-in-app-review, and [@capgo/native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/native-market.
