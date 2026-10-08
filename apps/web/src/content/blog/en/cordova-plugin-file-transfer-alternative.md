---
slug: cordova-plugin-file-transfer-alternative
title: "cordova-plugin-file-transfer Alternative for Capacitor"
description: "Replace cordova-plugin-file-transfer in Capacitor apps: @capacitor/file-transfer for simple transfers, Capgo uploader and downloader for background jobs."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a file transfer plugin guide"
keywords: cordova-plugin-file-transfer alternative, capacitor file transfer, capacitor upload file, capacitor download file, background upload capacitor, @capacitor/file-transfer, @capgo/capacitor-uploader
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Is cordova-plugin-file-transfer deprecated?"
    answer: "Apache announced in 2017 that it planned to deprecate it in favor of XMLHttpRequest Level 2, but the plugin is not marked deprecated on npm and received releases in 2023 (2.0.0) and August 2026 (2.0.1). In Capacitor apps it still depends on cordova-plugin-file and file:// paths, so native Capacitor plugins are the better fit."
  - question: "What should I use instead of cordova-plugin-file-transfer in Capacitor?"
    answer: "Use @capacitor/file-transfer for foreground uploads and downloads with progress. Use @capgo/capacitor-uploader and @capgo/capacitor-downloader when transfers must continue in the background, be retried, paused or resumed."
  - question: "Why not just use fetch or XMLHttpRequest?"
    answer: "Web requests load the whole file into WebView memory as a Blob or ArrayBuffer and pass it across the bridge. Large videos or archives can crash the WebView, and requests stop when the app is suspended. Native transfers stream from and to disk."
  - question: "Can I cancel or pause a transfer?"
    answer: "@capacitor/file-transfer has no cancel method. @capgo/capacitor-uploader can cancel with removeUpload, and @capgo/capacitor-downloader supports pause, resume and stop."
  - question: "Do transfers continue if the user closes the app?"
    answer: "Capgo's uploader uses a background URLSession on iOS and a foreground upload service with a notification on Android, and the downloader uses the platform background download APIs, so transfers can continue after the app is backgrounded. @capacitor/file-transfer runs while the app is active."
---

