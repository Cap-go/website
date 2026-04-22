---
locale: en
---
# Using @capgo/capacitor-native-biometric

This plugin gives access to the native biometric apis for android and iOS.

## Install

```bash
bun add @capgo/capacitor-native-biometric
bunx cap sync
```

## What This Plugin Exposes

- `isAvailable` - Checks if biometric authentication hardware is available.
- `verifyIdentity` - Prompts the user to authenticate with biometrics.
- `getCredentials` - Gets the stored credentials for a given server.
- `setCredentials` - Stores the given credentials for a given server.

## Example Usage

### `isAvailable`

Checks if biometric authentication hardware is available.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.isAvailable();
```

### `verifyIdentity`

Prompts the user to authenticate with biometrics.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.verifyIdentity();
```

### `getCredentials`

Gets the stored credentials for a given server.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.getCredentials({} as GetCredentialOptions);
```

### `setCredentials`

Stores the given credentials for a given server.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.setCredentials({} as SetCredentialOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-biometric/
- Docs: /docs/plugins/native-biometric/
