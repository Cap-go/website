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

## Keep going from Using @capgo/capacitor-zebra-datawedge

If you are using **Using @capgo/capacitor-zebra-datawedge** to plan native plugin work, connect it with [@capgo/capacitor-zebra-datawedge](/docs/plugins/zebra-datawedge/) for the implementation detail in @capgo/capacitor-zebra-datawedge, [Getting Started](/docs/plugins/zebra-datawedge/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
