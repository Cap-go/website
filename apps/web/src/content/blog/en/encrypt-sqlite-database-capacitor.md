---
slug: encrypt-sqlite-database-capacitor
title: "How to Encrypt a SQLite Database in Capacitor"
description: "Encrypt a SQLite database in Capacitor with SQLCipher: set it up on iOS and Android, store the key securely, migrate existing data and rotate keys."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capgo logo for a guide on encrypting a SQLite database in Capacitor with SQLCipher"
keywords: encrypt sqlite capacitor, capacitor sqlcipher, encrypted sqlite ionic, capacitor database encryption, sqlcipher ios android, capacitor secure database
tag: Security, Tutorial, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I encrypt a SQLite database in a Capacitor app?"
    answer: "Use a SQLite plugin with SQLCipher support, such as @capgo/capacitor-fast-sql. Add SQLCipher to the Android and iOS builds, generate a random 256-bit key on first launch, store it in the Keychain or Android Keystore, and open the database with encrypted: true and that key."
  - question: "Where should I store the SQLite encryption key?"
    answer: "In platform secure storage: the iOS Keychain or Android Keystore-backed storage. @capgo/capacitor-native-biometric provides setData and getData for this, with optional biometric protection. Never hardcode the key in JavaScript or in capacitor.config, because both ship inside the app and can be extracted."
  - question: "Can I encrypt an existing unencrypted SQLite database?"
    answer: "Yes. Open the plaintext database and a new encrypted one, recreate the schema, copy every table inside a transaction, copy PRAGMA user_version, then delete the old file and its -wal and -shm files. This guide includes code that does it with Fast SQL."
  - question: "Is SQLite encryption available on the web in Capacitor?"
    answer: "No. SQLCipher runs on iOS and Android only. On the web there is no secure place to keep the key anyway, so do not store sensitive data in the browser build, or require the user to sign in and fetch it from your backend."
  - question: "What happens if the encryption key is lost?"
    answer: "The database cannot be opened and the data cannot be recovered. That is the point of encryption. Design for it: keep the server as the source of truth, catch the open error, delete the local file and resync."
---

To encrypt a SQLite database in Capacitor, use a plugin built with SQLCipher, open the database with an encryption key, and keep that key in the iOS Keychain or the Android Keystore instead of in your code. This guide does it with `@capgo/capacitor-fast-sql` on Capacitor 8: build setup for both platforms, key generation and storage, encrypting a database that already has user data, key rotation, and the failure cases you have to handle.

## What SQLCipher protects, and what it does not

SQLCipher is an open source extension of SQLite that encrypts every page of the database file with AES-256. Without the key the file is random bytes. It also covers the WAL and journal files.

It protects against:

- someone copying the app's files from a jailbroken or rooted device, an unencrypted backup, or a lost phone with a weak passcode,
- forensic tools that read app containers,
- other apps reading the file through a misconfigured shared directory.

It does not protect against:

- code running inside your app (a malicious dependency, an XSS bug in the WebView) that can call your data layer,
- an attacker who can extract the key, which is why key storage matters more than the cipher,
- data you also keep in plaintext elsewhere: logs, `localStorage`, caches, analytics events.

iOS and Android already encrypt app storage when the device is locked. SQLCipher adds a layer that does not depend on the device passcode and that survives backups. It is worth it for health, finance, and anything regulated. For a broader view of storage threats, see [secure database storage](/blog/secure-database-storage/).

## Prerequisites

Fast SQL installed and configured as in [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/), including the iOS local networking and Android localhost cleartext settings. Encryption is opt-in, so the base install does not include SQLCipher.

## Step 1: add SQLCipher to the native builds

### Android

Add the dependency to the **app-level** `android/app/build.gradle`:

```groovy
dependencies {
    implementation 'net.zetetic:sqlcipher-android:4.13.0'
}
```

The plugin README pins 4.13.0. Newer 4.x releases work as long as the major version stays 4. Without this dependency, `encrypted: true` fails with a clear error ("SQLCipher native library not found") instead of crashing.

SQLCipher ships native `.so` files for each ABI. Expect the APK to grow by a few megabytes. App Bundles only deliver the ABI each device needs.

### iOS

Switch the plugin to its SQLCipher subspec in `ios/App/Podfile`, after `bunx cap sync` has written the default entry:

```ruby
pod 'CapgoCapacitorFastSql/SQLCipher', :path => '../../node_modules/@capgo/capacitor-fast-sql'
```

Then:

```bash
cd ios/App && pod install
```

