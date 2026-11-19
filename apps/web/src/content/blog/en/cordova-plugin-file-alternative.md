---
slug: cordova-plugin-file-alternative
title: "cordova-plugin-file Alternative for Capacitor"
description: "cordova-plugin-file alternative for Capacitor apps: migrate file paths and callbacks to @capgo/capacitor-file with Cordova-compatible APIs and native storage."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-12T09:00:00.000Z
updated_at: 2026-11-12T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a file plugin guide"
keywords: cordova-plugin-file alternative, capacitor file plugin, capacitor filesystem cordova, @capgo/capacitor-file, cordova file migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-file alternative in Capacitor?"
    answer: "@capgo/capacitor-file exposes Cordova-style entry methods such as requestFileSystem and resolveLocalFileSystemURL, plus modern read and write helpers. It targets Capacitor 8 and ships as a first-class Capacitor plugin on iOS, Android and Web."
  - question: "Can I keep using cordova-plugin-file inside Capacitor?"
    answer: "You can load it through the Cordova compatibility layer, but you still depend on cordova.file paths, callback APIs, and extra native wiring. A Capacitor-native plugin fits better with Filesystem URIs, permissions, and live update workflows."
  - question: "How does @capgo/capacitor-file differ from @capacitor/filesystem?"
    answer: "The official Filesystem API centers on directory enums and URI helpers. @capgo/capacitor-file adds Cordova entry compatibility, partial reads and writes, progress listeners, and broader directory coverage for migrations from cordova-plugin-file."
  - question: "Do I need storage permissions on Android?"
    answer: "Private app directories work without broad storage access. call checkPermissions and requestPermissions when you read or write outside those folders. Google Play restricts READ_MEDIA_IMAGES and READ_MEDIA_VIDEO unless media access is core to your app."
  - question: "Does the plugin work on web?"
    answer: "Yes. Core file operations run in browser storage on web, while iOS and Android use native file APIs."
  - question: "Where are the full API docs?"
    answer: "See the Capgo file plugin docs at https://capgo.app/docs/plugins/file/, the npm package https://www.npmjs.com/package/@capgo/capacitor-file, and the source at https://github.com/Cap-go/capacitor-file/."
---

The practical **cordova-plugin-file alternative** for a Capacitor migration is [`@capgo/capacitor-file`](/plugins/capacitor-file/). It mirrors the Cordova entry and reader model (`requestFileSystem`, `resolveLocalFileSystemURL`, `getFile`, `getDirectory`) while exposing promise-based `readFile`, `writeFile`, `copy`, `move`, and permission helpers that fit Capacitor apps on iOS, Android, and Web. This guide covers maintenance facts, install steps, a usage sample, and an API map from Cordova to Capgo.

## Why leave cordova-plugin-file in a Capacitor app

`cordova-plugin-file` is still published. npm lists version **8.1.3** with a last publish date of **20 November 2024**. The Apache repository on GitHub received commits in **2026**, so the Cordova project is not abandoned.

In a Capacitor codebase the pain is integration, not npm freshness:

- The plugin expects `window.requestLocalFileSystem`, `cordova.file.*` constants, and callback-style `FileReader` / `FileWriter` objects.
- Other Cordova plugins (file transfer, media, chooser) still assume `file://` or `cdvfile://` paths that do not match Capacitor's URI model.
- Capacitor's own [`@capacitor/filesystem`](https://capacitorjs.com/docs/apis/filesystem) is excellent for greenfield apps but does not implement Cordova's entry tree APIs, so large legacy codebases need a dedicated bridge.

