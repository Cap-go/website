---
locale: en
---
# Using @capgo/capacitor-is-root

Capacitor Is Root Plugin for detecting rooted (Android) or jailbroken (iOS) devices.

## Install

```bash
bun add @capgo/capacitor-is-root
bunx cap sync
```

## What This Plugin Exposes

- `isRooted` - Performs the default root/jailbreak detection checks.
- `isRootedWithBusyBox` - Extends the default detection with BusyBox specific checks (Android only).
- `detectRootManagementApps` - Detects if known root management applications are present (Android only).
- `detectPotentiallyDangerousApps` - Detects potentially dangerous applications commonly found on rooted devices (Android only).

## Example Usage

### `isRooted`

Performs the default root/jailbreak detection checks.

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const { result } = await IsRoot.isRooted();
if (result) {
  console.log('Device is rooted/jailbroken');
} else {
  console.log('Device is not rooted/jailbroken');
}
```

### `isRootedWithBusyBox`

Extends the default detection with BusyBox specific checks (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

await IsRoot.isRootedWithBusyBox();
```

### `detectRootManagementApps`

Detects if known root management applications are present (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

await IsRoot.detectRootManagementApps();
```

### `detectPotentiallyDangerousApps`

Detects potentially dangerous applications commonly found on rooted devices (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

await IsRoot.detectPotentiallyDangerousApps();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-is-root/
- Docs: /docs/plugins/is-root/
