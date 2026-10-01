---
slug: capacitor-file-handling-guide
title: "Capacitor File Handling Guide: Read, Write, Pick, Share"
description: "Capacitor file handling guide: read and write files, choose directories, pick, display, open, share, download and upload files on iOS and Android."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Reading, writing, and sharing files in a Capacitor mobile app"
keywords: capacitor file handling, capacitor filesystem, capacitor read file, capacitor write file, capacitor file picker, capacitor download file, capacitor upload file, capacitor convertFileSrc, ionic file storage
tag: Guides, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I read and write files in Capacitor?"
    answer: "Use @capacitor/filesystem. Filesystem.writeFile({ path, data, directory }) writes text (with encoding: Encoding.UTF8) or binary data (base64 without an encoding), and Filesystem.readFile({ path, directory }) reads it back. Pick a Directory such as Data, Cache or LibraryNoCloud depending on how long the file should live."
  - question: "How do I show a local file in an img or video tag?"
    answer: "Get the native path with Filesystem.getUri, then pass it to Capacitor.convertFileSrc(). The result is a URL served by the Capacitor local server that the WebView can load without converting the file to base64."
  - question: "Is Filesystem.downloadFile deprecated?"
    answer: "Yes. In @capacitor/filesystem 8, downloadFile and its progress listener are deprecated in favor of the @capacitor/file-transfer plugin, which also handles uploads with progress events."
  - question: "Why do large files crash my Capacitor app?"
    answer: "Reading or writing a large file in one call moves the whole content through the bridge as a base64 string, which can use several times the file size in memory. Use Filesystem.readFileInChunks to move the file in smaller base64 chunks, or skip base64 entirely with native download and upload plugins or fetch with Capacitor.convertFileSrc."
  - question: "Do I need storage permissions to save files?"
    answer: "Not for your app's own directories (Data, Cache, Library, External). Storage permissions only matter for shared storage on Android 9 and older. On Android 10+, save user-visible files through MediaStore or the system file picker instead."
---

Capacitor file handling comes down to a few building blocks: `@capacitor/filesystem` to read and write files in app directories, `Capacitor.convertFileSrc` to display them, a picker to import user files, and native plugins to download, upload, open and share. This guide shows each one with Capacitor 8 code, explains which directory to use on iOS and Android, and covers the memory and permission traps that cause most file bugs.

## The file handling toolbox

| Task | Plugin |
| --- | --- |
| Read, write, list, copy, delete in app storage | `@capacitor/filesystem` |
| Show a local file in `<img>`, `<video>`, `<iframe>` | `Capacitor.convertFileSrc` (core) |
| Let the user pick files or a folder | [`@capgo/capacitor-file-picker`](/plugins/capacitor-file-picker/) |
| Download with progress | `@capacitor/file-transfer` or [`@capgo/capacitor-downloader`](/plugins/capacitor-downloader/) for background, pausable downloads |
| Upload with progress | `@capacitor/file-transfer` or [`@capgo/capacitor-uploader`](/plugins/capacitor-uploader/) for background uploads |
| Share a file or save it to Downloads | [`@capgo/capacitor-file-sharer`](/plugins/capacitor-file-sharer/) or `@capacitor/share` |
| Open a file in another app | `@capacitor-community/file-opener` |
| Compress images | [`@capgo/capacitor-file-compressor`](/plugins/capacitor-file-compressor/) |
| Zip and unzip | [`@capgo/capacitor-zip`](/plugins/capacitor-zip/) |

Install the core plugin first:

```bash
bun add @capacitor/filesystem
bunx cap sync
```

## Choose the right directory

Every Filesystem call takes a `directory`. Picking the wrong one is the most common cause of lost files and rejected apps.

