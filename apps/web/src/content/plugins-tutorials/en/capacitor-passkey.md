---
locale: en
published: true
---
# Using @capgo/capacitor-passkey

Keep your browser-style WebAuthn code in a Capacitor app while the plugin handles native passkey calls and native host patching.

## Browser-style API

`@capgo/capacitor-passkey` keeps the same WebAuthn flow you already use on the web:

```ts
await navigator.credentials.create({ publicKey: registrationOptions });
await navigator.credentials.get({ publicKey: requestOptions });
```

On native builds, the plugin installs a shim for `navigator.credentials.create()` and `navigator.credentials.get()`, forwards the request to iOS and Android passkey APIs, and returns browser-like credential objects to your app.

## Install and sync native projects

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

## What the plugin config does

The config is read from `plugins.CapacitorPasskey` in `capacitor.config.*`.

- `origin`: primary HTTPS relying-party origin used by the shim and direct API
- `domains`: extra relying-party hostnames to patch into native config during sync
- `autoShim`: defaults to `true` and controls the native `cap sync` auto-configuration hook

Run sync again after changing the config:

```bash
bunx cap sync
```

## Install the shim during bootstrap

Import the plugin from the standard package entrypoint, then install the shim during app bootstrap:

```ts
import { CapacitorPasskey } from '@capgo/capacitor-passkey';

await CapacitorPasskey.autoShimWebAuthn();
```

After that, your existing browser-style passkey code can stay the same.

If you need to force the shim or override the configured origin at runtime, call:

```ts
import { CapacitorPasskey } from '@capgo/capacitor-passkey';

CapacitorPasskey.shimWebAuthn({
  origin: 'https://signin.example.com',
});
```

## Keep your normal WebAuthn flow

```ts
const credential = await navigator.credentials.create({
  publicKey: registrationOptions,
});

const assertion = await navigator.credentials.get({
  publicKey: requestOptions,
});
```

## What sync patches for you

During `bunx cap sync`, the plugin updates the generated native host projects:

- iOS: associated domains entitlements and Xcode entitlements wiring when needed
- Android: `asset_statements` metadata and the generated resource used by the manifest

## Native setup still needs website trust files

The plugin reduces app-side work, but passkeys still depend on the website trust files for your relying-party domain. You still need to host:

- `https://your-domain/.well-known/apple-app-site-association`
- `https://your-domain/.well-known/assetlinks.json`

The plugin can patch the generated native projects during sync, but it cannot create or host those website trust files for you.

## Other public methods

The public plugin API also exposes the direct helpers defined in `src/definitions.ts`:

- `await CapacitorPasskey.getConfiguration()` returns the resolved `origin`, `domains`, `autoShim`, and current `platform`.
- `await CapacitorPasskey.createCredential(...)` registers a passkey from a JSON-safe WebAuthn payload.
- `await CapacitorPasskey.getCredential(...)` authenticates with an existing passkey from a JSON-safe WebAuthn payload.
- `await CapacitorPasskey.isSupported()` reports whether the current runtime supports passkeys.
- `await CapacitorPasskey.getPluginVersion()` returns the current native implementation version marker.

## Platform guides

- [Getting started](/docs/plugins/passkey/getting-started/)
- [iOS setup](/docs/plugins/passkey/ios/)
- [Android setup](/docs/plugins/passkey/android/)
- [Backend notes](/docs/plugins/passkey/backend/)

## Important iOS note

On iOS 17.4 and newer, the plugin uses the browser-style client-data API so the configured HTTPS origin is reflected in `clientDataJSON`.

## Important Android caveat

Android Credential Manager can share the same relying party and passkeys as your website when Digital Asset Links are configured, but the native assertion origin is not identical to a browser origin. If your backend strictly validates `clientDataJSON.origin`, make sure it accepts the Android app origin alongside your website origin.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-passkey/
- Docs: /docs/plugins/passkey/
