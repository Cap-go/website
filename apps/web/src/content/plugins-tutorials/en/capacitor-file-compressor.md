---
locale: en
---
# Using @capgo/capacitor-file-compressor

Capacitor File Compressor Plugin interface for image compression.

## Install

```bash
bun add @capgo/capacitor-file-compressor
bunx cap sync
```

## What This Plugin Exposes

- `compressImage` - Compresses an image file with specified dimensions and quality settings.

## Example Usage

### `compressImage`

Compresses an image file with specified dimensions and quality settings.

```typescript
import { FileCompressor } from '@capgo/capacitor-file-compressor';

// Web - Compress from file input
const fileInput = document.getElementById('file') as HTMLInputElement;
const file = fileInput.files[0];
const result = await FileCompressor.compressImage({
  blob: file,
  quality: 0.8,
  width: 1200,
  mimeType: 'image/jpeg'
});
const url = URL.createObjectURL(result.blob);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-file-compressor/
- Docs: /docs/plugins/file-compressor/
