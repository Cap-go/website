---
locale: en
---
# Using @capgo/capacitor-intercom

Intercom Capacitor plugin.

## Install

```bash
bun add @capgo/capacitor-intercom
bunx cap sync
```

## What This Plugin Exposes

- `loadWithKeys` - Initialize Intercom with API keys at runtime. Use this if you prefer not to configure keys in capacitor.config.
- `registerIdentifiedUser` - Register a known user with Intercom. At least one of userId or email must be provided.
- `registerUnidentifiedUser` - Register an anonymous user with Intercom.
- `updateUser` - Update user attributes in Intercom.

## Example Usage

### `loadWithKeys`

Initialize Intercom with API keys at runtime. Use this if you prefer not to configure keys in capacitor.config.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.loadWithKeys({} as IntercomLoadOptions);
```

### `registerIdentifiedUser`

Register a known user with Intercom. At least one of userId or email must be provided.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.registerIdentifiedUser({} as IntercomIdentifiedUserOptions);
```

### `registerUnidentifiedUser`

Register an anonymous user with Intercom.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.registerUnidentifiedUser();
```

### `updateUser`

Update user attributes in Intercom.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.updateUser({} as IntercomUserUpdateOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-intercom/
- Docs: /docs/plugins/intercom/
