---
locale: en
---

# Using @capgo/capacitor-webview-version-checker

The `@capgo/capacitor-webview-version-checker` package helps you detect outdated Android WebView versions in runtime, listen to status events, and optionally show a native prompt that redirects users to update.

## Installation

```bash
bun add @capgo/capacitor-webview-version-checker
bunx cap sync
```

## Basic config-only setup

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    WebviewVersionChecker: {
      autoCheckOnLoad: true,
      autoCheckOnResume: true,
      autoPromptOnOutdated: true,
    },
  },
};

export default config;
```

## Runtime usage

```ts
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

await WebviewVersionChecker.addListener('webViewOutdated', (status) => {
  console.log('Outdated WebView', status);
});

const status = await WebviewVersionChecker.check({
  minimumMajorVersion: 124,
  minimumDeviceSharePercent: 3,
  showPromptOnOutdated: true,
});

console.log('Current status', status);
```

## Device-share compatibility mode

You can use a Browserslist-style threshold with your own dataset:

```ts
await WebviewVersionChecker.check({
  minimumDeviceSharePercent: 3,
  versionShareByMajor: {
    '137': 58.2,
    '136': 21.3,
    '135': 4.6,
    '134': 2.1,
  },
});
```

## Platform notes

- Android only
- Android 5-6 and 10+ use Android System WebView
- Android 7-9 use Google Chrome as WebView provider
