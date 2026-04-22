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
