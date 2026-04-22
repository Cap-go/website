---
locale: en
---
# Using @capgo/capacitor-zip

Capacitor Zip Plugin for compressing and extracting zip archives.

## Install

```bash
bun add @capgo/capacitor-zip
bunx cap sync
```

## What This Plugin Exposes

- `zip` - Compress a file or directory to create a ZIP archive.
- `unzip` - Extract a ZIP archive to a specified destination directory.

## Example Usage

### `zip`

Compress a file or directory to create a ZIP archive.

```typescript
import { CapacitorZip } from '@capgo/capacitor-zip';

// Compress a directory without password
await CapacitorZip.zip({
  source: '/path/to/my-folder',
  destination: '/path/to/output.zip'
});
```

### `unzip`

Extract a ZIP archive to a specified destination directory.

```typescript
import { CapacitorZip } from '@capgo/capacitor-zip';

// Extract a standard ZIP archive
await CapacitorZip.unzip({
  source: '/path/to/archive.zip',
  destination: '/path/to/extract-folder'
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-zip/
- Docs: /docs/plugins/zip/
