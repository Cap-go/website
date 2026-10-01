---
locale: en
---
# Using @capgo/capacitor-autofill-save-password

Prompt to display dialog for saving password to keychain from webview app.

## Install

```bash
bun add @capgo/capacitor-autofill-save-password
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { SavePassword } from '@capgo/capacitor-autofill-save-password';
```

## API at a glance

| Method | Description |
| --- | --- |
| `promptDialog` | Save a password to the keychain. |
| `readPassword` | Read a password from the keychain. Requires the developer to setup associated domain for the app for iOS. |

## Examples

### `promptDialog()`

Save a password to the keychain.

```typescript
import { SavePassword } from '@capgo/capacitor-autofill-save-password';

await SavePassword.promptDialog({
  username: 'your-username',
  password: 'your-password'
});
```

### `readPassword()`

Read a password from the keychain. Requires the developer to setup associated domain for the app for iOS.

```typescript
import { SavePassword } from '@capgo/capacitor-autofill-save-password';

const result = await SavePassword.readPassword();
console.log(result);
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-autofill-save-password/)
- [Documentation](/docs/plugins/autofill-save-password/)
- [API reference](/docs/plugins/autofill-save-password/getting-started/)

## Keep going from Using @capgo/capacitor-autofill-save-password

If you are using **Using @capgo/capacitor-autofill-save-password** to plan authentication and account flows, connect it with [@capgo/capacitor-autofill-save-password](/docs/plugins/autofill-save-password/) for the implementation detail in @capgo/capacitor-autofill-save-password, [Getting Started](/docs/plugins/autofill-save-password/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, and [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric.
