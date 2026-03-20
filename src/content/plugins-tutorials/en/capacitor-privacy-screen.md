---
locale: en
---
# Using @capgo/capacitor-privacy-screen Package

The `@capgo/capacitor-privacy-screen` package protects sensitive app content in Capacitor applications.

It gives you one JavaScript API to:

- block Android screenshots, recordings, and recent-app previews
- obscure the iOS app switcher snapshot
- temporarily disable and restore protection around specific flows

## Installation

```bash
bun add @capgo/capacitor-privacy-screen
bunx cap sync
```

## Basic usage

```ts
import { PrivacyScreen } from '@capgo/capacitor-privacy-screen';

await PrivacyScreen.disable();

// Run a flow where screenshots or previews are acceptable.

await PrivacyScreen.enable();
```

The plugin starts enabled automatically on native platforms, so many apps do not need to call `enable()` on launch.

## Platform behavior

### iOS

- Protects the app switcher preview with a temporary overlay
- Requires no extra setup after install
- Does not block active user screenshots because iOS does not expose an equivalent secure-window API

### Android

- Uses `FLAG_SECURE`
- Blocks screenshots and recent-app previews
- Requires no extra setup after install

## Recommended next step

Use the full plugin docs for setup notes and platform-specific behavior:

- `/docs/plugins/privacy-screen/`
- `/docs/plugins/privacy-screen/ios/`
- `/docs/plugins/privacy-screen/android/`
