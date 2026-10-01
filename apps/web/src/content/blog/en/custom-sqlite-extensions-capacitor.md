---
slug: custom-sqlite-extensions-capacitor
title: "How to Use Custom SQLite Extensions in Capacitor"
description: "Load custom SQLite extensions in a Capacitor app: iOS and Android limits, a C extension that builds for both, and how to register it per connection."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor logo for a guide on custom SQLite extensions in Capacitor apps"
keywords: sqlite extensions capacitor, custom sqlite extension ios android, sqlite load_extension android, sqlite3_auto_extension ios, capacitor sqlite fts5, sqlite custom function mobile
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I load SQLite extensions in a Capacitor app?"
    answer: "Yes, but not at runtime from JavaScript. On iOS the extension must be compiled into the app and registered on each connection with its init function. On Android the system SQLite cannot load extensions, so you bundle a SQLite build that can, such as requery sqlite-android, and ship the extension as a .so per ABI. Mainstream Capacitor SQLite plugins do not expose this yet, so you add a small native patch."
  - question: "Does sqlite3_auto_extension work on iOS?"
    answer: "Do not rely on it with the system SQLite. Apple's iOS SDK header marks sqlite3_auto_extension as deprecated with the message 'Process-global auto extensions are not supported on Apple platforms'. Call your extension's init function directly on each connection handle after it opens."
  - question: "Can I use the same extension binary on iOS and Android?"
    answer: "No. The C source is shared. On iOS you compile it into the app with -DSQLITE_CORE. On Android you compile it with the NDK into one shared library per ABI and load it into a bundled SQLite."
  - question: "Do I need an extension for full-text search or JSON?"
    answer: "Usually not. JSON functions are built into modern SQLite, and FTS4 and often FTS5 are compiled into the system libraries. Check PRAGMA compile_options and pragma_function_list on your oldest supported devices before writing C."
  - question: "Do custom SQLite extensions work on the web?"
    answer: "Not with the stock SQLite Wasm build. You would need a custom Wasm build of SQLite that includes your extension and register it from the worker. Most apps either skip the feature on the web or implement it in JavaScript there."
---

You can use custom SQLite extensions in a Capacitor app, but only as native code compiled into the app: on iOS you link the extension statically and call its init function on every connection, and on Android you bundle a SQLite build that supports loading extensions and ship the extension as a native library per CPU architecture. This guide explains why the platforms differ, gives you a working extension in C, and shows the exact native changes for `@capgo/capacitor-fast-sql` on Capacitor 8.

Before you write C, check that you actually need it. Many "extensions" are already built in.

## What a SQLite extension is

An extension is native code that registers new things with a SQLite connection: scalar functions (`haversine_km(...)`), aggregate functions, collations, virtual tables, and FTS5 tokenizers. Every extension exposes one entry point:

```c
int sqlite3_<name>_init(sqlite3 *db, char **pzErrMsg, const sqlite3_api_routines *pApi);
```

SQLite calls it once per connection. Anything you register exists only on that connection.

Typical reasons to write one in a mobile app:

- a custom FTS5 tokenizer for a language the built-in `unicode61` tokenizer handles poorly,
- a math or geo function you need in `WHERE` and `ORDER BY` (distance sorting, scoring),
- a collation that sorts names the way your users expect,
- a vector search extension for on-device retrieval.

## Check what is already built in

Run these through your plugin on the oldest iOS and Android versions you support:

```typescript
import { FastSQL } from '@capgo/capacitor-fast-sql';

const db = await FastSQL.connect({ database: 'probe' });

const [{ v }] = await db.query('SELECT sqlite_version() AS v');
const options = await db.query('PRAGMA compile_options');
const functions = await db.query('SELECT name FROM pragma_function_list ORDER BY name');

console.log(v, options.map((r) => r.compile_options));
```

Things you often do not need an extension for:

| Need | Built-in feature | Check |
| --- | --- | --- |
| JSON in columns | JSON functions (`json_extract`, `->>`) | Built in since SQLite 3.38. Older Android system SQLite may lack them |
| Full-text search | FTS4, FTS5 | `ENABLE_FTS4` / `ENABLE_FTS5` in `compile_options` |
| Spatial bounding boxes | R*Tree | `ENABLE_RTREE` |
| `sin`, `cos`, `sqrt`, `pow` | Math functions | `ENABLE_MATH_FUNCTIONS`, SQLite 3.35+ |

