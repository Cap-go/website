---
locale: en
---
# Using @capgo/capacitor-zebra-datawedge

Capacitor plugin for Zebra DataWedge profile management, notifications, queries, and soft scanning on Zebra Android devices.

## Install

```bash
bun add @capgo/capacitor-zebra-datawedge
bunx cap sync
```

## What This Plugin Exposes

- `cloneProfile` 
- `createProfile` 
- `deleteProfile` 
- `importConfig` 

## Example Usage

### `cloneProfile`

See the upstream definitions for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.cloneProfile({} as CloneProfileOptions);
```

### `createProfile`

See the upstream definitions for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.createProfile({} as CreateProfileOptions);
```

### `deleteProfile`

See the upstream definitions for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.deleteProfile({} as DeleteProfileOptions);
```

### `importConfig`

See the upstream definitions for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.importConfig({} as ImportConfigOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-zebra-datawedge/
- Docs: /docs/plugins/zebra-datawedge/
