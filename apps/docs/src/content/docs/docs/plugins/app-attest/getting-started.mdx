---
title: Getting Started
description: Learn how to install and use App Attest with a unified API for iOS and Android attestation.
sidebar:
  order: 2
---

import { PackageManagers } from 'starlight-package-managers'
import { Steps } from '@astrojs/starlight/components';

## Installation

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-app-attest` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

<Steps>
1. **Install the package**
   <PackageManagers pkg="@capgo/capacitor-app-attest" pkgManagers={['bun']} />

2. **Sync native projects**
   <PackageManagers type="exec" pkg="cap" args="sync" pkgManagers={['bun']} />

3. **Configure platform requirements**
   - Complete [iOS setup](/docs/plugins/app-attest/ios/) for App Attest capability and backend verification flow.
   - Complete [Android setup](/docs/plugins/app-attest/android/) for Play Integrity Standard and backend verification flow.
</Steps>

## Why use this plugin

This plugin provides one cross-platform API while keeping native platform security:

- iOS: Apple App Attest (`DeviceCheck`)
- Android: Google Play Integrity Standard API
- No custom client-side crypto scheme
- Normalized outputs for backend checks

## Usage

```typescript
import { AppAttest } from '@capgo/capacitor-app-attest';

const support = await AppAttest.isSupported();
if (!support.isSupported) {
  throw new Error(`Attestation not supported on ${support.platform}`);
}

const prepared = await AppAttest.prepare();

const registration = await AppAttest.createAttestation({
  keyId: prepared.keyId,
  challenge: 'backend-one-time-registration-challenge',
});

const assertion = await AppAttest.createAssertion({
  keyId: prepared.keyId,
  payload: 'backend-one-time-request-payload',
});

console.log(registration.platform, registration.format, registration.token);
console.log(assertion.platform, assertion.format, assertion.token);
```

## Unified response shape

`createAttestation()` and `createAssertion()` return the same key fields on iOS and Android:

| Field | Type | Description |
| --- | --- | --- |
| `platform` | `'ios' \| 'android' \| 'web'` | Native platform that produced the token |
| `format` | `AttestationFormat` | `apple-app-attest` or `google-play-integrity-standard` |
| `keyId` | `string` | Key/provider handle used for attestation |
| `token` | `string` | Token to verify on your backend |

## Backend requirement

Attestation is only useful when verified server-side.

- Never trust client-only success.
- Require one-time challenge/payload values from your backend.
- Verify `token`, app identity, and replay protections in backend logic.

Use the platform-specific backend guides:

- [iOS setup and backend verification](/docs/plugins/app-attest/ios/)
- [Android setup and backend verification](/docs/plugins/app-attest/android/)

## Keep going from Getting Started

If you are using **Getting Started** to plan security and compliance, connect it with [Using @capgo/capacitor-app-attest](/plugins/capacitor-app-attest/) for the native capability in Using @capgo/capacitor-app-attest, [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner, and [Capgo Security](/security/) for the product workflow in Capgo Security.
