---
slug: android-scoped-storage-in-capacitor-apps
title: "Android Scoped Storage in Capacitor Apps"
description: "Android scoped storage in Capacitor apps explained: what changed in Android 10 to 14, which permissions still work, MediaStore, SAF, and safe directories."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Android scoped storage rules applied to files in a Capacitor app"
keywords: android scoped storage capacitor, capacitor WRITE_EXTERNAL_STORAGE, capacitor filesystem android 11, MANAGE_EXTERNAL_STORAGE capacitor, capacitor save file to downloads, storage access framework capacitor, READ_MEDIA_IMAGES capacitor
tag: Android, Capacitor, Guides
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Do I still need WRITE_EXTERNAL_STORAGE in a Capacitor app?"
    answer: "Only for Android 9 and older. On Android 10+ it does not grant write access to shared storage, and on Android 11+ it has no effect at all. Declare it with android:maxSdkVersion=\"28\" (or 29 if you rely on requestLegacyExternalStorage) and save shared files through MediaStore or the system picker instead."
  - question: "Why can't Capacitor Filesystem write to Directory.Documents on Android 11?"
    answer: "Directory.Documents and Directory.ExternalStorage map to shared storage on Android. Since Android 11, apps that target API 30+ can only access files there that they created themselves, and requestLegacyExternalStorage is ignored. Use Directory.Data or Directory.External for app files, and MediaStore or SAF for user-visible files."
  - question: "Can the user grant my app access to the whole Downloads folder?"
    answer: "No. On Android 11 and newer, the system folder picker (ACTION_OPEN_DOCUMENT_TREE) does not allow selecting the root of the Download folder, the root of the storage volume, or Android/data and Android/obb. Users can grant a subfolder, or pick individual files from Downloads."
  - question: "Should I request MANAGE_EXTERNAL_STORAGE?"
    answer: "Almost never. It gives All files access, but Google Play only allows it for apps whose core function needs broad file access, such as file managers, backup and restore apps, antivirus apps, and document management apps. Other apps get rejected. Use MediaStore and SAF instead."
  - question: "Does scoped storage affect iOS?"
    answer: "No. Scoped storage is an Android concept. iOS apps have always been sandboxed and reach user files only through the document picker, the share sheet, or the Files app integration."
---

Android scoped storage limits what a Capacitor app can read and write outside its own folders. Since Android 10, and fully since Android 11, an app can freely use its private directories, can add files to shared collections through MediaStore, and needs the user to pick anything else through the Storage Access Framework. This guide explains what changed per Android version, which Capacitor `Directory` values still work, and how to save, import and export files the supported way on Capacitor 8.

## What changed, version by version

| Android | API | Change that matters for Capacitor apps |
| --- | --- | --- |
| 10 | 29 | Scoped storage introduced. Apps can opt out with `requestLegacyExternalStorage="true"` while targeting API 29 |
| 11 | 30 | Scoped storage enforced for apps targeting 30+. `requestLegacyExternalStorage` ignored. `WRITE_EXTERNAL_STORAGE` no longer grants anything. `MANAGE_EXTERNAL_STORAGE` introduced. Tree picker cannot select Download root or volume root |
| 12 | 31-32 | No major storage change |
| 13 | 33 | `READ_EXTERNAL_STORAGE` replaced by `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, `READ_MEDIA_AUDIO`. No permission grants access to other apps' documents |
| 14 | 34 | Partial photo access with `READ_MEDIA_VISUAL_USER_SELECTED` |
| 15 and 16 | 35-36 | No new storage model, Play policy on photo and video permissions enforced |

Capacitor 8 targets API 36, so your app always runs with full scoped storage on modern devices. There is no flag to get the old behavior back.

## What broke in older Capacitor code

Code written for Capacitor 2 or 3, or ported from Cordova, often fails silently on new devices:

- `Filesystem.writeFile({ directory: Directory.Documents })` or `Directory.ExternalStorage` to "save to the phone". On Android 11+ these paths point to shared storage, and writes fail or the file cannot be read back after reinstall.
- Reading arbitrary paths such as `/storage/emulated/0/Download/file.pdf` from a path typed in a setting or received from a server.
- Requesting `READ_EXTERNAL_STORAGE` to list the user's documents. On Android 13+ the permission does nothing for non-media files.
- Using `Filesystem.requestPermissions()` and assuming `granted` means the app can write anywhere.
- Building file paths from a `content://` URI returned by a picker.

## What still works without any permission

Your app's own directories are unaffected by scoped storage and need no permission:

| Capacitor `Directory` | Android path | Visible to user | Removed on uninstall |
| --- | --- | --- | --- |
| `Data`, `Library`, `LibraryNoCloud` | `/data/data/<package>/files` | No | Yes |
| `Cache` | `/data/data/<package>/cache` | No | Yes |
| `External` | `/storage/emulated/0/Android/data/<package>/files` | Only via USB or some file managers | Yes |
| `ExternalCache` | `/storage/emulated/0/Android/data/<package>/cache` | Same | Yes |
| `Documents` | Shared `Documents` folder | Yes | No |
| `ExternalStorage` | Shared storage root | Yes | No |

The first four rows are safe. `Documents` and `ExternalStorage` are the legacy rows: since Android 11 your app can only see files there that it created itself, and after a reinstall it loses access even to those. Treat them as unsupported for new code.

`External` is useful for large files (offline video, maps) because it may live on a bigger partition, and files there are not part of Auto Backup. Since Android 11, other apps cannot read `Android/data`, so it is still private in practice.

## Saving files the user can find: MediaStore

When the user taps "Download" on an invoice, they expect it in the Downloads folder. On Android 10+, apps can insert files into the shared `Downloads`, `Pictures`, `Movies`, `Music` and `Documents` collections through MediaStore without any permission.

[`@capgo/capacitor-file-sharer`](/plugins/capacitor-file-sharer/) wraps this in `save()`:

```bash
bun add @capgo/capacitor-file-sharer
bunx cap sync
```

```typescript
import { FileSharer } from '@capgo/capacitor-file-sharer';
import { Filesystem, Directory } from '@capacitor/filesystem';

const { uri } = await Filesystem.getUri({ path: 'exports/invoice-1042.pdf', directory: Directory.Data });

const result = await FileSharer.save({
  filename: 'invoice-1042.pdf',
  path: uri,
  contentType: 'application/pdf',
  android: {
    saveDirectory: 'downloads',     // 'downloads' | 'pictures' | 'movies' | 'music' | 'documents'
    relativePath: 'MyApp/Invoices', // subfolder, Android 10+
  },
});

console.log(result.uri); // content:// URI of the saved file
```

On iOS the same call opens the share sheet, where the user picks "Save to Files", so one code path covers both platforms.

On Android 9 and lower, writing to shared storage still needs `WRITE_EXTERNAL_STORAGE`. Declare it only for those versions:

```xml
<uses-permission
    android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="28" />
```

Capacitor 8 supports Android 7 (API 24) and up, so if you still ship to Android 7 to 9 devices, keep that line.

### Photos and videos

For media, prefer the platform flows over writing files yourself. `@capacitor/camera` writes to the gallery with `saveToGallery: true`, and only needs legacy storage permissions on old Android versions. See our guide to [taking and editing photos in Capacitor](/blog/how-to-take-and-edit-photos-in-a-capacitor-app/).

## Reading user files: pickers instead of permissions

Scoped storage expects the user to choose files. The Android picker returns a `content://` URI that your app can read even though it has no storage permission.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';
import { Filesystem, Directory } from '@capacitor/filesystem';

const { files } = await CapgoFilePicker.pickFiles({ types: ['application/pdf'], limit: 1 });
const picked = files[0];

// Copy into app storage right away: picker grants can expire
await Filesystem.copy({
  from: picked.path!,
  to: `imports/${picked.name}`,
  toDirectory: Directory.Data,
});
```

For photos and videos, [`@capgo/capacitor-file-picker`](/plugins/capacitor-file-picker/)'s `pickMedia` and `@capacitor/camera`'s `chooseFromGallery` use the Android Photo Picker on Android 13+, which needs no permission at all.

### Avoid READ_MEDIA_* permissions

Google Play's photo and video permissions policy only allows `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO` for apps whose core purpose needs broad gallery access, such as gallery apps or photo editors. Everyone else must use the picker and declare that in Play Console. If a plugin you use declares these permissions, remove them from the merged manifest:

```xml
<uses-permission
    android:name="android.permission.READ_MEDIA_IMAGES"
    tools:node="remove" />
<uses-permission
    android:name="android.permission.READ_MEDIA_VIDEO"
    tools:node="remove" />
