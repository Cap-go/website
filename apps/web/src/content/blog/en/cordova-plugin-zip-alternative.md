---
slug: cordova-plugin-zip-alternative
title: "cordova-plugin-zip Alternative for Capacitor"
description: "cordova-plugin-zip alternative for Capacitor: zip and unzip on device with @capgo/capacitor-zip, progress events, and Android AES passwords."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-27T09:00:00.000Z
updated_at: 2026-11-27T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a zip and unzip plugin guide"
keywords: cordova-plugin-zip alternative, capacitor zip, @capgo/capacitor-zip, unzip capacitor
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-zip alternative in Capacitor?"
    answer: "@capgo/capacitor-zip adds zip and unzip promises, optional AES passwords on Android, zip slip protection on Android, and progress via addListener or onProgress."
  - question: "Does cordova-plugin-zip compress files?"
    answer: "No. The npm package only exposes zip.unzip in zip.js. Use @capgo/capacitor-zip zip() on native platforms for archiving."
  - question: "Is cordova-plugin-zip still maintained?"
    answer: "npm lists cordova-plugin-zip at version 3.1.0. The last version publish on the registry timeline is 23 February 2016. Source: MobileChromeApps/cordova-plugin-zip on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/zip/, npm @capgo/capacitor-zip, and GitHub Cap-go/capacitor-zip."
---

The practical **cordova-plugin-zip alternative** for a Capacitor app is [`@capgo/capacitor-zip`](/plugins/capacitor-zip/). It keeps native unzip off the JavaScript bridge, adds `zip()` for folders and files, surfaces progress like Cordova's optional callback, and normalizes `file://` paths from older Cordova file plugins. This guide lists npm facts, install steps, usage for update bundles, and a Cordova to Capacitor API map.

## Why leave cordova-plugin-zip in Capacitor

**cordova-plugin-zip** on npm is version **3.1.0**. The last numbered release on the npm `time` object is **23 February 2016**. The registry `modified` timestamp is **14 June 2022** (metadata only, not a new plugin version). The npm repository URL points to [MobileChromeApps/cordova-plugin-zip](https://github.com/MobileChromeApps/cordova-plugin-zip).

The published `zip.js` module exposes only:

- `zip.unzip(source, destination, callback, progressCallback?)` with success code `0` or failure `-1`
- `progressCallback` receives `{ loaded, total }` byte counts for the archive

There is no `zip()` in the Cordova JavaScript API. The plugin depends on `cordova-plugin-file` path strings and legacy `cordova.exec` wiring.

[`@capgo/capacitor-zip`](https://www.npmjs.com/package/@capgo/capacitor-zip) latest on npm is **8.2.5** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `zip`, `unzip`, `addListener('progress')`, optional `password` on Android, `includeParentFolder`, and `onProgress`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

The command below installs the npm **8.x** line for **Capacitor 8** (`@capacitor/core` >= 8). Capgo plugin majors track Capacitor majors. On Capacitor 7, install the matching **7.x** release instead (see the plugin README).

```bash
bun add @capgo/capacitor-zip
bunx cap sync
```

Use absolute or `file://` paths the native layer can read. After you unpack a live update archive, run through the checks in [checklist for validating Capacitor app updates](/blog/checklist-for-validating-capacitor-app-updates/).

## Usage example

```ts
import { CapacitorZip } from '@capgo/capacitor-zip';

export async function unpackUpdateBundle(zipPath: string, targetDir: string) {
  const handle = await CapacitorZip.addListener('progress', (event) => {
    if (event.lengthComputable) {
      console.log('unzip', Math.round(event.progress * 100), event.currentFile);
    }
  });
  try {
    await CapacitorZip.unzip({
      source: zipPath,
      destination: targetDir,
    });
  } finally {
    await handle.remove();
  }
}

export async function backupFolder(folderPath: string, archivePath: string) {
  await CapacitorZip.zip({
    source: folderPath,
    destination: archivePath,
    includeParentFolder: false,
  });
}
```

`zip()` throws on web; run compression on iOS, Android, or your server.

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
zip.unzip(
  sourceZip,
  outputDirectory,
  (code) => code === 0 && console.log('done'),
  (progress) => console.log(progress.loaded, progress.total),
);
```

```ts
// After (Capacitor)
import { CapacitorZip } from '@capgo/capacitor-zip';

await CapacitorZip.unzip(
  {
    source: sourceZip,
    destination: outputDirectory,
    onProgress: (event) => console.log(event.loaded, event.total),
  },
);
```

### API mapping table

| cordova-plugin-zip (`zip` global) | @capgo/capacitor-zip |
| --- | --- |
| `unzip(src, dest, callback, progress?)` | `unzip({ source, destination, onProgress?, password? })` rejects on failure instead of code `-1` |
| Progress `{ loaded, total }` | `ZipProgressEvent` via `addListener('progress')` or `onProgress` |
| Success callback with `0` | Promise resolves when extraction completes |
| Failure callback with `-1` | Promise rejects with error message |
| Not in Cordova JS API | `zip({ source, destination, password?, includeParentFolder? })` |
| Not in Cordova | `getPluginVersion()` |
| Depends on `cordova-plugin-file` URLs | Accepts `file://` and percent-encoded paths, normalized before native I/O |
| Cordova plugin install | `bun add @capgo/capacitor-zip` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/zip/](/docs/plugins/zip/)
- Marketing page: [/plugins/capacitor-zip/](/plugins/capacitor-zip/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-zip](https://www.npmjs.com/package/@capgo/capacitor-zip)
- GitHub: [https://github.com/Cap-go/capacitor-zip/](https://github.com/Cap-go/capacitor-zip/)
- Cordova upstream: [https://github.com/MobileChromeApps/cordova-plugin-zip](https://github.com/MobileChromeApps/cordova-plugin-zip)

Zip handling runs in native code. Use [Capgo Build](/native-build/) when you add the plugin to production binaries, then adjust unpack paths in [Capgo live updates](/live-update/) with the validation checklist above. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).