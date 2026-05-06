---
locale: en
---
# Using @capgo/capacitor-file-sharer

Share and save files from base64 data, data URLs, local file paths, `file://` URLs, Android `content://` URIs, and Capacitor `_capacitor_file_` URLs.

## Install

```bash
bun add @capgo/capacitor-file-sharer
bunx cap sync
```

## What This Plugin Exposes

- `share` - Open the native share sheet on Android and iOS, or download the file on Web.
- `save` - Save to Android public collections, open the iOS save/share sheet, or download on Web.
- `getPluginVersion` - Return the platform implementation version.

## Example Usage

### Share A Generated File

```typescript
import { FileSharer } from '@capgo/capacitor-file-sharer';

await FileSharer.share({
  filename: 'report.pdf',
  contentType: 'application/pdf',
  base64Data: reportBase64,
  title: 'Quarterly report',
  text: 'Attached report',
});
```

### Share A Local File

```typescript
await FileSharer.share({
  filename: 'export.zip',
  contentType: 'application/zip',
  path: fileUri,
});
```

### Save To Downloads On Android

```typescript
const result = await FileSharer.save({
  filename: 'backup.zip',
  contentType: 'application/zip',
  base64Data: zipBase64,
  android: {
    saveDirectory: 'downloads',
    relativePath: 'Download/My App',
  },
});

console.log(result.uri);
```

## Platform Notes

- Android sharing uses `FileProvider`, `ClipData`, and URI grants so chooser previews and thumbnails can read the file.
- Android saves use MediaStore on Android 10+ and public directories on Android 9 and below.
- iOS sharing supports both base64-backed temporary files and direct local path sharing.
- Web sharing and saving downloads the file, with chunked base64 conversion for large files.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-file-sharer/
- Docs: /docs/plugins/file-sharer/