```

Add `xmlns:tools="http://schemas.android.com/tools"` to the `<manifest>` tag first.

## Folder access with the Storage Access Framework

Some apps need ongoing access to a folder: a notes app syncing to a user folder, an export folder for a field app. The Storage Access Framework (SAF) lets the user grant a folder with `ACTION_OPEN_DOCUMENT_TREE`:

```typescript
const { path } = await CapgoFilePicker.pickDirectory();
// On Android: a content://com.android.externalstorage.documents/tree/... URI
```

Three things to know:

1. **The result is a tree URI, not a path.** You cannot pass it to `Filesystem.writeFile`. Files inside are created and read through `DocumentsContract` or `DocumentFile` in native code.
2. **Access does not survive a restart** unless your app calls `takePersistableUriPermission` on the URI. Add a small native method if you need that:

```java
@PluginMethod
public void persist(PluginCall call) {
    Uri uri = Uri.parse(call.getString("uri"));
    getContext().getContentResolver().takePersistableUriPermission(
        uri, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
    call.resolve();
}
```

3. **Some folders cannot be granted.** On Android 11+, the picker refuses the root of internal storage, the root of the `Download` folder, and `Android/data` and `Android/obb`. Ask users to create or pick a subfolder.

Persisted grants are limited in number per app, and the user can revoke them in system settings or by clearing app data. Check access with `getPersistedUriPermissions()` on start and ask again when it is gone.

## All files access: MANAGE_EXTERNAL_STORAGE

```xml
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
```

This permission gives the old "read and write everything" behavior, but it is not a runtime prompt. The user must enable it on a dedicated settings screen, and Google Play reviews it manually. Accepted use cases are file managers, backup and restore, antivirus, document management, on-device file search, and a few others where broad access is the core feature. A note-taking app, a PDF viewer that opens files from Downloads, or an app that "just needs to save exports" will be rejected.

If you distribute outside Play (enterprise MDM, sideloaded kiosk devices), it is an option. Otherwise, design around MediaStore and SAF.

## How other plugins fit

| Plugin | Scoped storage impact |
| --- | --- |
| `@capacitor/filesystem` | Fine with app directories. `Documents` and `ExternalStorage` are legacy on Android 11+. `requestPermissions()` only matters for those directories on old Android |
| `@capacitor/camera` | Uses the system camera and Photo Picker, no storage permission except `saveToGallery` on Android 9 and older |
| `@capacitor/share` | Shares through a `FileProvider`. Only paths listed in `res/xml/file_paths.xml` can be shared |
| `@capgo/capacitor-file-sharer` | Uses its own `FileProvider` and MediaStore for `save()`, no config needed |
| `@capgo/capacitor-downloader` | Downloads into app external storage, then use `save()` to export |
| `@capgo/capacitor-file-picker` | Picker based, no permission on Android 13+ |
| `@capgo/capacitor-photo-library` | Its manifest adds `READ_MEDIA_*` for full library reading, subject to the Play policy above. `pickMedia()` uses the system picker and needs no permission, so if that is all you use, remove `READ_MEDIA_*` with `tools:node="remove"` |

## Which directory to use

- App data, settings, databases: `Directory.Data`
- Temporary files and share exports: `Directory.Cache`
- Large re-downloadable media: `Directory.External` on Android, `Directory.LibraryNoCloud` on iOS
- A file the user wants in Downloads or Pictures: MediaStore via `FileSharer.save()`
- A file the user brings into the app: picker, then copy into `Directory.Data`
- A folder the user wants the app to keep writing to: SAF tree URI with a persisted grant

For the full read and write API, see the [Capacitor file handling guide](/blog/capacitor-file-handling-guide/).

## Migrating an existing app

1. Search your code for `Directory.Documents`, `Directory.ExternalStorage`, `/storage/emulated`, and `requestLegacyExternalStorage`.
2. Move app-owned files to `Directory.Data` or `Directory.External`. On first launch of the new version, copy any old files you can still read, then delete them.
3. Replace "save to device" features with `FileSharer.save()`.
4. Replace path inputs with a picker.
5. Add `android:maxSdkVersion` to legacy storage permissions and remove `READ_MEDIA_*` unless you need it.
6. Test on Android 10, 11, 13 and 15 or 16 devices or emulators. Behavior differs exactly at those boundaries.

`preserveLegacyExternalStorage="true"` in the `<application>` tag keeps legacy access for apps updated from a version that used `requestLegacyExternalStorage`, until the app is reinstalled. It only helps during a one-time migration step, so do not rely on it.

## Troubleshooting

**`EACCES (Permission denied)` writing to `/storage/emulated/0/...`**: you are writing to shared storage directly. Use MediaStore or an app directory.

**File saved with `Directory.Documents` is gone after reinstall**: the app lost ownership of it. Use MediaStore for user files.

**`FileNotFoundException` reading a `content://` URI later**: the temporary grant expired. Copy the file when it is picked, or persist the grant for tree URIs.

**Play Console warning about photo and video permissions**: a plugin added `READ_MEDIA_IMAGES` or `READ_MEDIA_VIDEO`. Remove them with `tools:node="remove"` if you do not need them.

**`requestPermissions()` returns granted but writes still fail**: on Android 11+ the legacy storage permission is granted but meaningless for shared storage.

## Keep native and web parts in sync

Storage rules are native configuration, so changes to the manifest or plugins need a store release, which [Capgo Build](/native-build/) can produce in the cloud. The file logic around them (paths, folder names, export flows) is JavaScript you can update with [Capgo live updates](/live-update/).
