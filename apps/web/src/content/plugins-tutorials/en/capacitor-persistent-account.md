---
locale: en
---
# Using @capgo/capacitor-persistent-account

Capacitor Persistent Account Plugin.

## Install

```bash
bun add @capgo/capacitor-persistent-account
bunx cap sync
```

## What This Plugin Exposes

- `readAccount` - Reads the stored account data from persistent storage.
- `saveAccount` - Saves account data to persistent storage.

## Example Usage

### `readAccount`

Reads the stored account data from persistent storage.

```typescript
import { CapacitorPersistentAccount } from '@capgo/capacitor-persistent-account';

const result = await CapacitorPersistentAccount.readAccount();
if (result.data) {
  console.log('Account data:', result.data);
} else {
  console.log('No account data found');
}
```

### `saveAccount`

Saves account data to persistent storage.

```typescript
import { CapacitorPersistentAccount } from '@capgo/capacitor-persistent-account';

await CapacitorPersistentAccount.saveAccount({
  data: {
    userId: '12345',
    username: 'john.doe',
    email: 'john@example.com'
  }
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-persistent-account/
- Docs: /docs/plugins/persistent-account/
