---
locale: en
---

# Using @capgo/capacitor-webview-version-checker

The `@capgo/capacitor-webview-version-checker` package helps you detect outdated Android WebView versions in runtime, listen to status events, and optionally show a native prompt that redirects users to update.

Main use case: Browserslist-style compatibility checks.  
By default, the plugin uses a `3%` device-share threshold with a built-in dataset generated from caniuse data at build time.

## Installation

```bash
bun add @capgo/capacitor-webview-version-checker
bunx cap sync
```

## Default setup (no plugin settings)

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    WebviewVersionChecker: {},
  },
};

export default config;
```

## Simple config-only setup

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    WebviewVersionChecker: {
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
  showPromptOnOutdated: true,
});

console.log('Current status', status);
```

## Device-share compatibility mode

Default behavior already uses Browserslist-style compatibility (`3%` threshold + bundled dataset).

Use this advanced mode only when you want to override dataset or threshold:

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

`versionShareByMajor` means:
- key = major version
- value = share percent (`0..100`)

Equivalent remote format via `versionShareApiUrl`:
- `{ "versionShareByMajor": { "137": 54.2, "136": 23.8 } }`
- `{ "shareByMajor": { "137": 54.2, "136": 23.8 } }`
- `{ "versions": [{ "major": 137, "share": 54.2 }, { "version": "136.0.0.0", "percent": 23.8 }] }`

## Platform notes

- Android only
- Android 5-6 and 10+ use Android System WebView
- Android 7-9 use Google Chrome as WebView provider
