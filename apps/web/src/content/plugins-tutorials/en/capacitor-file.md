---
locale: en
---
# Using @capgo/capacitor-file

Capacitor File Plugin Implements file system operations similar to the Cordova File plugin.

## Install

```bash
bun add @capgo/capacitor-file
bunx cap sync
```

## What This Plugin Exposes

- `requestFileSystem` - Request a file system.
- `resolveLocalFileSystemURL` - Resolve a file URL to an entry.
- `getFile` - Get a file entry.
- `getDirectory` - Get a directory entry.

## Example Usage

### `requestFileSystem`

Request a file system.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

await CapacitorFile.requestFileSystem({} as RequestFileSystemOptions);
```

### `resolveLocalFileSystemURL`

Resolve a file URL to an entry.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

await CapacitorFile.resolveLocalFileSystemURL({} as ResolveURLOptions);
```

### `getFile`

Get a file entry.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

await CapacitorFile.getFile({} as GetFileOptions);
```

### `getDirectory`

Get a directory entry.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

await CapacitorFile.getDirectory({} as GetDirectoryOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-file/
- Docs: /docs/plugins/file/

## Keep going from Using @capgo/capacitor-file

If you are using **Using @capgo/capacitor-file** to plan storage and file handling, connect it with [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file, [Getting Started](/docs/plugins/file/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, and [@capgo/capacitor-uploader](/docs/plugins/uploader/) for the implementation detail in @capgo/capacitor-uploader.
