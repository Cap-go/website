---
locale: en
---
# Using @capgo/capacitor-file-picker

Capacitor File Picker Plugin interface for selecting files, images, videos, and directories.

## Install

```bash
bun add @capgo/capacitor-file-picker
bunx cap sync
```

## What This Plugin Exposes

- `pickFiles` - Pick one or more files from the device.
- `pickImages` - Pick one or more images from the gallery. Android/iOS only.
- `pickVideos` - Pick one or more videos from the gallery. Android/iOS only.
- `pickMedia` - Pick one or more images or videos from the gallery. Android/iOS only.

## Example Usage

### `pickFiles`

Pick one or more files from the device.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickFiles({
  types: ['application/pdf', 'image/*'],
  limit: 5,
  readData: false
});
console.log('Picked files:', result.files);
```

### `pickImages`

Pick one or more images from the gallery. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickImages({
  limit: 10,
  readData: false
});
console.log('Picked images:', result.files);
```

### `pickVideos`

Pick one or more videos from the gallery. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickVideos({
  limit: 3,
  skipTranscoding: true
});
console.log('Picked videos:', result.files);
```

### `pickMedia`

Pick one or more images or videos from the gallery. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickMedia({
  limit: 5,
  readData: true
});
console.log('Picked media:', result.files);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-file-picker/
- Docs: /docs/plugins/file-picker/

## Keep going from Using @capgo/capacitor-file-picker

If you are using **Using @capgo/capacitor-file-picker** to plan storage and file handling, connect it with [@capgo/capacitor-file-picker](/docs/plugins/file-picker/) for the implementation detail in @capgo/capacitor-file-picker, [Getting Started](/docs/plugins/file-picker/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, and [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file.
