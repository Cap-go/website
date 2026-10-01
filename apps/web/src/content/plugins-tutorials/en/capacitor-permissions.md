---
locale: en
---
# Using @capgo/capacitor-permissions

One TypeScript API to check and request runtime permissions on iOS, Android, and web with normalized status codes.

## Install

```bash
bun add @capgo/capacitor-permissions
bunx cap sync
```

## What This Plugin Exposes

- `check` - Read the current status of one permission without prompting.
- `request` - Request one permission from the user.
- `checkMultiple` - Check several permissions without prompting.
- `requestMultiple` - Request several permissions sequentially.
- `shouldShowRationale` - Whether Android should show a rationale before requesting again.
- `openSettings` - Open application or notification settings when access is blocked.
- `requestPreciseLocation` - Upgrade to precise location on iOS and fine location on Android.
- `getPluginVersion` - Returns the platform implementation version marker.

## Example Usage

### `check`

```typescript
import { Permissions } from '@capgo/capacitor-permissions';

// See getting started: /docs/plugins/permissions/getting-started/
```

### `request`

```typescript
import { Permissions } from '@capgo/capacitor-permissions';

// See getting started: /docs/plugins/permissions/getting-started/
```

### `checkMultiple`

```typescript
import { Permissions } from '@capgo/capacitor-permissions';

// See getting started: /docs/plugins/permissions/getting-started/
```

### `requestMultiple`

```typescript
import { Permissions } from '@capgo/capacitor-permissions';

// See getting started: /docs/plugins/permissions/getting-started/
```

### `openSettings`

```typescript
import { Permissions } from '@capgo/capacitor-permissions';

// See getting started: /docs/plugins/permissions/getting-started/
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-permissions/
- Docs: /docs/plugins/permissions/
