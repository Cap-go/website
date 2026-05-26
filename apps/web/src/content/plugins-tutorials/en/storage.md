---
locale: en
---
# Using @capgo/capacitor-firebase-storage

Capacitor plugin for Firebase Cloud Storage.

## Install

```bash
bun add @capgo/capacitor-firebase-storage
bunx cap sync
```

## What This Plugin Exposes

- `deleteFile` - Delete a file.
- `getDownloadUrl` - Get the download url for a file.
- `getMetadata` - Get the metadata for a file.
- `listFiles` - List files in a directory.

## Example Usage

### `deleteFile`

Delete a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

await FirebaseStorage.deleteFile({} as DeleteFileOptions);
```

### `getDownloadUrl`

Get the download url for a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

await FirebaseStorage.getDownloadUrl({} as GetDownloadUrlOptions);
```

### `getMetadata`

Get the metadata for a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

await FirebaseStorage.getMetadata({} as GetMetadataOptions);
```

### `listFiles`

List files in a directory.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

await FirebaseStorage.listFiles({} as ListFilesOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/storage
- Docs: /docs/plugins/firebase-storage/

## Keep going from Using @capgo/capacitor-firebase-storage

If you are using **Using @capgo/capacitor-firebase-storage** to plan storage and file handling, connect it with [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file, [Using @capgo/capacitor-file](/plugins/capacitor-file/) for the native capability in Using @capgo/capacitor-file, and [@capgo/capacitor-uploader](/docs/plugins/uploader/) for the implementation detail in @capgo/capacitor-uploader.
