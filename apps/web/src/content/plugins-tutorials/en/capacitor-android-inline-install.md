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
