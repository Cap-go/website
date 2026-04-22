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

## What This Plugin Exposes

- `promptDialog` - Save a password to the keychain.
- `readPassword` - Read a password from the keychain. Requires the developer to setup associated domain for the app for iOS.

## Example Usage

### `promptDialog`

Save a password to the keychain.

```typescript
import { SavePassword } from '@capgo/capacitor-autofill-save-password';

await SavePassword.promptDialog({
  username: 'your-username',
  password: 'your-password'
});
```

### `readPassword`

Read a password from the keychain. Requires the developer to setup associated domain for the app for iOS.

```typescript
import { SavePassword } from '@capgo/capacitor-autofill-save-password';

await SavePassword.readPassword();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-autofill-save-password/
- Docs: /docs/plugins/autofill-save-password/
