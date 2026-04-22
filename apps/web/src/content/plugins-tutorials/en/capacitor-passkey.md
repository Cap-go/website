---
locale: en
---
# Using @capgo/capacitor-passkey

Capacitor Passkey plugin.

## Install

```bash
bun add @capgo/capacitor-passkey
bunx cap sync
```

## What This Plugin Exposes

- `shimWebAuthn` - Install a browser-style WebAuthn shim on top of the native plugin.
- `getConfiguration` - Load plugin configuration from the host Capacitor app.
- `autoShimWebAuthn` - Install the browser-style shim using host app configuration.
- `createCredential` - Register a passkey from a JSON-safe WebAuthn request.

## Example Usage

### `shimWebAuthn`

Install a browser-style WebAuthn shim on top of the native plugin.

```typescript
import { CapacitorPasskey } from '@capgo/capacitor-passkey';

CapacitorPasskey.shimWebAuthn({
  origin: 'https://signin.example.com',
});
```

### `getConfiguration`

Load plugin configuration from the host Capacitor app.

```typescript
import { NativeCapacitorPasskey } from '@capgo/capacitor-passkey';

await NativeCapacitorPasskey.getConfiguration();
```

### `autoShimWebAuthn`

Install the browser-style shim using host app configuration.

```typescript
import { CapacitorPasskey } from '@capgo/capacitor-passkey';

await CapacitorPasskey.autoShimWebAuthn();
```

### `createCredential`

Register a passkey from a JSON-safe WebAuthn request.

```typescript
import { NativeCapacitorPasskey } from '@capgo/capacitor-passkey';

await NativeCapacitorPasskey.createCredential({} as CreateCredentialOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-passkey/
- Docs: /docs/plugins/passkey/
