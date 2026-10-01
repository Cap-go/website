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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';
```

## API at a glance

| Method | Description |
| --- | --- |
| `requestFileSystem` | Request a file system. |
| `resolveLocalFileSystemURL` | Resolve a file URL to an entry. |
| `getFile` | Get a file entry. |
| `getDirectory` | Get a directory entry. |
| `readFile` | Read a file as text or base64. |
| `readAsDataURL` | Read a file as a data URL (base64 with MIME type prefix). |
| `writeFile` | Write data to a file. |
| `appendFile` | Append data to a file. |
| `deleteFile` | Delete a file. |
| `mkdir` | Create a directory. |
| `rmdir` | Delete a directory. |
| `readdir` | Read directory contents. |
| `stat` | Get metadata about a file or directory. |
| `getMetadata` | Get metadata about a file or directory. Alias for stat(). |
| `rename` | Rename or move a file or directory. |
| `move` | Move a file or directory. Alias for rename(). |
| `copy` | Copy a file or directory. |
| `exists` | Check if a file or directory exists. |
| `getUri` | Get the URI for a file. |
| `truncate` | Truncate a file to a specified size. |
| `getDirectories` | Get all known file system directories. |
| `getFreeDiskSpace` | Get the free disk space in bytes. |
| `checkPermissions` | Check the current permission status for file operations. On Android, this checks for external storage permissions. On iOS and web, this always returns 'granted' as no special permissions are needed. |
| `requestPermissions` | Request permissions for file operations. On Android, this requests external storage permissions needed for accessing files outside the app's private directories. On iOS and web, this always returns 'granted' as no special permissions are needed. |

## Examples

### `requestFileSystem()`

Request a file system.

```typescript
import { CapacitorFile, FileSystemType } from '@capgo/capacitor-file';

const result = await CapacitorFile.requestFileSystem({ type: FileSystemType.TEMPORARY });
console.log(result);
```

### `resolveLocalFileSystemURL()`

Resolve a file URL to an entry.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

const result = await CapacitorFile.resolveLocalFileSystemURL({ url: 'https://example.com' });
console.log(result);
```

### `getFile()`

Get a file entry.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

const result = await CapacitorFile.getFile({ path: 'path/to/file' });
console.log(result);
```

### `getDirectory()`

Get a directory entry.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

const result = await CapacitorFile.getDirectory({ path: 'path/to/file' });
console.log(result);
```

### `readFile()`

Read a file as text or base64.

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

const result = await CapacitorFile.readFile({ path: 'path/to/file' });
console.log(result);
```

### `readAsDataURL()`

Read a file as a data URL (base64 with MIME type prefix).

```typescript
import { CapacitorFile } from '@capgo/capacitor-file';

const result = await CapacitorFile.readAsDataURL({ path: 'path/to/file' });
console.log(result);
```

The table above lists all 24 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-file/) for the full contract of each one.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorFile.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-file/)
- [Documentation](/docs/plugins/file/)
- [API reference](/docs/plugins/file/getting-started/)

## Keep going from Using @capgo/capacitor-file

If you are using **Using @capgo/capacitor-file** to plan storage and file handling, connect it with [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file, [Getting Started](/docs/plugins/file/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, and [@capgo/capacitor-uploader](/docs/plugins/uploader/) for the implementation detail in @capgo/capacitor-uploader.
