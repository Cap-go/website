---
locale: en
---
# Using @capgo/capacitor-data-storage-sqlite

SQLite Storage of key/value strings pair.

## Install

```bash
bun add @capgo/capacitor-data-storage-sqlite
bunx cap sync
```

## What This Plugin Exposes

- `openStore` - Open a store.
- `closeStore` - Close the Store.
- `isStoreOpen` - Check if the Store is opened.
- `isStoreExists` - Check if the Store exists.

## Example Usage

### `openStore`

Open a store.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.openStore({} as capOpenStorageOptions);
```

### `closeStore`

Close the Store.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.closeStore({} as capStorageOptions);
```

### `isStoreOpen`

Check if the Store is opened.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.isStoreOpen({} as capStorageOptions);
```

### `isStoreExists`

Check if the Store exists.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.isStoreExists({} as capStorageOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-data-storage-sqlite/
- Docs: /docs/plugins/data-storage-sqlite/