| `Directory` | iOS location | Android location | Backed up | Use for |
| --- | --- | --- | --- | --- |
| `Data` | `Documents` | App files dir (`/data/data/<pkg>/files`) | iOS iCloud, Android Auto Backup | User data the app owns |
| `Documents` | `Documents` (same as `Data`) | Public `Documents` folder | Yes | Avoid on Android 11+, see below |
| `Library` | `Library` | App files dir | iOS yes | App support files, databases |
| `LibraryNoCloud` | `Library/NoCloud` | App files dir | No | Large, re-downloadable content |
| `Cache` | `Library/Caches` | App cache dir | No | Temporary files, can be wiped by the OS |
| `External` | `Documents` | App external files dir | No | Large app files on Android, deleted on uninstall |
| `ExternalStorage` | `Documents` | Root of shared storage | n/a | Legacy only, not accessible on Android 11+ |

Rules of thumb:

- **Large re-downloadable media** (offline videos, map tiles) goes in `LibraryNoCloud`. Apple rejects apps that put large re-downloadable content in iCloud-backed folders, as described in its iOS Data Storage Guidelines.
- **Temporary files** (exports you share once, thumbnails) go in `Cache`. Never store the only copy of user data there.
- **Files the user should find later outside your app** do not belong in an app directory at all. Save them through the share sheet, MediaStore Downloads, or the system file picker. See our guide to [Android scoped storage in Capacitor](/blog/android-scoped-storage-in-capacitor-apps/).

## Write a file

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Text file
await Filesystem.writeFile({
  path: 'notes/today.txt',
  data: 'Hello from Capacitor',
  directory: Directory.Data,
  encoding: Encoding.UTF8,
  recursive: true, // create notes/ if missing
});

// JSON
await Filesystem.writeFile({
  path: 'settings.json',
  data: JSON.stringify({ theme: 'dark' }),
  directory: Directory.Data,
  encoding: Encoding.UTF8,
});

// Binary file: pass base64 and no encoding
await Filesystem.writeFile({
  path: 'images/logo.png',
  data: base64Png,
  directory: Directory.Data,
  recursive: true,
});
```

The `encoding` option decides how `data` is interpreted. With `Encoding.UTF8`, the string is written as text. Without it, native platforms decode `data` as base64 and write raw bytes. Forgetting this is the classic "my PDF is corrupt" bug.

To add to an existing file, such as a log, use `appendFile` with the same options.

## Read a file

```typescript
const { data } = await Filesystem.readFile({
  path: 'settings.json',
  directory: Directory.Data,
  encoding: Encoding.UTF8,
});
const settings = JSON.parse(data as string);

// Binary: returns base64 on native, a Blob on web
const image = await Filesystem.readFile({
  path: 'images/logo.png',
  directory: Directory.Data,
});
```

Check whether a file exists with `stat`, which rejects when the file is missing:

```typescript
async function exists(path: string) {
  try {
    await Filesystem.stat({ path, directory: Directory.Data });
    return true;
  } catch {
    return false;
  }
}
```

### Read large files in chunks

`readFile` returns the whole file as one base64 string. For a 200 MB video that means hundreds of MB of strings in JS memory. `readFileInChunks` streams it instead:

```typescript
await Filesystem.readFileInChunks(
  { path: 'videos/clip.mp4', directory: Directory.Data, chunkSize: 1024 * 1024 },
  (chunk, err) => {
    if (err) return console.error(err);
    if (chunk === null) return console.log('done');
    processChunk(chunk.data); // base64 chunk
  },
);
```

Better still, avoid moving the bytes through JS at all. Most "read a big file" tasks are really "upload it" or "display it", and both have native paths below.

## List, copy, move and delete

```typescript
const { files } = await Filesystem.readdir({ path: 'notes', directory: Directory.Data });
for (const f of files) console.log(f.name, f.type, f.size, f.mtime);

await Filesystem.mkdir({ path: 'archive', directory: Directory.Data, recursive: true });

await Filesystem.copy({
  from: 'notes/today.txt',
  to: 'archive/today.txt',
  directory: Directory.Data,
});

await Filesystem.rename({
  from: 'archive/today.txt',
  to: 'archive/2026-10-01.txt',
  directory: Directory.Data,
});

