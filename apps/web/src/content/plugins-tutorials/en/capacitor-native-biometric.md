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

## Keep going from Using @capgo/capacitor-native-biometric

If you are using **Using @capgo/capacitor-native-biometric** to plan authentication and account flows, connect it with [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, [Getting Started](/docs/plugins/native-biometric/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
