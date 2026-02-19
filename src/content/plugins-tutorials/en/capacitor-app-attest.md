---
locale: en
---
# Using @capgo/capacitor-app-attest Package

The `@capgo/capacitor-app-attest` package is a Capacitor plugin for cross-platform device attestation. It gives you one JavaScript API for:

- **iOS** with Apple App Attest (`DeviceCheck`)
- **Android** with Google Play Integrity Standard API

This is useful to protect sensitive backend routes such as login, account recovery, payments, and abuse-prone endpoints.

## Installation

```bash
bun add @capgo/capacitor-app-attest
bunx cap sync
```

## iOS setup

1. Open your app target in Xcode.
2. Go to **Signing & Capabilities**.
3. Add the **App Attest** capability.
4. Test on a physical device for real App Attest validation.

## Android setup

1. Enable **Play Integrity API** in your Google Cloud project.
2. Configure Play Integrity access in Play Console for your app.
3. Provide `cloudProjectNumber`:

```ts
// capacitor.config.ts
plugins: {
  AppAttest: {
    cloudProjectNumber: '123456789012',
  },
}
```

## Unified API usage

```ts
import { AppAttest } from '@capgo/capacitor-app-attest';

const support = await AppAttest.isSupported();
if (!support.isSupported) {
  throw new Error(`Attestation unavailable on ${support.platform}`);
}

const { keyId } = await AppAttest.prepare();

const registration = await AppAttest.createAttestation({
  keyId,
  challenge: 'server-one-time-registration-challenge',
});

const assertion = await AppAttest.createAssertion({
  keyId,
  payload: 'server-one-time-request-payload',
});

console.log(registration.platform, registration.format, registration.token);
console.log(assertion.platform, assertion.format, assertion.token);
```

## Backend verification model

You must validate tokens on your backend. The app should never decide trust by itself.

### iOS backend (Apple App Attest)

- Verify attestation certificate chain and app identity.
- Verify `clientDataHash` against `SHA256(challenge)`.
- Store key state for assertion checks.
- Verify assertion signature and replay constraints.

### Android backend (Play Integrity Standard)

- Decode token with Google `decodeIntegrityToken`.
- Verify `requestHash` equals `base64url(SHA256(challenge or payload))`.
- Verify package name and signing certificate digest.
- Enforce integrity verdict policy and replay/TTL checks.

## Recommended next step

Use the full plugin docs for platform-specific setup and backend schema:

- `/docs/plugins/app-attest/`
- `/docs/plugins/app-attest/ios/`
- `/docs/plugins/app-attest/android/`
