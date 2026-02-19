---
locale: en
---

# Using @capgo/capacitor-persona

The `@capgo/capacitor-persona` package launches Persona identity verification inquiries in Capacitor apps using native iOS and Android SDKs.

Use it to:
- start inquiries from a template
- resume an existing inquiry with `inquiryId` + `sessionToken`
- listen for complete, canceled, and error events

## Installation

```bash
bun add @capgo/capacitor-persona
bunx cap sync
```

## iOS Setup

Depending on your Persona template, add usage descriptions in `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app uses the camera for identity verification.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app uses location to support identity verification.</string>
<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app uses bluetooth to improve identity verification checks.</string>
```

## Android Setup

No manual native setup is needed. The plugin includes Persona's required Maven repository and SDK dependency.

## Basic Usage

```ts
import { Persona } from '@capgo/capacitor-persona';

await Persona.addListener('inquiryComplete', (result) => {
  console.log('Persona complete', result.inquiryId, result.status, result.fields);
});

await Persona.addListener('inquiryCanceled', (result) => {
  console.log('Persona canceled', result.inquiryId, result.sessionToken);
});

await Persona.addListener('inquiryError', (result) => {
  console.error('Persona error', result.error, result.errorCode, result.cause);
});

await Persona.startInquiry({
  templateId: 'itmpl_EXAMPLE',
  environment: 'sandbox',
  referenceId: 'user_123',
  fields: {
    name_first: 'Alex',
    is_verified_user: true,
  },
});
```

## Resume Flow Example

```ts
await Persona.startInquiry({
  inquiryId: 'inq_123',
  sessionToken: 'usertok_abc',
  environment: 'production',
});
```

## API Summary

- `startInquiry(options)`: Launch inquiry UI.
- `inquiryComplete`: Fired when inquiry finishes.
- `inquiryCanceled`: Fired when user exits.
- `inquiryError`: Fired on unrecoverable Persona SDK errors.

## Best Practices

- Validate launch options before calling `startInquiry`.
- Handle all three events to keep UX resilient.
- Use Persona webhooks on your backend for compliance/business-critical decisions.
