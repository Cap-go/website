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