The best cordova-plugin-file-transfer alternative for a Capacitor app depends on one question: does the transfer need to survive the app going to the background? For normal uploads and downloads with progress, use the official [`@capacitor/file-transfer`](https://capacitorjs.com/docs/apis/file-transfer) plugin. For large files, flaky networks, or transfers that must keep going when the user switches apps, use [`@capgo/capacitor-uploader`](/plugins/capacitor-uploader/) and [`@capgo/capacitor-downloader`](/plugins/capacitor-downloader/), which run on native background transfer APIs. This guide compares them and maps every `FileTransfer` call.

## Is cordova-plugin-file-transfer still deprecated?

The history is confusing, so here are the facts:

- In 2017 the Apache Cordova team announced it planned to deprecate the plugin and pointed developers to `XMLHttpRequest` Level 2.
- The plugin was never flagged as deprecated on npm. Version 2.0.0 shipped in September 2023, and 2.0.1 in August 2026. The GitHub repository is active.

So it is not dead. But in a Capacitor app it is still a Cordova plugin that:

- depends on `cordova-plugin-file` and its `cdvfile://` and `file://` path model,
- does not fit Capacitor's `Filesystem` directories and URI conversions,
- has no background transfer support,
- uses callback style APIs.

If you are migrating from Cordova, replacing it with native Capacitor plugins removes one of the last reasons to keep `cordova-plugin-file`.

## Why "just use fetch" breaks on large files

Apache's suggested replacement, XHR, works for small JSON and images. It fails for real file transfer work in a hybrid app:

- **Memory.** `fetch` and XHR give you a `Blob` or `ArrayBuffer` in the WebView. A 500 MB video means 500 MB in WebView memory, then a copy to write it through the bridge. On mid-range Android devices that crashes the renderer.
- **Suspension.** When the user switches apps, iOS suspends the WebView. In-flight requests stall or fail.
- **No OS integration.** No system download notification, no Wi-Fi only option, no resume after a dropped connection.

Native plugins stream directly between disk and network and keep JavaScript out of the data path.

## The options compared

| Need | cordova-plugin-file-transfer | @capacitor/file-transfer | @capgo/capacitor-uploader | @capgo/capacitor-downloader |
| --- | --- | --- | --- | --- |
| Download to disk | Yes | Yes | No | Yes |
| Upload from disk | Yes | Yes | Yes | No |
| Progress events | Yes | Yes (`progress` listener) | Yes (`events`) | Yes (`downloadProgress`) |
| Multipart form data | Yes | Yes (default) | Yes | n/a |
| Raw binary PUT (presigned URLs) | Yes | Yes (set `Content-Type`) | Yes (`uploadType: 'binary'`) | n/a |
| Multiple files in one request | No | No | Yes (`files`) | n/a |
| Cancel | `abort()` | No | `removeUpload` | `stop` |
| Pause / resume | No | No | No | `pause`, `resume` |
| Retries | No | No | `maxRetries` | No |
| Continues in background | No | While the app is active | Yes | Yes |
| Wi-Fi only | No | No | No | `network: 'wifi-only'` |
| HTTP error details | `http_status`, `body` | `httpStatus`, `body` | Status code in events | Error string in events |
| Web implementation | No | Yes | Yes (fetch based) | No |

Most apps end up with `@capacitor/file-transfer` for small, user-visible transfers and the Capgo plugins for media upload queues and offline content downloads.

## Option 1: @capacitor/file-transfer

```bash
bun add @capacitor/file-transfer @capacitor/filesystem
bunx cap sync
```

The plugin needs a full native path. Get it from `@capacitor/filesystem`.

### Download

```ts
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

export async function downloadReport(url: string) {
  const { uri } = await Filesystem.getUri({
    directory: Directory.Data,
    path: 'reports/latest.pdf',
  });

  const progress = await FileTransfer.addListener('progress', (p) => {
    if (p.type === 'download' && p.lengthComputable) {
      console.log(`Downloaded ${Math.round((p.bytes / p.contentLength) * 100)}%`);
    }
  });

  try {
    const result = await FileTransfer.downloadFile({
      url,
      path: uri,
      progress: true,
      headers: { Authorization: 'Bearer <token>' },
    });
    return result.path;
  } catch (error: any) {
    if (error.code === 'OS-PLUG-FLTR-0010') {
      console.error('HTTP error', error.data?.httpStatus, error.data?.body);
    }
    throw error;
  } finally {
    await progress.remove();
  }
}
```

### Upload

```ts
export async function uploadAvatar(path: string) {
  const result = await FileTransfer.uploadFile({
    url: 'https://api.example.com/v1/avatar',
    path,
    fileKey: 'avatar',
    mimeType: 'image/jpeg',
    headers: { Authorization: 'Bearer <token>' },
    progress: true,
  });
  console.log(result.responseCode, result.response);
}
```

Uploads are multipart by default. For a raw stream, for example to a presigned S3 URL, set `method: 'PUT'` and an explicit `Content-Type` header such as `application/octet-stream`.

Error codes follow the `OS-PLUG-FLTR-XXXX` format. The useful ones: `0007` file not found, `0008` connection failed, `0010` HTTP error status with `httpStatus` and `body` in `error.data`.

## Option 2: background uploads with @capgo/capacitor-uploader

```bash
bun add @capgo/capacitor-uploader
bunx cap sync
```

```ts
import { Uploader } from '@capgo/capacitor-uploader';

await Uploader.addListener('events', async (event) => {
  switch (event.name) {
    case 'uploading':
      console.log(event.id, `${event.payload.percent}%`);
      break;
    case 'completed':
      console.log(event.id, 'done', event.payload.statusCode);
      break;
    case 'failed':
      console.error(event.id, event.payload.error);
      break;
  }
  // Completed and failed events are cached natively until acknowledged
  if (event.eventId) {
    await Uploader.acknowledgeEvent({ eventId: event.eventId });
  }
});

const { id } = await Uploader.startUpload({
  filePath: 'file:///path/to/video.mp4',
  serverUrl: 'https://api.example.com/v1/videos',
  method: 'POST',
  uploadType: 'multipart',
  fileField: 'video',
  parameters: { albumId: '7' },
  headers: { Authorization: 'Bearer <token>' },
  maxRetries: 3,
  notificationTitle: 'Uploading video', // Android only
});
```

For presigned URLs, use `method: 'PUT'`, which defaults to a binary body:

```ts
await Uploader.startUpload({
  filePath,
  serverUrl: presignedUrl,
  method: 'PUT',
  headers: { 'Content-Type': 'video/mp4' },
  mimeType: 'video/mp4',
});
```

Several files in one multipart request:

```ts
await Uploader.startUpload({
  serverUrl: 'https://api.example.com/v1/photos',
  method: 'POST',
  uploadType: 'multipart',
  files: [
    { filePath: photo1, fieldName: 'images[]', mimeType: 'image/jpeg' },
    { filePath: photo2, fieldName: 'images[]', mimeType: 'image/jpeg' },
  ],
  headers: { Authorization: 'Bearer <token>' },
});
```

Cancel with `Uploader.removeUpload({ id })`.

**Why acknowledge events?** Completed and failed events are stored in a persistent native cache, so they can be delivered again if the app was closed or backgrounded before it handled them. Acknowledging removes the event so it is not re-broadcast the next time the plugin initializes.

**iOS setup.** The uploader uses a background `URLSession`. Many apps need no extra setup. If uploads must continue after the app is suspended, add `fetch` to `UIBackgroundModes`. Do not add `processing` unless another feature uses `BGTaskScheduler`, because App Store Connect rejects builds that declare it without `BGTaskSchedulerPermittedIdentifiers`.

## Option 3: background downloads with @capgo/capacitor-downloader

```bash
bun add @capgo/capacitor-downloader
bunx cap sync
```

```ts
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

await CapacitorDownloader.addListener('downloadProgress', ({ id, progress }) => {
  console.log(id, `${progress}%`);
});
await CapacitorDownloader.addListener('downloadCompleted', ({ id }) => {
  console.log(id, 'completed');
});
await CapacitorDownloader.addListener('downloadFailed', ({ id, error }) => {
  console.error(id, error);
});

await CapacitorDownloader.download({
  id: 'course-42',
  url: 'https://cdn.example.com/courses/42.zip',
  destination: 'courses/42.zip',
  headers: { Authorization: 'Bearer <token>' },
  network: 'wifi-only',
  priority: 'normal',
  notification: 'progress', // Android: remove the system notification when done
});

// Later
await CapacitorDownloader.pause({ id: 'course-42' });
await CapacitorDownloader.resume({ id: 'course-42' });
const status = await CapacitorDownloader.checkStatus({ id: 'course-42' });
console.log(status.state, status.progress);
```

A relative `destination` resolves to the app's Documents directory on iOS and the app-specific external files directory on Android. You can also pass an absolute path or a `file://` URL. Use `getFileInfo({ path })` to read size and MIME type after download, and `stop({ id })` to cancel and delete partial data.

## Migrating from cordova-plugin-file-transfer

### Download

```js
// Before
const ft = new FileTransfer();
ft.onprogress = (e) => e.lengthComputable && setProgress(e.loaded / e.total);
ft.download(
  encodeURI(url),
  cordova.file.dataDirectory + 'report.pdf',
  (entry) => console.log(entry.toURL()),
  (err) => console.error(err.code, err.http_status),
  false,
  { headers: { Authorization: 'Bearer <token>' } },
);
```

```ts
// After
const { uri } = await Filesystem.getUri({ directory: Directory.Data, path: 'report.pdf' });
await FileTransfer.downloadFile({
  url,
  path: uri,
  progress: true,
  headers: { Authorization: 'Bearer <token>' },
});
```

### Upload

```js
// Before
const options = new FileUploadOptions();
options.fileKey = 'file';
options.fileName = 'photo.jpg';
options.mimeType = 'image/jpeg';
options.params = { albumId: '7' };
options.headers = { Authorization: 'Bearer <token>' };
new FileTransfer().upload(fileUrl, encodeURI(serverUrl), onSuccess, onError, options);
```

```ts
// After, foreground
await FileTransfer.uploadFile({
  url: serverUrl,
  path: fileUrl,
  fileKey: 'file',
  mimeType: 'image/jpeg',
  params: { albumId: '7' },
  headers: { Authorization: 'Bearer <token>' },
});

// After, background
await Uploader.startUpload({
  filePath: fileUrl,
  serverUrl,
  uploadType: 'multipart',
  fileField: 'file',
  parameters: { albumId: '7' },
  headers: { Authorization: 'Bearer <token>' },
});
```

Note that `params` in `@capacitor/file-transfer` are URL query parameters. If your server expects form fields, use the Capgo uploader's `parameters`, which are sent as multipart form fields.

### Mapping table

| cordova-plugin-file-transfer | @capacitor/file-transfer | Capgo plugins |
| --- | --- | --- |
| `download(source, target, ...)` | `downloadFile({ url, path })` | `CapacitorDownloader.download({ id, url, destination })` |
| `upload(file, server, ...)` | `uploadFile({ url, path })` | `Uploader.startUpload({ filePath, serverUrl })` |
| `onprogress` | `addListener('progress')` | `addListener('events')` / `addListener('downloadProgress')` |
| `abort()` | not available | `removeUpload({ id })` / `stop({ id })` |
| `options.fileKey` | `fileKey` | `fileField` or `files[].fieldName` |
| `options.params` | `params` (query string) | `parameters` (form fields) |
| `options.httpMethod` | `method` | `method` (`POST` or `PUT`) |
| `options.chunkedMode` | `chunkedMode` | Handled natively |
| `cordova.file.dataDirectory` | `Filesystem.getUri({ directory: Directory.Data })` | Relative path or `file://` URL |
| `FileTransferError.http_status` | `error.data.httpStatus` | `event.payload.statusCode` |

## Paths: the part that breaks migrations

Cordova code passes `cdvfile://` or `cordova.file.*` paths everywhere. In Capacitor:

- Get native paths from `Filesystem.getUri()` or from the plugin that created the file (camera, file picker, recorder).
- To display a downloaded image in the WebView, convert the native path with `Capacitor.convertFileSrc(path)`.
- Capgo has a [file plugin](/plugins/capacitor-file/) and a [file picker](/plugins/capacitor-file-picker/) if `@capacitor/filesystem` does not cover your case.

## Troubleshooting

**Upload works on Android but fails on iOS with a file not found error.** You passed a `capacitor://` WebView URL instead of a native `file://` path. Use the path from `Filesystem.getUri()`.

**Server rejects the upload with 415.** Multipart vs raw body mismatch. For presigned URLs use `PUT` with an explicit `Content-Type`.

**Background uploads stop on iOS.** The user force quit the app, which cancels background sessions, or `fetch` background mode is missing when you need it.

**Android shows a stuck download notification.** Set `notification: 'progress'` or `'hidden'` on the downloader.

**Memory crash on large downloads.** You are still using `fetch` or reading the file as base64 through the bridge. Switch to a native download to disk.

## Ship the migration

Swapping native plugins needs a new store build, which [Capgo Build](/native-build/) can run in the cloud for iOS and Android. After that, the JavaScript that drives uploads and downloads can be fixed and improved with [Capgo live updates](/live-update/). For the rest of the Cordova to Capacitor move, see our [migration guide](/blog/migrating-cordova-to-capacitor/), and for other paid or legacy native SDKs, the [Ionic enterprise plugin alternatives](/ionic-enterprise-plugins/).