`bunx cap sync` regenerates the Capacitor section of the Podfile, so check this line after every sync. Without the subspec the plugin builds against the system SQLite, and opening with `encrypted: true` returns `Encryption is not available in this build`.

### Web

There is no SQLCipher on the web. Fast SQL's `encrypted` option is iOS and Android only. If your app also ships as a PWA, branch on `Capacitor.isNativePlatform()` and do not persist sensitive tables in the browser build.

## Step 2: generate a key

Use the Web Crypto API, which is available in the iOS and Android WebViews:

```typescript
export function generateKey(): string {
  const bytes = new Uint8Array(32); // 256 bits
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
```

This gives a 64-character hex string. SQLCipher treats the string as a passphrase and derives the actual key with PBKDF2-HMAC-SHA512 (256,000 iterations by default in SQLCipher 4). That derivation runs once per open and costs a noticeable fraction of a second on older phones, which is normal.

Do not use a user password directly as the key unless you want the database locked to that password. Users forget passwords, change them on another device, and pick weak ones. A random device key plus secure storage is the usual design. If you need user-gated access, gate access to the key (with biometrics) instead.

## Step 3: store the key in the Keychain or Keystore

`@capgo/capacitor-native-biometric` stores arbitrary strings encrypted at rest with the iOS Keychain and Android Keystore. `setData` and `getData` (plugin 8.6.0 and later) do not prompt the user. Add `accessControl` to require Face ID, Touch ID or fingerprint before the key can be read.

```bash
bun add @capgo/capacitor-native-biometric
bunx cap sync
```

```typescript
// src/db/key.ts
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { generateKey } from './generate-key';

const KEY_NAME = 'app.db.key';

export async function getOrCreateDbKey(): Promise<{ key: string; created: boolean }> {
  const { isSaved } = await NativeBiometric.isDataSaved({ key: KEY_NAME });
  if (isSaved) {
    const { value } = await NativeBiometric.getData({ key: KEY_NAME });
    return { key: value, created: false };
  }
  const key = generateKey();
  await NativeBiometric.setData({ key: KEY_NAME, value: key });
  return { key, created: true };
}

export async function deleteDbKey(): Promise<void> {
  await NativeBiometric.deleteData({ key: KEY_NAME });
}
```

### Optional: require biometrics to unlock the database

```typescript
import { AccessControl, NativeBiometric } from '@capgo/capacitor-native-biometric';

// When creating the key
await NativeBiometric.setData({
  key: 'app.db.key',
  value: generateKey(),
  accessControl: AccessControl.BIOMETRY_ANY,
});

// When opening the database
const { value: key } = await NativeBiometric.getSecureData({
  key: 'app.db.key',
  reason: 'Unlock your records',
});
```

`BIOMETRY_ANY` survives a new fingerprint or face being enrolled. `BIOMETRY_CURRENT_SET` invalidates the key when enrollment changes, which is stricter but means the local database becomes unreadable when the user adds a fingerprint. Only choose it if the data can be resynced from your server. More on prompts and fallbacks in [biometric authentication in Capacitor apps](/blog/biometric-authentication-in-capacitor-apps/).

### Where not to put the key

- In your JavaScript, `.env` files, or `capacitor.config.ts`. All of them ship inside the app bundle and anyone can unzip an IPA or APK.
- In `@capacitor/preferences` or `localStorage`. Those are plaintext.
- Fetched from your API on every launch without any local copy. The app would not open offline, which defeats the purpose of a local database. Fetching it once after login and storing it in the Keychain or Keystore is fine.

## Step 4: open the encrypted database

```typescript
// src/db/index.ts
import { FastSQL, type SQLConnection } from '@capgo/capacitor-fast-sql';
import { getOrCreateDbKey } from './key';
import { migrate } from './migrate';

let dbPromise: Promise<SQLConnection> | null = null;

export function getDb(): Promise<SQLConnection> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const { key } = await getOrCreateDbKey();
      const db = await FastSQL.connect({
        database: 'vault',
        encrypted: true,
        encryptionKey: key,
        walMode: true,
      });
      await verifyKey(db);
      await migrate(db);
      return db;
    })();
  }
  return dbPromise;
}

// SQLCipher only notices a wrong key when it reads the first page
async function verifyKey(db: SQLConnection): Promise<void> {
  await db.query('SELECT count(*) AS n FROM sqlite_master');
}
```