await Filesystem.deleteFile({ path: 'notes/today.txt', directory: Directory.Data });
await Filesystem.rmdir({ path: 'notes', directory: Directory.Data, recursive: true });
```

`copy` and `rename` accept `toDirectory` to move between directories, for example from `Cache` to `Data` after a download completes. They also accept absolute `file://` paths when you omit `directory`, which is how you import files returned by other plugins.

## Display a file in the WebView

Never load images or videos as base64 data URLs if you can avoid it. Convert the native path to a URL served by Capacitor's local server:

```typescript
import { Capacitor } from '@capacitor/core';

const { uri } = await Filesystem.getUri({ path: 'images/logo.png', directory: Directory.Data });
img.src = Capacitor.convertFileSrc(uri);
```

On iOS the result looks like `capacitor://localhost/_capacitor_file_/...`, on Android `https://localhost/_capacitor_file_/...`. It works for `<img>`, `<video>`, `<audio>`, and `fetch()`, which means you can also read a file as an `ArrayBuffer` without base64:

```typescript
const buffer = await fetch(Capacitor.convertFileSrc(uri)).then((r) => r.arrayBuffer());
```

Store paths, not converted URLs. The converted form is only valid for the current app session.

## Pick files from the device

The system picker gives the user control and needs no storage permission on Android 13+ or iOS:

```bash
bun add @capgo/capacitor-file-picker
bunx cap sync
```

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const { files } = await CapgoFilePicker.pickFiles({
  types: ['application/pdf', 'image/*'],
  limit: 5,
  readData: false, // keep false for anything bigger than a few MB
});

for (const file of files) {
  console.log(file.name, file.mimeType, file.size, file.path);
}
```

There are also `pickImages`, `pickVideos`, `pickMedia` and `pickDirectory`, plus `convertHeicToJpeg` on iOS. On iOS, `types` only accepts MIME types, not extensions.

Picked files may live in a temporary location or behind a `content://` URI that only stays readable for a while. If you need the file later, copy it into your own directory right away with `Filesystem.copy`.

## Download files

### With progress: @capacitor/file-transfer

`Filesystem.downloadFile` is deprecated in Filesystem 8. The replacement streams the response straight to disk:

```bash
bun add @capacitor/file-transfer
bunx cap sync
```

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Directory, Filesystem } from '@capacitor/filesystem';

const { uri } = await Filesystem.getUri({ path: 'downloads/report.pdf', directory: Directory.Data });

const listener = await FileTransfer.addListener('progress', (p) => {
  if (p.lengthComputable) setProgress(p.bytes / p.contentLength);
});

await FileTransfer.downloadFile({
  url: 'https://example.com/report.pdf',
  path: uri,
  progress: true,
  headers: { Authorization: `Bearer ${token}` },
});

await listener.remove();
```

### In the background: @capgo/capacitor-downloader

For large files that should keep downloading when the user leaves the app, and that can be paused and resumed, use the Capgo downloader, which relies on `DownloadManager` on Android and background `URLSession` on iOS:

```typescript
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

await CapacitorDownloader.addListener('downloadProgress', ({ id, progress }) => {
  console.log(id, progress);
});
await CapacitorDownloader.addListener('downloadCompleted', ({ id }) => {
  console.log('done', id);
});

await CapacitorDownloader.download({
  id: 'course-video-12',
  url: 'https://cdn.example.com/course/12.mp4',
  destination: 'videos/12.mp4',
  network: 'wifi-only',
  notification: 'progress', // Android
});
```

A relative `destination` resolves to the app's external files directory on Android and the `Documents` directory on iOS, the same places as `Directory.External`.

## Upload files

Do not read a file into base64 just to send it. Both upload options read from disk natively:

```typescript
import { FileTransfer } from '@capacitor/file-transfer';

const result = await FileTransfer.uploadFile({
  url: 'https://api.example.com/upload',
  path: uri,          // full file:// path
  fileKey: 'file',
  mimeType: 'application/pdf',
  headers: { Authorization: `Bearer ${token}` },
  progress: true,
});
console.log(result.responseCode, result.bytesSent);
```

For uploads that must survive the app going to the background (videos, batch photo uploads), use `@capgo/capacitor-uploader`, which runs on a background `URLSession` on iOS and an upload service with a progress notification on Android:

```typescript
import { Uploader } from '@capgo/capacitor-uploader';

