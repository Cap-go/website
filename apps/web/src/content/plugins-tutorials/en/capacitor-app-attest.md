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

## Keep going from Using @capgo/capacitor-app-attest

If you are using **Using @capgo/capacitor-app-attest** to plan security and compliance, connect it with [@capgo/capacitor-app-attest](/docs/plugins/app-attest/) for the implementation detail in @capgo/capacitor-app-attest, [Getting Started](/docs/plugins/app-attest/getting-started/) for the implementation detail in Getting Started, [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, and [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner.
