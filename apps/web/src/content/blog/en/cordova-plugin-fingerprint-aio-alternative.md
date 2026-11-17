---
slug: cordova-plugin-fingerprint-aio-alternative
title: "cordova-plugin-fingerprint-aio Alternative for Capacitor"
description: "cordova-plugin-fingerprint-aio alternative for Capacitor: biometric login with @capgo/capacitor-native-biometric, secure credentials, and Face ID support."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-17T14:00:00.000Z
updated_at: 2026-11-17T14:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a biometric authentication plugin guide"
keywords: cordova-plugin-fingerprint-aio alternative, cordova-plugin-touch-id alternative, capacitor biometric login, @capgo/capacitor-native-biometric
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-fingerprint-aio alternative in Capacitor?"
    answer: "@capgo/capacitor-native-biometric maps Fingerprint.isAvailable and Fingerprint.show to isAvailable() and verifyIdentity() plus secure credential storage in definitions.ts."
  - question: "Does this replace cordova-plugin-touch-id?"
    answer: "Yes for Capacitor apps. cordova-plugin-touch-id (npm 3.4.0, modified 14 June 2022) only covers iOS Touch ID callbacks; Capgo covers Touch ID, Face ID, and Android biometrics."
  - question: "Is cordova-plugin-fingerprint-aio still maintained?"
    answer: "npm lists cordova-plugin-fingerprint-aio at version 6.0.1 with a registry modified date of 28 June 2025."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/native-biometric/, npm @capgo/capacitor-native-biometric, and GitHub Cap-go/capacitor-native-biometric."
---

The practical **cordova-plugin-fingerprint-aio alternative** for a Capacitor app is [`@capgo/capacitor-native-biometric`](/plugins/capacitor-native-biometric/). It replaces the Cordova `Fingerprint` object (and legacy **cordova-plugin-touch-id** `TouchID` flows on iOS) with `NativeBiometric` promise APIs, hardware backed credential storage, and typed `BiometryType` values in `definitions.ts`. This guide covers npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-fingerprint-aio in Capacitor

**cordova-plugin-fingerprint-aio** on npm is version **6.0.1**. The registry `modified` timestamp is **28 June 2025**. The source lives at [niklasmerz/cordova-plugin-fingerprint-aio](https://github.com/niklasmerz/cordova-plugin-fingerprint-aio). The README and `www/Fingerprint.js` document:

- `Fingerprint.isAvailable(success, error, optionalParams)`
- `Fingerprint.show(params, success, error)` calling native `authenticate`
- `registerBiometricSecret` / `loadBiometricSecret` for encrypted secrets (v4+)
- Face ID support with `FACEID_USAGE_DESCRIPTION` install variable
- `BIOMETRIC_*` error code constants in JavaScript

**cordova-plugin-touch-id** on npm is version **3.4.0** with `modified` **14 June 2022**. It targets older iOS Touch ID only APIs from [EddyVerbruggen/cordova-plugin-touch-id](https://github.com/EddyVerbruggen/cordova-plugin-touch-id). Many apps still ship one of these Cordova plugins alongside Capacitor through compat layers.

[`@capgo/capacitor-native-biometric`](https://www.npmjs.com/package/@capgo/capacitor-native-biometric) latest on npm is **8.9.3** with a `modified` date of **11 November 2026**. `src/definitions.ts` documents `isAvailable()`, `verifyIdentity()`, `setCredentials()` / `getCredentials()`, `getSecureCredentials()`, `setData()` / `getSecureData()`, `BiometryType`, and `AccessControl` for biometric gated Keychain or Keystore access. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-native-biometric
bunx cap sync
```

**iOS:** Set `NSFaceIDUsageDescription` in `Info.plist` when you use Face ID (same role as Cordova `FACEID_USAGE_DESCRIPTION`).

**Android:** Minimum SDK 23 per the Cordova README; enable `USE_BIOMETRIC` permissions as documented in the Capgo plugin readme.

## Usage example

```ts
import { NativeBiometric, BiometryType } from '@capgo/capacitor-native-biometric';

export async function biometricUnlock() {
  const available = await NativeBiometric.isAvailable({ useFallback: true });
  if (!available.isAvailable) {
    throw new Error(`Biometrics unavailable: ${available.errorCode}`);
  }

  await NativeBiometric.verifyIdentity({
    reason: 'Confirm your identity',
    title: 'Login',
    subtitle: 'Use biometrics',
    description: available.biometryType === BiometryType.FACE_ID ? 'Face ID' : 'Biometrics',
  });
}
```

## Migrating from Cordova to Capacitor

```js
// Before (cordova-plugin-fingerprint-aio)
Fingerprint.show(
  { title: 'Login', clientId: 'app', clientSecret: 'unused', disableBackup: true },
  () => onSuccess(),
  (err) => onError(err),
);
```

```ts
// After (Capacitor)
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.verifyIdentity({
  title: 'Login',
  reason: 'Confirm your identity',
});
```

```js
// Before (cordova-plugin-touch-id, iOS only)
window.plugins.touchid.isAvailable(
  () => window.plugins.touchid.verifyFingerprint('Scan to continue', onSuccess, onError),
  onError,
);
```

```ts
// After (Capacitor, iOS and Android)
const { isAvailable } = await NativeBiometric.isAvailable({ useFallback: false });
if (isAvailable) {
  await NativeBiometric.verifyIdentity({ reason: 'Scan to continue' });
}
```

### API mapping table

| cordova-plugin-fingerprint-aio (`Fingerprint`) | cordova-plugin-touch-id (typical) | @capgo/capacitor-native-biometric |
| --- | --- | --- |
| `isAvailable(success, error, optionalParams)` | `touchid.isAvailable(success, error)` | `isAvailable({ useFallback, preferMultipleBiometryType? })` returns `AvailableResult` |
| `show(params, success, error)` | `verifyFingerprint(message, success, error)` | `verifyIdentity({ reason, title, subtitle, ... })` |
| `registerBiometricSecret(params, ...)` | not available | `setCredentials()` or `setData()` with `accessControl` |
| `loadBiometricSecret(params, ...)` | not available | `getSecureCredentials()` or `getSecureData()` |
| `BIOMETRIC_NOT_ENROLLED` etc. | Cordova error strings | `BiometricAuthError` on `AvailableResult.errorCode` and promise rejections |
| Biometric type strings `finger` / `face` | Touch ID only | `BiometryType` enum (`TOUCH_ID`, `FACE_ID`, `FINGERPRINT`, ...) |
| Cordova plugin install | Cordova plugin install | `bun add @capgo/capacitor-native-biometric` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/native-biometric/](/docs/plugins/native-biometric/)
- Marketing page: [/plugins/capacitor-native-biometric/](/plugins/capacitor-native-biometric/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-native-biometric](https://www.npmjs.com/package/@capgo/capacitor-native-biometric)
- GitHub: [https://github.com/Cap-go/capacitor-native-biometric/](https://github.com/Cap-go/capacitor-native-biometric/)
- Cordova fingerprint upstream: [https://github.com/niklasmerz/cordova-plugin-fingerprint-aio](https://github.com/niklasmerz/cordova-plugin-fingerprint-aio)
- Cordova Touch ID upstream: [https://github.com/EddyVerbruggen/cordova-plugin-touch-id](https://github.com/EddyVerbruggen/cordova-plugin-touch-id)

Biometric enrollment checks ship inside the native binary. Plan a store build when you change entitlements or manifest permissions. Use [Capgo Build](/native-build/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).