const { id } = await Uploader.startUpload({
  filePath: uri,
  serverUrl: 'https://api.example.com/upload',
  method: 'PUT', // binary body, ideal for presigned S3 or R2 URLs
  mimeType: 'video/mp4',
});
```

Presigned `PUT` URLs to object storage are the most reliable pattern for large files: your API signs the URL, and the device uploads straight to storage.

## Share or export a file

To let the user send a file to another app or save it where they can find it:

```typescript
import { FileSharer } from '@capgo/capacitor-file-sharer';

await FileSharer.share({
  filename: 'report.pdf',
  path: uri,
  contentType: 'application/pdf',
});

// Android: write to Downloads via MediaStore. iOS: opens the share sheet ("Save to Files")
await FileSharer.save({
  filename: 'report.pdf',
  path: uri,
  contentType: 'application/pdf',
});
```

The Capgo file sharer copies the file into its own cache folder and serves it through a dedicated `FileProvider`, so you do not need to edit `file_paths.xml`. With the official `@capacitor/share`, Android can only share from the cache folder unless you add other folders to `android/app/src/main/res/xml/file_paths.xml`.

## Open a file in another app

```bash
bun add @capacitor-community/file-opener
bunx cap sync
```

```typescript
import { FileOpener } from '@capacitor-community/file-opener';

await FileOpener.open({ filePath: uri, contentType: 'application/pdf' });
```

On iOS this opens a Quick Look preview. On Android it opens the default app for the MIME type or shows a chooser. If no app can handle the type, the call rejects, so catch it and offer sharing instead.

## Common file recipes

**Generate a PDF**: render HTML with [`@capgo/capacitor-pdf-generator`](/plugins/capacitor-pdf-generator/) or build it in JS with `pdf-lib`, then write the base64 output with `writeFile`. Our [scan to PDF tutorial](/blog/how-to-scan-a-document-to-pdf-in-a-capacitor-app/) shows the full flow.

**Strip GPS from a photo before upload**: `@capgo/capacitor-file-compressor` removes EXIF metadata on every platform while resizing.

**Resize or convert an image**: the same compressor handles width, height, quality and output format, including HEIC to JPEG.

**Bundle many files**: zip a folder with `@capgo/capacitor-zip` and upload one archive instead of hundreds of requests.

## Web support

`@capacitor/filesystem` works on the web using IndexedDB, so your code runs in the browser during development. Differences to keep in mind: binary reads return a `Blob`, files only live in the browser profile, and storage quotas are much lower. For web builds, prefer `URL.createObjectURL(blob)` for display.

## Troubleshooting

**"File does not exist"**: you mixed directories, or passed an absolute path together with a `directory`. Use one or the other.

**Corrupted binary files**: you wrote base64 with `Encoding.UTF8`. Remove the encoding.

**App crashes with large files**: base64 through the bridge. Use chunks, file-transfer, or `fetch(convertFileSrc(uri))`.

**Image does not display on Android**: you used a `file://` URL directly. Convert it with `Capacitor.convertFileSrc`.

**`Failed to find configured root` when sharing on Android**: the file is outside the paths in `file_paths.xml`. Use the Capgo file sharer or copy to `Cache` first.

**Files disappear on iOS**: they were in `Cache`, which iOS clears under storage pressure.

**App Store rejection for iCloud storage**: large downloadable content in `Data` or `Documents`. Move it to `LibraryNoCloud`.

## Next steps

Most file logic, such as where you store things, retry rules and naming, lives in JavaScript and can be adjusted with [Capgo live updates](/live-update/) after release. For the Android side of shared storage and permissions, continue with our [scoped storage guide](/blog/android-scoped-storage-in-capacitor-apps/), and see the [file picker docs](/docs/plugins/file-picker/) for every picker option.
