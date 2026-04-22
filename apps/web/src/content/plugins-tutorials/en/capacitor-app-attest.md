---
locale: en
---
# Using @capgo/capacitor-app-attest

Unified cross-platform attestation plugin for Capacitor.

## Install

```bash
bun add @capgo/capacitor-app-attest
bunx cap sync
```

## What This Plugin Exposes

- `isSupported` - Checks whether native attestation is available on this device.
- `prepare` - Prepares attestation state and returns the key handle used for later calls.
- `createAttestation` - Creates a registration attestation token bound to a backend-issued challenge.
- `createAssertion` - Creates a request assertion token bound to a request payload.

## Example Usage

### `isSupported`

Checks whether native attestation is available on this device.

```typescript
import { AppAttestNative } from '@capgo/capacitor-app-attest';

await AppAttestNative.isSupported();
```

### `prepare`

Prepares attestation state and returns the key handle used for later calls.

```typescript
import { AppAttestNative } from '@capgo/capacitor-app-attest';

await AppAttestNative.prepare();
```

### `createAttestation`

Creates a registration attestation token bound to a backend-issued challenge.

```typescript
import { AppAttestNative } from '@capgo/capacitor-app-attest';

await AppAttestNative.createAttestation({} as CreateAttestationOptions);
```

### `createAssertion`

Creates a request assertion token bound to a request payload.

```typescript
import { AppAttestNative } from '@capgo/capacitor-app-attest';

await AppAttestNative.createAssertion({} as CreateAssertionOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-app-attest/
- Docs: /docs/plugins/app-attest/
