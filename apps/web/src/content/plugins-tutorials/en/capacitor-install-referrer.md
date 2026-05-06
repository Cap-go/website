---
locale: en
---
# Using @capgo/capacitor-install-referrer

`@capgo/capacitor-install-referrer` reads install attribution signals in Capacitor apps.

Use it when you need Google Play Install Referrer data on Android and Apple AdServices attribution tokens on iOS through one API.

## Install

```bash
bun add @capgo/capacitor-install-referrer
bunx cap sync
```

## What This Plugin Exposes

- `getReferrer` returns install attribution details for Android or iOS.
- `GetReferrer` is a deprecated compatibility alias for migration from `cap-play-install-referrer`.
- Android returns the Play referrer string, click timestamp, install timestamp, and instant app flag.
- iOS returns an AdServices attribution token and can optionally fetch Apple's attribution payload.

## Example Usage

```typescript
import { InstallReferrer } from '@capgo/capacitor-install-referrer';

const result = await InstallReferrer.getReferrer();

if (result.platform === 'android') {
  console.log(result.referrer);
}

if (result.platform === 'ios') {
  console.log(result.attributionToken);
}
```

## Apple Attribution Payload

```typescript
const result = await InstallReferrer.getReferrer({
  fetchAppleAttribution: true,
  appleAttributionRetryCount: 3,
  appleAttributionRetryDelayMs: 5000,
});

console.log(result.appleAttribution);
```

## Platform Notes

Android uses the Google Play Install Referrer service and requires a Play Store install for real referrer data. iOS uses Apple AdServices because Apple does not provide a generic App Store install referrer equivalent.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-install-referrer/
- Docs: /docs/plugins/install-referrer/
