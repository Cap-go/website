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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
```

## API at a glance

| Method | Description |
| --- | --- |
| `isAvailable` | Checks if biometric authentication hardware is available. |
| `verifyIdentity` | Prompts the user to authenticate with biometrics. |
| `getCredentials` | Gets the stored credentials for a given server. |
| `setCredentials` | Stores the given credentials for a given server. |
| `deleteCredentials` | Deletes the stored credentials for a given server. |
| `getSecureCredentials` | Gets the stored credentials for a given server, requiring biometric authentication. Credentials must have been stored with accessControl set to BIOMETRY_CURRENT_SET or BIOMETRY_ANY. |
| `isCredentialsSaved` | Checks if credentials are already saved for a given server. |
| `setData` | Stores an arbitrary string value under the given key. Values are encrypted at rest using the platform secure storage backend (Android Keystore + SharedPreferences, iOS Keychain). |
| `getData` | Gets a previously stored value for the given key. Only returns values stored without biometric `accessControl`. |
| `getSecureData` | Gets a biometric-protected value for the given key. The value must have been stored with `accessControl` set to BIOMETRY_CURRENT_SET or BIOMETRY_ANY. |
| `deleteData` | Deletes the stored value for the given key (protected and unprotected). |
| `isDataSaved` | Checks whether a value is already saved for the given key. |

## Examples

### `isAvailable()`

Checks if biometric authentication hardware is available.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

const result = await NativeBiometric.isAvailable();
console.log(result);
```

### `verifyIdentity()`

Prompts the user to authenticate with biometrics.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.verifyIdentity();
```

### `getCredentials()`

Gets the stored credentials for a given server.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

const result = await NativeBiometric.getCredentials({ server: 'example.com' });
// The result holds sensitive values: use it without logging it.
```

### `setCredentials()`

Stores the given credentials for a given server.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.setCredentials({
  username: 'username',
  password: 'password',
  server: 'example.com',
});
```

### `deleteCredentials()`

Deletes the stored credentials for a given server.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

await NativeBiometric.deleteCredentials({ server: 'example.com' });
```

### `getSecureCredentials()`

Gets the stored credentials for a given server, requiring biometric authentication. Credentials must have been stored with accessControl set to BIOMETRY_CURRENT_SET or BIOMETRY_ANY.

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

const result = await NativeBiometric.getSecureCredentials({ server: 'example.com' });
// The result holds sensitive values: use it without logging it.
```

The table above lists the 12 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-native-biometric/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-native-biometric/)
- [Documentation](/docs/plugins/native-biometric/)
- [API reference](/docs/plugins/native-biometric/getting-started/)

## Keep going from Using @capgo/capacitor-native-biometric

If you are using **Using @capgo/capacitor-native-biometric** to plan authentication and account flows, connect it with [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, [Getting Started](/docs/plugins/native-biometric/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
