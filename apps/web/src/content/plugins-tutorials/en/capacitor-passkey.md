---
locale: en
published: true
---
# Using @capgo/capacitor-passkey

`@capgo/capacitor-passkey` lets a Capacitor app keep the same WebAuthn flow you already use on the web:

```ts
await navigator.credentials.create({ publicKey: registrationOptions });
await navigator.credentials.get({ publicKey: requestOptions });
```

On native builds, the plugin installs a shim for `navigator.credentials.create()` and `navigator.credentials.get()`, forwards the request to iOS and Android passkey APIs, and returns browser-like credential objects to your app.

## Install the plugin

```bash
bun add @capgo/capacitor-passkey
bunx cap sync
```

## Configure the host app once

Add the plugin config in `capacitor.config.ts` or `capacitor.config.json`:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.capgo.passkey.example',
  appName: 'My App',
  webDir: 'dist',
  plugins: {
    CapacitorPasskey: {
      origin: 'https://signin.example.com',
      autoShim: true,
      domains: ['signin.example.com'],
    },
  },
};

export default config;
```

Run sync again after changing the config:

```bash
bunx cap sync
```

During sync, the plugin patches the generated native host projects:

- iOS: associated domains entitlements
- Android: `asset_statements` metadata for Digital Asset Links

## Import the shim once

Import the auto entrypoint in your app bootstrap:

```ts
import '@capgo/capacitor-passkey/auto';
```

After that, your existing browser-style passkey code can stay the same.

## Keep your normal WebAuthn flow

```ts
const credential = await navigator.credentials.create({
  publicKey: registrationOptions,
});

const assertion = await navigator.credentials.get({
  publicKey: requestOptions,
});
```

## Native setup still needs website trust files

The plugin reduces app-side work, but passkeys still depend on the website trust files for your relying-party domain:

- iOS needs `/.well-known/apple-app-site-association`
- Android needs `/.well-known/assetlinks.json`

The detailed setup is documented here:

- [Getting started](/docs/plugins/passkey/getting-started/)
- [iOS setup](/docs/plugins/passkey/ios/)
- [Android setup](/docs/plugins/passkey/android/)
- [Backend notes](/docs/plugins/passkey/backend/)

## Important Android caveat

Android Credential Manager can share the same relying party and passkeys as your website when Digital Asset Links are configured, but the native assertion origin is not identical to a browser origin. If your backend strictly validates `clientDataJSON.origin`, make sure it accepts the Android app origin alongside your website origin.