If the feature is there on every target, stop here. The web build of Fast SQL uses the official SQLite Wasm, which includes JSON, FTS5 and math functions.

## Why iOS and Android work differently

**iOS.** The system `libsqlite3` is built with `SQLITE_OMIT_LOAD_EXTENSION`, so `load_extension()` does not exist. App Store rules also forbid downloading and executing new code (guideline 2.5.2), so loading a `.dylib` at runtime is off the table anyway. The extension has to be compiled into the app binary. Many tutorials then call `sqlite3_auto_extension()` at launch. Do not rely on it: in the iOS SDK that ships with Xcode, `sqlite3.h` declares it with `API_DEPRECATED("Process-global auto extensions are not supported on Apple platforms", ...)`. The dependable approach is to call your init function on each connection handle right after it opens.

**Android.** The SQLite inside the Android framework (`android.database.sqlite`) has no API to load extensions. You need a SQLite build bundled with your app that does. [requery/sqlite-android](https://github.com/requery/sqlite-android) is a drop-in replacement for the framework classes, ships a current SQLite (with FTS5 and JSON), and supports loadable extensions through `SQLiteCustomExtension`. Your extension becomes a `.so` file per ABI inside the APK.

**Web.** The stock SQLite Wasm build cannot load native code. You would need a custom Wasm build of SQLite with your extension compiled in.

### What the plugins support today

| | iOS | Android | Web |
| --- | --- | --- | --- |
| `@capgo/capacitor-fast-sql` 8.2 | No hook, patch needed | Uses framework SQLite, patch needed | Stock SQLite Wasm |
| `@capacitor-community/sqlite` 8.1 | `loadExtension()` is declared in the JS API but not implemented natively | Same | Not implemented |

So, for now, adding an extension means a small native patch. It is a contained change, and Bun can keep it applied across installs.

## Step 1: write the extension

A distance function is a good example: useful, self-contained, and easy to verify. Save it as `geo.c`:

```c
#include <math.h>
#include <stddef.h>
#include "sqlite3ext.h"
SQLITE_EXTENSION_INIT1

static void haversine_km(sqlite3_context *ctx, int argc, sqlite3_value **argv) {
  (void)argc;
  for (int i = 0; i < 4; i++) {
    if (sqlite3_value_type(argv[i]) == SQLITE_NULL) {
      sqlite3_result_null(ctx);
      return;
    }
  }
  const double earth_radius_km = 6371.0088;
  const double to_rad = M_PI / 180.0;
  double lat1 = sqlite3_value_double(argv[0]) * to_rad;
  double lon1 = sqlite3_value_double(argv[1]) * to_rad;
  double lat2 = sqlite3_value_double(argv[2]) * to_rad;
  double lon2 = sqlite3_value_double(argv[3]) * to_rad;
  double dlat = lat2 - lat1;
  double dlon = lon2 - lon1;
  double a = sin(dlat / 2) * sin(dlat / 2) +
             cos(lat1) * cos(lat2) * sin(dlon / 2) * sin(dlon / 2);
  sqlite3_result_double(ctx, 2 * earth_radius_km * asin(sqrt(a)));
}

int sqlite3_geo_init(sqlite3 *db, char **pzErrMsg, const sqlite3_api_routines *pApi) {
  SQLITE_EXTENSION_INIT2(pApi);
  (void)pzErrMsg;
  return sqlite3_create_function_v2(
      db, "haversine_km", 4,
      SQLITE_UTF8 | SQLITE_DETERMINISTIC | SQLITE_INNOCUOUS,
      NULL, haversine_km, NULL, NULL, NULL);
}
```

The same file builds both ways:

- **As a loadable extension** (Android): `SQLITE_EXTENSION_INIT1/2` route every SQLite call through the `pApi` pointer SQLite passes in, so the `.so` does not link against SQLite.
- **Statically, with `-DSQLITE_CORE`** (iOS): the macros become no-ops and calls go straight to the SQLite library the app links.

`SQLITE_DETERMINISTIC` lets SQLite use the function in indexes on expressions. `SQLITE_INNOCUOUS` marks it safe to use in views and triggers.

I compiled this file both ways on macOS: statically with `-DSQLITE_CORE` and called `sqlite3_geo_init(db, NULL, NULL)` on a system SQLite connection, and as a loadable library through `load_extension`. Both return about 343.6 km for Paris to London.

## Step 2: iOS, compile into the app and register per connection

### Add the source to the app target

1. In Xcode, drag `geo.c` into the `App` group and tick the `App` target.
2. Xcode offers to create a bridging header. Accept, or create `App/App-Bridging-Header.h` and set it under **Build Settings > Swift Compiler - General > Objective-C Bridging Header**.
3. In **Build Phases > Compile Sources**, double-click `geo.c` and add the per-file flag `-DSQLITE_CORE`.

The iOS SDK ships both `sqlite3.h` and `sqlite3ext.h`, so no extra headers are needed.

`App-Bridging-Header.h`:

```c
#include <sqlite3.h>

int sqlite3_geo_init(sqlite3 *db, char **pzErrMsg, const sqlite3_api_routines *pApi);
```

### Patch Fast SQL to expose an open hook

The plugin opens connections inside its own module, so it needs a hook your app can set. Bun can patch a dependency and re-apply the patch on every install:

```bash
bun patch @capgo/capacitor-fast-sql
```

Edit `node_modules/@capgo/capacitor-fast-sql/ios/Sources/CapgoCapacitorFastSqlPlugin/SQLDatabase.swift`. Add a public hook at the top level of the file:

```swift
public enum FastSqlExtensions {
    /// Called with every new connection handle right after it opens.
    /// Return SQLITE_OK (0) on success.
    public static var onOpen: ((OpaquePointer) -> Int32)?
}
```

Then in `init(...)`, after the encryption block and before `try applyPerformanceOptions(...)`, call it:

```swift
if let hook = FastSqlExtensions.onOpen {
    let rc = hook(db)
    if rc != SQLITE_OK {
        throw SQLError.openFailed(message: "Extension init failed with code \(rc)")
    }
}
```

Save the patch:

```bash
bun patch --commit node_modules/@capgo/capacitor-fast-sql
```

Bun writes a file under `patches/` and records it in `package.json` under `patchedDependencies`. Commit both. Our guide on [how to patch a Capacitor plugin](/blog/how-to-patch-a-capacitor-plugin/) covers this workflow in more detail.

### Register the extension at launch

In `ios/App/App/AppDelegate.swift`, import the plugin module and set the hook in `application(_:didFinishLaunchingWithOptions:)`:

```swift
import UIKit
import Capacitor
import CapgoCapacitorFastSql // CocoaPods module name. With SPM: import CapgoCapacitorFastSqlPlugin

// Inside the existing AppDelegate class:
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    FastSqlExtensions.onOpen = { db in
        sqlite3_geo_init(db, nil, nil)
    }
    return true
}
```

Because the hook runs inside the plugin's open path, every connection gets the function, including ones opened after a WebView reload. Setting it in `didFinishLaunching` guarantees it is in place before JavaScript can call `connect()`.

**SQLCipher builds.** If you use the plugin's SQLCipher subspec, the connection belongs to SQLCipher's SQLite, while your `-DSQLITE_CORE` file may link against the system library's symbols. Test this combination explicitly before shipping, or keep extension-dependent data in an unencrypted database.

## Step 3: Android, bundle a SQLite that can load extensions

### Compile the extension for each ABI

You need the Android NDK (install it from Android Studio's SDK Manager) and `sqlite3ext.h` plus `sqlite3.h` from the [SQLite amalgamation](https://sqlite.org/download.html) next to `geo.c`.

```bash
export NDK=$HOME/Library/Android/sdk/ndk/<version>
export TOOLCHAIN=$NDK/toolchains/llvm/prebuilt/darwin-x86_64   # linux-x86_64 on Linux
export API=24   # your minSdkVersion

for pair in \
  aarch64-linux-android:arm64-v8a \
  armv7a-linux-androideabi:armeabi-v7a \
  x86_64-linux-android:x86_64 \
  i686-linux-android:x86
do
  triple=${pair%%:*}
  abi=${pair##*:}
  mkdir -p android/app/src/main/jniLibs/$abi
  $TOOLCHAIN/bin/clang --target=$triple$API \
    -shared -fPIC -O2 \
    -Wl,-z,max-page-size=16384 \
    -o android/app/src/main/jniLibs/$abi/libgeo.so \
    geo.c -lm
done
```

`-Wl,-z,max-page-size=16384` aligns the library for devices with 16 KB memory pages. Google Play requires 16 KB support for apps targeting Android 15 and higher, see [16 KB page size and Capacitor plugins](/blog/android-16kb-page-size-capacitor-plugins/). If your app only ships to 64-bit devices, you can drop the two 32-bit ABIs.

The library is named `libgeo.so`, so SQLite's default entry point name is `sqlite3_geo_init`, which matches the C function.

### Extract native libraries at install time

Recent Android Gradle Plugin versions keep `.so` files uncompressed inside the APK instead of extracting them. SQLite loads extensions with a file path, so ask for extraction in `android/app/build.gradle`:

```groovy
android {
    packaging {
        jniLibs {
            useLegacyPackaging = true
        }
    }
}
```

### Add requery sqlite-android

In `android/build.gradle` (root), add JitPack:

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

### Patch Fast SQL to use it

Open the same Bun patch session (`bun patch @capgo/capacitor-fast-sql`) and edit two files.

`node_modules/@capgo/capacitor-fast-sql/android/build.gradle`, in `dependencies`:

```groovy
implementation 'com.github.requery:sqlite-android:3.49.0'
```

Use the latest version that JitPack shows as built for the repository.

`node_modules/@capgo/capacitor-fast-sql/android/src/main/java/app/capgo/capacitor/fastsql/SQLDatabase.java`: swap the framework imports for requery's and open through a configuration that carries the extensions.

```java
// Replace:
// import android.database.sqlite.SQLiteDatabase;
// import android.database.sqlite.SQLiteStatement;
import io.requery.android.database.sqlite.SQLiteCustomExtension;
import io.requery.android.database.sqlite.SQLiteDatabase;
import io.requery.android.database.sqlite.SQLiteDatabaseConfiguration;
import io.requery.android.database.sqlite.SQLiteStatement;

public class SQLDatabase implements DatabaseConnection {

    /** Set from MainActivity before the first connection opens. */
    public static final java.util.List<SQLiteCustomExtension> extensions =
        new java.util.concurrent.CopyOnWriteArrayList<>();

    private SQLiteDatabase db;
    private volatile boolean inTransaction = false;

    public SQLDatabase(String path, boolean walMode, boolean performancePresets) throws Exception {
        SQLiteDatabaseConfiguration config = new SQLiteDatabaseConfiguration(
            path, SQLiteDatabase.CREATE_IF_NECESSARY);
        config.customExtensions.addAll(extensions);
        this.db = SQLiteDatabase.openDatabase(config, null, null);
        SQLPerformanceConfig.apply(db::execSQL, walMode, performancePresets);
    }

    // ... the rest of the class stays as it is
}
```

requery's classes mirror the framework API (`rawQuery`, `compileStatement`, `execSQL`, transactions), so the rest of the file compiles unchanged. `android.database.Cursor` stays as it is. Commit the patch with `bun patch --commit node_modules/@capgo/capacitor-fast-sql`.

This changes the unencrypted path only. Encrypted connections use SQLCipher's own classes, which this patch does not touch.

### Register the extension in MainActivity

```java
package com.example.app;

import android.os.Bundle;
import app.capgo.capacitor.fastsql.SQLDatabase;
import com.getcapacitor.BridgeActivity;
import io.requery.android.database.sqlite.SQLiteCustomExtension;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        String path = getApplicationInfo().nativeLibraryDir + "/libgeo.so";
        SQLDatabase.extensions.add(new SQLiteCustomExtension(path, "sqlite3_geo_init"));
        super.onCreate(savedInstanceState);
    }
}
```

Register before `super.onCreate` so the list is filled before the WebView can run any JavaScript.

### Android without C: Java functions

If all you need is a scalar function, requery can register one written in Java, no NDK required. Inside the patched `SQLDatabase` constructor, after opening:

```java
db.addFunction("haversine_km", 4, (args, result) -> {
    double r = 6371.0088;
    double lat1 = Math.toRadians(args.getDouble(0));
    double lat2 = Math.toRadians(args.getDouble(2));
    double dlat = lat2 - lat1;
    double dlon = Math.toRadians(args.getDouble(3) - args.getDouble(1));
    double a = Math.pow(Math.sin(dlat / 2), 2)
             + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    result.set(2 * r * Math.asin(Math.sqrt(a)));
});
```

This is slower than C for heavy queries because every call crosses JNI, but it is far simpler to maintain. FTS5 tokenizers and virtual tables still need C.

## Step 4: use it from JavaScript

After `bunx cap sync` and a native rebuild:

```typescript
import { FastSQL } from '@capgo/capacitor-fast-sql';

const db = await FastSQL.connect({ database: 'places' });

await db.execute(`CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  lat REAL NOT NULL,
  lon REAL NOT NULL
)`);

const nearby = await db.query(
  `SELECT id, name, haversine_km(?, ?, lat, lon) AS km
   FROM places
   WHERE lat BETWEEN ? AND ? AND lon BETWEEN ? AND ?
   ORDER BY km
   LIMIT 20`,
  [userLat, userLon, userLat - 0.5, userLat + 0.5, userLon - 0.7, userLon + 0.7],
);
```

The `BETWEEN` box lets SQLite use an index on `(lat, lon)` to narrow candidates before the function computes exact distances. Without it the function runs on every row.

### A JavaScript fallback for the web

The web build cannot load your C code, so detect it and fall back:

```typescript
import { Capacitor } from '@capacitor/core';

export const hasGeoExtension = Capacitor.isNativePlatform();

// On the web: query the bounding box, then sort in JS with the same formula.
```

## Custom FTS5 tokenizers

The same mechanism registers FTS5 tokenizers. In your init function, get the `fts5_api` pointer with the `SELECT fts5(?1)` pattern from the [FTS5 documentation](https://www.sqlite.org/fts5.html#extending_fts5), then call `xCreateTokenizer`. Two extra requirements:

- The SQLite library must include FTS5. requery's build does. On iOS, check `PRAGMA compile_options` for `ENABLE_FTS5`.
- Every connection that writes to or reads from the FTS table must have the tokenizer registered, because FTS5 stores the tokenizer name in the table definition. This is why the per-connection hook matters.

```sql
CREATE VIRTUAL TABLE docs USING fts5(title, body, tokenize = 'my_tokenizer');
```

## Shipping and maintaining it

- **Native rebuild required.** Extensions, patches and Gradle changes are native. They need a new App Store and Play Store build. [Capgo Build](/native-build/) can build and sign both in the cloud. Since April 2026, iOS uploads must be built with Xcode 26 or later.
- **JavaScript can still move fast.** SQL that calls `haversine_km` lives in your web bundle and can ship with [live updates](/live-update/), as long as the native build that contains the extension is already installed. Gate new SQL on a native version check if users may still run an older binary.
- **Plugin upgrades.** When you update Fast SQL, Bun re-applies the patch. If the patched lines moved, the install fails loudly instead of silently dropping your hook. Re-create the patch on the new version.

## Troubleshooting

**`no such function: haversine_km` on iOS.** The hook was not set before `connect()`, or the database was opened before `didFinishLaunching` ran. Log inside the hook to confirm it is called.

**Crash inside `sqlite3_geo_init` on iOS.** `-DSQLITE_CORE` is missing, so the file compiled as a loadable extension that dereferences the `pApi` pointer, which is `nil` here. Add the per-file flag in Compile Sources.

**`no such function` on Android.** The patched `SQLDatabase` still imports `android.database.sqlite.SQLiteDatabase`, or the extension was added to the list after the first connection. Log `SQLDatabase.extensions.size()` when connecting.

**`dlopen failed: library "…/libgeo.so" not found`.** The library is missing for the device ABI (most phones are `arm64-v8a`), or native libraries were not extracted. Check `useLegacyPackaging` and inspect the APK with Android Studio's APK Analyzer.

**`undefined symbol: sqlite3_geo_init`.** The entry point name passed to `SQLiteCustomExtension` does not match the C function, or the function was declared `static`.

**Play Console warns about 16 KB alignment.** Rebuild the `.so` files with `-Wl,-z,max-page-size=16384` and a recent NDK, and update requery to a version built with 16 KB alignment.

**The function works on Android but not in the iOS simulator.** Make sure `geo.c` is a member of the `App` target, not only present in the file tree.

## Summary

| Platform | How the extension gets in | Where it is registered |
| --- | --- | --- |
| iOS | Compiled into the app with `-DSQLITE_CORE` | Plugin hook that calls `sqlite3_geo_init` on every new connection |
| Android | `.so` per ABI in `jniLibs`, loaded by requery sqlite-android | `SQLiteCustomExtension` list read when each connection opens |
| Web | Not supported by stock SQLite Wasm | JavaScript fallback |

Start by checking the built-in features. If you still need an extension, write it once in C, keep the native patches small, and test on the oldest devices you support. For the general plugin setup, see [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/).
