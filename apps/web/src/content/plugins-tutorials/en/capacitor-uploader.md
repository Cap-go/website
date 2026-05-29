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

## Keep going from Using @capgo/capacitor-uploader

If you are using **Using @capgo/capacitor-uploader** to plan migration and enterprise operations, connect it with [@capgo/capacitor-uploader](/docs/plugins/uploader/) for the implementation detail in @capgo/capacitor-uploader, [Getting Started](/docs/plugins/uploader/getting-started/) for the implementation detail in Getting Started, [Capgo Enterprise](/enterprise/) for the product workflow in Capgo Enterprise, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Alternatives](/alternatives/) for the product workflow in Capgo Alternatives.