[`@capgo/capacitor-file`](https://www.npmjs.com/package/@capgo/capacitor-file) is built for that bridge. The README states the API is **compatible with cordova-plugin-file** and documents a migration table from Cordova calls to Capgo methods. It follows Capacitor major versions (v8.x for Capacitor 8) and includes iOS, Android, and Web implementations.

## Install

```bash
bun add @capgo/capacitor-file
bunx cap sync
```

On **Android 13+**, call `requestPermissions()` only when your feature truly needs shared storage or broad media access. Google Play's Photo and Video Permissions policy expects one-time picks (for example profile photos) to use a system picker such as [`@capgo/capacitor-file-picker`](/plugins/capacitor-file-picker/) instead of `READ_MEDIA_IMAGES` or `READ_MEDIA_VIDEO`. The plugin README links to [Google's policy](https://support.google.com/googleplay/android-developer/answer/14115180) for review requirements.

Run `bunx cap sync` after changing dependencies so native projects pick up the plugin. Ship the native change through your normal store build or [Capgo Build](/native-build/).

## Usage example

```ts
import { CapacitorFile, Directory, Encoding } from '@capgo/capacitor-file';

export async function saveConfig(json: string) {
  const path = 'config/app-settings.json';

  await CapacitorFile.writeFile({
    path,
    directory: Directory.Data,
    data: json,
    encoding: Encoding.UTF8,
    recursive: true,
  });

  const { data } = await CapacitorFile.readFile({
    path,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });

  return JSON.parse(data) as Record<string, unknown>;
}
```

For Cordova-style URLs, resolve first then read:

```ts
const entry = await CapacitorFile.resolveLocalFileSystemURL({
  url: nativeFileUrl,
});
console.log(entry.name, entry.isFile);
```

## Migrating from Cordova to Capacitor

Replace global Cordova file calls with `CapacitorFile` imports. Drop `deviceready` gates; await promises instead of success and error callbacks.

### API mapping table

| cordova-plugin-file | @capgo/capacitor-file |
| --- | --- |
| `window.resolveLocalFileSystemURL()` | `CapacitorFile.resolveLocalFileSystemURL()` |
| `directoryEntry.getFile()` | `CapacitorFile.getFile()` |
| `directoryEntry.getDirectory()` | `CapacitorFile.getDirectory()` |
| `fileReader.readAsText()` | `CapacitorFile.readFile({ encoding: Encoding.UTF8 })` |
| `fileReader.readAsDataURL()` | `CapacitorFile.readAsDataURL()` |
| `fileWriter.write()` | `CapacitorFile.writeFile()` |
| `fileWriter.append()` / sequential write | `CapacitorFile.appendFile()` |
| `entry.remove()` (file) | `CapacitorFile.deleteFile()` |
| `entry.moveTo()` | `CapacitorFile.move()` |
| `entry.copyTo()` | `CapacitorFile.copy()` |
| `directoryEntry.removeRecursively()` | `CapacitorFile.rmdir({ recursive: true })` |
| `directoryEntry.createReader().readEntries()` | `CapacitorFile.readdir()` |
| `entry.getMetadata()` | `CapacitorFile.stat()` or `getMetadata()` |
| `cordova.file.dataDirectory` | `Directory.Data` |
| `cordova.file.documentsDirectory` | `Directory.Documents` |
| `cordova.file.cacheDirectory` | `Directory.Cache` |
| `LocalFileSystem.PERSISTENT` / `TEMPORARY` | `CapacitorFile.requestFileSystem({ type: FileSystemType.* })` |

The mapping table above matches the [plugin README migration section](https://github.com/Cap-go/capacitor-file/#migration-from-cordova-plugin-file).

### Path tips

- Replace `cdvfile://` paths with `Directory` plus relative paths, or with URIs from `CapacitorFile.getUri()`.
- To show a local image in the WebView, convert native paths with `Capacitor.convertFileSrc()`.
- Plugins that still expect Cordova file URLs (old file transfer code) should be migrated or removed so every call site uses Capacitor URIs.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/file/](/docs/plugins/file/)
- Marketing page: [/plugins/capacitor-file/](/plugins/capacitor-file/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-file](https://www.npmjs.com/package/@capgo/capacitor-file)
- GitHub: [https://github.com/Cap-go/capacitor-file/](https://github.com/Cap-go/capacitor-file/)

After native file code is on `@capgo/capacitor-file`, you can ship JavaScript fixes with [Capgo live updates](/live-update/). For the full platform move, read our [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/). If you also replace file transfer, see the [cordova-plugin-file-transfer alternative](/blog/cordova-plugin-file-transfer-alternative/).
