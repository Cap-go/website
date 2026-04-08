---
locale: en
---
# Using @capgo/capacitor-ssl-pinning Package

The `@capgo/capacitor-ssl-pinning` package adds native certificate pinning to `CapacitorHttp` requests on iOS and Android.

It is useful when your app talks to security-sensitive backends and you want to reject unexpected certificates even if the device trust store would normally accept them.

## Installation

```bash
bun add @capgo/capacitor-ssl-pinning
bunx cap sync
```

## Configure Capacitor

Enable Capacitor HTTP interception and declare the certificates relative to your app root:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SSLPinning: {
      certs: [
        'sslCerts/production/primary.cer',
        'sslCerts/production/backup.cer',
      ],
      excludedDomains: [
        'https://analytics.google.com',
      ],
    },
  },
};

export default config;
```

During `bunx cap sync`, the plugin copies those certificates into `webDir/certs` so the native implementations can load them from bundled app assets.

## Use CapacitorHttp

```ts
import { CapacitorHttp } from '@capacitor/core';

const response = await CapacitorHttp.get({
  url: 'https://api.example.com/health',
});

console.log(response.status, response.data);
```

If the server certificate does not match one of the pinned certificates, the request fails on the native layer.

## Inspect current configuration

```ts
import { SSLPinning } from '@capgo/capacitor-ssl-pinning';

const config = await SSLPinning.getConfiguration();
const version = await SSLPinning.getPluginVersion();

console.log(config);
console.log(version.version);
```

## Best practices

- Keep at least one backup certificate ready during rotations.
- Pin only the domains you fully control.
- Keep third-party endpoints in `excludedDomains`.
- Use `CapacitorHttp` consistently for the traffic you need to protect.

## Recommended next step

Use the full plugin docs for configuration details and platform behavior:

- `/docs/plugins/ssl-pinning/`
- `/docs/plugins/ssl-pinning/getting-started/`
