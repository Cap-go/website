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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

## API at a glance

| Method | Description |
| --- | --- |
| `openStore` | Open a store. |
| `closeStore` | Close the Store. |
| `isStoreOpen` | Check if the Store is opened. |
| `isStoreExists` | Check if the Store exists. |
| `deleteStore` | Delete a store. |
| `setTable` | Set or Add a table to an existing store. |
| `set` | Store a data with given key and value. |
| `get` | Retrieve a data value for a given data key. |
| `remove` | Remove a data with given key. |
| `clear` | Clear the Data Store (delete all keys). |
| `iskey` | Check if a data key exists. |
| `keys` | Get the data key list. |
| `values` | Get the data value list. |
| `filtervalues` | Get the data value list for filter keys. |
| `keysvalues` | Get the data key/value pair list. |
| `isTable` | Check if a table exists. |
| `tables` | Get the table list for the current store. |
| `deleteTable` | Delete a table. |
| `importFromJson` | Import a database From a JSON. |
| `isJsonValid` | Check the validity of a JSON Object. |
| `exportToJson` | Export the given database to a JSON Object. |
| `vacuum` | Rebuild the current SQLite store to reclaim unused disk space. |

## Examples

### `openStore()`

Open a store.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.openStore({
  database: 'database',
  table: 'table',
  encrypted: false,
  mode: 'encryption',
  autoVacuum: 'none',
});
```

### `closeStore()`

Close the Store.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.closeStore({ database: 'database' });
```

### `isStoreOpen()`

Check if the Store is opened.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

const result = await CapgoCapacitorDataStorageSqlite.isStoreOpen({ database: 'database' });
console.log(result);
```

### `isStoreExists()`

Check if the Store exists.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

const result = await CapgoCapacitorDataStorageSqlite.isStoreExists({ database: 'database' });
console.log(result);
```

### `deleteStore()`

Delete a store.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.deleteStore({
  database: 'database',
  table: 'table',
  encrypted: false,
  mode: 'encryption',
  autoVacuum: 'none',
});
```

### `setTable()`

Set or Add a table to an existing store.

```typescript
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.setTable({ table: 'table' });
```

The table above lists the 22 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-data-storage-sqlite/).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-data-storage-sqlite/)
- [Documentation](/docs/plugins/data-storage-sqlite/)
- [API reference](/docs/plugins/data-storage-sqlite/getting-started/)

## Keep going from Using @capgo/capacitor-data-storage-sqlite

If you are using **Using @capgo/capacitor-data-storage-sqlite** to plan storage and file handling, connect it with [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Getting Started](/docs/plugins/data-storage-sqlite/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file, [Using @capgo/capacitor-file](/plugins/capacitor-file/) for the native capability in Using @capgo/capacitor-file, and [@capgo/capacitor-uploader](/docs/plugins/uploader/) for the implementation detail in @capgo/capacitor-uploader.
