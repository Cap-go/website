---
locale: en
---
# Using @capgo/capacitor-uploader

Capacitor Uploader Plugin for uploading files with background support and progress tracking.

## Install

```bash
bun add @capgo/capacitor-uploader
bunx cap sync
```

## What This Plugin Exposes

- `startUpload` - Start uploading a file to a server.
- `removeUpload` - Cancel and remove an ongoing upload.

## Example Usage

### `startUpload`

Start uploading a file to a server.

```typescript
import { Uploader } from '@capgo/capacitor-uploader';

const { id } = await Uploader.startUpload({
  filePath: 'file:///path/to/file.jpg',
  serverUrl: 'https://example.com/upload',
  headers: {
    'Authorization': 'Bearer token'
  },
  method: 'POST',
  uploadType: 'multipart',
  fileField: 'photo'
});
console.log('Upload started with ID:', id);
```

### `removeUpload`

Cancel and remove an ongoing upload.

```typescript
import { Uploader } from '@capgo/capacitor-uploader';

await Uploader.removeUpload({ id: 'upload-123' });
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-uploader/
- Docs: /docs/plugins/uploader/
