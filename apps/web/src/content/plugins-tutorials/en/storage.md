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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';
```

## API at a glance

| Method | Description |
| --- | --- |
| `deleteFile` | Delete a file. |
| `getDownloadUrl` | Get the download url for a file. |
| `getMetadata` | Get the metadata for a file. |
| `listFiles` | List files in a directory. |
| `updateMetadata` | Update the metadata for a file. |
| `downloadFile` | Download a file. |
| `uploadFile` | Upload a file. |
| `useEmulator` | Instrument your app to talk to the Cloud Storage emulator. |

## Examples

### `deleteFile()`

Delete a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

await FirebaseStorage.deleteFile({ path: 'mountains.png' });
```

### `getDownloadUrl()`

Get the download url for a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

const result = await FirebaseStorage.getDownloadUrl({ path: 'mountains.png' });
console.log(result);
```

### `getMetadata()`

Get the metadata for a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

const result = await FirebaseStorage.getMetadata({ path: 'mountains.png' });
console.log(result);
```

### `listFiles()`

List files in a directory.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

const result = await FirebaseStorage.listFiles({ path: 'path/to/file' });
console.log(result);
```

### `updateMetadata()`

Update the metadata for a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

await FirebaseStorage.updateMetadata({
  path: 'path/to/file',
  metadata: {},
});
```

### `downloadFile()`

Download a file.

```typescript
import { FirebaseStorage } from '@capgo/capacitor-firebase-storage';

const result = await FirebaseStorage.downloadFile({ path: 'mountains.png' }, (event, error) => {
  console.log(event);
});
console.log(result);
```

The [API reference](/docs/plugins/firebase-storage/getting-started/) covers the other 2 methods.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/storage)
- [Documentation](/docs/plugins/firebase-storage/)
- [API reference](/docs/plugins/firebase-storage/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-storage

If you are using **Using @capgo/capacitor-firebase-storage** to plan storage and file handling, connect it with [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file, [Using @capgo/capacitor-file](/plugins/capacitor-file/) for the native capability in Using @capgo/capacitor-file, and [@capgo/capacitor-uploader](/docs/plugins/uploader/) for the implementation detail in @capgo/capacitor-uploader.