`verifyKey` matters. SQLCipher does not validate the key at open time. The first real read fails with `file is not a database` if the key is wrong, so do a cheap read immediately and handle the error in one place instead of in the middle of a screen.

To check that encryption is active, run `PRAGMA cipher_version` on the connection. It returns the SQLCipher version, and an empty result on plain SQLite.

## Step 5: handle a lost or wrong key

A key can go missing in normal use:

- The user restores a backup on a new phone. The database file comes back, but Keychain items created as device-only and Android Keystore keys do not move to new hardware.
- Android Auto Backup restores the app's files but the Keystore key used to encrypt the stored secret was not restored.
- The user changes biometric enrollment and you used `BIOMETRY_CURRENT_SET`.

The recovery is always the same: the data is gone locally, so delete the file and start over, then resync from your backend.

```typescript
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FastSQL } from '@capgo/capacitor-fast-sql';
import { deleteDbKey } from './key';

export async function resetEncryptedDatabase(name = 'vault'): Promise<void> {
  try {
    await FastSQL.disconnect(name);
  } catch {
    // not connected
  }
  // Fast SQL stores <name>.db in Documents on iOS and in files/ on Android.
  // Directory.Data maps to those two locations.
  for (const suffix of ['', '-wal', '-shm']) {
    await Filesystem.deleteFile({ path: `${name}.db${suffix}`, directory: Directory.Data }).catch(
      () => undefined,
    );
  }
  await deleteDbKey();
}
```

Call it when `verifyKey` fails with `file is not a database`, reset the `dbPromise`, then open again. A new key is generated and an empty database is created.

Two related settings to review:

- On Android, consider excluding the database from Auto Backup in `data_extraction_rules.xml` if it cannot be decrypted after restore anyway. It saves your users a confusing reset.
- On iOS, files in `Documents` go to iCloud backups. Encrypted, so readable only with the key, but excluding them keeps backups small if the data can be resynced.

## Encrypting an existing plaintext database

If your app already shipped with an unencrypted database, you cannot flip `encrypted: true` on the same file. SQLCipher would try to decrypt plaintext pages and fail. Copy the data into a new encrypted database once:

```typescript
// src/db/encrypt-existing.ts
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FastSQL, type SQLConnection } from '@capgo/capacitor-fast-sql';

export async function encryptExistingDatabase(
  plainName: string,
  encryptedName: string,
  key: string,
): Promise<SQLConnection> {
  const plain = await FastSQL.connect({ database: plainName });
  const enc = await FastSQL.connect({ database: encryptedName, encrypted: true, encryptionKey: key });

  const objects = (await plain.query(
    `SELECT type, name, sql FROM sqlite_master
     WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%'
     ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1 WHEN 'view' THEN 2 ELSE 3 END`,
  )) as { type: string; name: string; sql: string }[];

  const [{ user_version }] = await plain.query('PRAGMA user_version');

  const tables = objects.filter((o) => o.type === 'table');
  const others = objects.filter((o) => o.type !== 'table'); // indexes, triggers, views

  await enc.transaction(async (tx) => {
    for (const t of tables) {
      await tx.execute(t.sql);
    }
    for (const t of tables) {
      const rows = await plain.query(`SELECT * FROM "${t.name}"`);
      if (rows.length === 0) continue;
      const columns = Object.keys(rows[0]);
      const statement = `INSERT INTO "${t.name}" (${columns.map((c) => `"${c}"`).join(', ')})
                         VALUES (${columns.map(() => '?').join(', ')})`;
      await tx.executeBatch(rows.map((r) => ({ statement, params: columns.map((c) => r[c]) })));
    }
    // Indexes and triggers after the data: faster, and triggers do not fire during the copy
    for (const o of others) {
      await tx.execute(o.sql);
    }
    await tx.execute(`PRAGMA user_version = ${Number(user_version)}`);
  });

  await FastSQL.disconnect(plainName);
  for (const suffix of ['', '-wal', '-shm']) {
    await Filesystem.deleteFile({ path: `${plainName}.db${suffix}`, directory: Directory.Data }).catch(
      () => undefined,
    );
  }
  return enc;
}
```

Run it once, guarded by a flag stored after success, and show a progress state because it reads every row. Notes:

- Tables are created and filled first, indexes, triggers and views afterwards. Building indexes once at the end is faster, and triggers do not fire while existing rows are copied.
- `sqlite_sequence` is skipped. SQLite updates it automatically when rows with explicit ids are inserted, so `AUTOINCREMENT` continues from the highest id.
- Virtual tables (FTS) create internal shadow tables. Recreate FTS tables from their `CREATE VIRTUAL TABLE` statement and rebuild the index instead of copying the shadow tables.
- For very large tables, page through with `WHERE rowid > ? ORDER BY rowid LIMIT 5000` instead of a single `SELECT *`.
- Deleting the plaintext file is the point of the exercise. Deleted flash storage can still hold old blocks, but the file is no longer reachable through the file system.

## Rotating the key

SQLCipher re-encrypts the whole database with `PRAGMA rekey`. With Fast SQL you run it as a statement on an open encrypted connection:

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { getDb } from './index';
import { generateKey } from './generate-key';

export async function rotateKey(): Promise<void> {
  const db = await getDb();
  const newKey = generateKey(); // hex only, safe to inline
  await db.execute(`PRAGMA rekey = '${newKey}'`);
  await NativeBiometric.setData({ key: 'app.db.key', value: newKey });
}
```

Order matters. If the app is killed between the two lines, the database uses the new key while the Keychain still has the old one. To avoid that, write the new key under a second name first, rekey, then promote it and delete the old entry, and on startup try the pending key if the main one fails. `PRAGMA` does not accept bound parameters, which is why the key is inlined. Only inline values you generated, never user input. Test rotation on both platforms with a copy of production-sized data, since `rekey` rewrites every page.

## Encryption with other plugins

| Plugin | How encryption works | Key handling |
| --- | --- | --- |
| `@capgo/capacitor-fast-sql` | Opt-in SQLCipher on iOS and Android | You pass the key on `connect()` |
| `@capacitor-community/sqlite` | SQLCipher always bundled, enabled in `capacitor.config` | The plugin stores one passphrase per app with `setEncryptionSecret()`, modes `secret`, `encryption` (encrypt an existing file), `newsecret` |
| `@capgo/capacitor-data-storage-sqlite` | SQLCipher for its key-value store | Passphrase set in `capacitor.config`, so it ships in the app |

The community plugin's `encryption` mode can encrypt an existing database in place, which is convenient if you are already on it. With a passphrase in `capacitor.config` (data-storage-sqlite), treat encryption as obfuscation: the secret is in the bundle. For truly sensitive values, prefer Fast SQL with a key from secure storage. See [key-value storage options in Capacitor](/blog/capacitor-key-value-storage/) for that trade-off.

## Compliance notes

- **App Store export compliance.** Shipping SQLCipher means your app contains encryption. App Store Connect asks about it for each build (or you set `ITSAppUsesNonExemptEncryption` in `Info.plist`). Encryption of the user's own data on the device commonly falls under exemptions, but the answer depends on your app and the countries you distribute to. Check Apple's guidance and get advice if you are unsure. Our [app encryption overview](/blog/app-encryption/) covers the broader picture.
- **SQLCipher license.** The community edition uses a BSD-style license that requires its copyright notice in your app. Add it to your open source licenses screen.
- **Google Play Data safety.** You can declare data as encrypted at rest. Make sure that is true for every copy, including caches and logs.

## Troubleshooting

**`file is not a database` on the first query.** Wrong key, or the file is plaintext and you opened it with `encrypted: true`. Check that the key in secure storage is the one used at creation, then use the migration above for plaintext files.

**`Encryption is not available in this build` on iOS.** The Podfile still uses the default subspec. Re-add the `CapgoCapacitorFastSql/SQLCipher` line after `cap sync` and run `pod install`.

**`SQLCipher native library not found` on Android.** The `sqlcipher-android` dependency is missing from the app module, or you added it to the plugin's or the root `build.gradle` instead.

**Opening the database is slow.** Key derivation runs on every open. Open once at startup and reuse the connection instead of connecting per query.

**The database opens on one device but not after restore.** The key did not travel with the backup. Handle it with the reset flow, and resync from the server.

## Summary

1. Add SQLCipher: `sqlcipher-android` in the Android app module, the `SQLCipher` subspec on iOS.
2. Generate a random 256-bit key on first launch.
3. Store it with `@capgo/capacitor-native-biometric` (`setData`, optionally with `accessControl`).
4. Open with `encrypted: true`, then read once to verify the key.
5. Plan for key loss: reset and resync.
6. Migrate existing plaintext databases once, and rotate keys with `PRAGMA rekey` if your policy requires it.

Native changes like adding SQLCipher need a new store build. [Capgo Build](/native-build/) can produce signed iOS and Android binaries without a local Mac, and the [Fast SQL docs](/docs/plugins/fast-sql/) list every connection option.
