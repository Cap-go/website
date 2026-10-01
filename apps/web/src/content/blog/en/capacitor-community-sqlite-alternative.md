---
slug: capacitor-community-sqlite-alternative
title: "Alternative to @capacitor-community/sqlite in 2026"
description: "Looking for an alternative to @capacitor-community/sqlite? Compare it with Capgo Fast SQL and migrate your Capacitor SQLite code and user data step by step."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capgo logo for a guide on alternatives to the Capacitor community SQLite plugin"
keywords: capacitor community sqlite alternative, capacitor-community/sqlite, capacitor sqlite plugin, capacitor fast sql, migrate capacitor sqlite, ionic sqlite alternative
tag: Alternatives, Migration, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best alternative to @capacitor-community/sqlite?"
    answer: "@capgo/capacitor-fast-sql is the closest general-purpose alternative on Capacitor 8. It covers iOS, Android and web (official SQLite Wasm with OPFS), keeps SQLCipher optional, and moves query data over a local HTTP channel instead of the Capacitor bridge. If you depend on Electron or TypeORM's built-in capacitor driver, the community plugin is still the better fit."
  - question: "Can I keep my existing user data when switching SQLite plugins?"
    answer: "Yes. For unencrypted databases, close the community connection and copy the file it reports through getUrl() to the location Fast SQL uses. For encrypted ones, or if you want a fresh schema, open both plugins and copy table by table in JavaScript. Run the migration once and record that it finished."
  - question: "Does @capacitor-community/sqlite support Swift Package Manager?"
    answer: "Yes. Version 8.1.1 ships a Package.swift that depends on SQLCipher.swift, so it can be used with SPM-based Capacitor 8 projects. Fast SQL also ships a Package.swift."
  - question: "Is Fast SQL a drop-in replacement for the community plugin?"
    answer: "No. The API is different: one connect() call instead of createConnection plus open, query/run/execute on the connection, and no built-in upgradeStatements or JSON import/export. The mapping is mechanical and is listed in this guide."
  - question: "Why does the community plugin make my app bigger?"
    answer: "It bundles SQLCipher on iOS and Android whether or not you encrypt anything. Fast SQL only adds SQLCipher when you opt in, so apps without encryption ship with the system SQLite."
---

The main alternative to `@capacitor-community/sqlite` on Capacitor 8 is `@capgo/capacitor-fast-sql`: a native SQLite plugin for iOS, Android and the web that keeps SQLCipher optional and sends query data over a local HTTP channel instead of the Capacitor bridge. This guide compares the two honestly, says when to stay on the community plugin, and walks through migrating both your code and your users' existing databases.

## Why teams look for an alternative

`@capacitor-community/sqlite` has been the default SQLite plugin for Capacitor for years and it is still maintained (8.1.1 shipped in August 2026). The reasons people move are specific:

1. **Bridge serialization.** Every result goes through the Capacitor bridge as JSON. That is fine for small queries, and noticeable when you load thousands of rows for sync or search.
2. **SQLCipher is always included.** The plugin depends on SQLCipher on iOS and Android even if you never encrypt. That adds native size and means your binary contains encryption code you have to account for in export compliance answers.
3. **Web storage model.** On the web it uses the `jeep-sqlite` component: sql.js in memory, persisted to IndexedDB when you call `saveToStore()`. You must remember to save, and the whole database lives in memory.
4. **A large API surface.** Connection wrappers, consistency checks, read-only and non-conformed connections, sync tables, JSON import and export. Powerful, but a lot to learn for "run SQL".
5. **One passphrase per app.** Encryption uses a single secret stored by the plugin (`setEncryptionSecret`), shared by every encrypted database in the app.

## Side-by-side comparison

| | `@capacitor-community/sqlite` 8.1 | `@capgo/capacitor-fast-sql` 8.2 |
| --- | --- | --- |
| Platforms | iOS, Android, Web, Electron | iOS, Android, Web |
| Data path | Capacitor bridge | Local HTTP server with a per-connection token (native) |
| Web engine | jeep-sqlite (sql.js + IndexedDB, manual `saveToStore`) | Official `@sqlite.org/sqlite-wasm` with OPFS, writes go to the file |
| Encryption | SQLCipher always bundled, one plugin-managed passphrase | Optional SQLCipher, key passed per database on `connect()` |
| Swift Package Manager | Yes (`Package.swift`) | Yes (`Package.swift`) |
| Schema versioning | `upgradeStatements` / `addUpgradeStatement` | Your own, usually `PRAGMA user_version` |
| JSON import/export, sync tables | Yes | No |
| Prepopulated database from assets | `copyFromAssets()` | Copy the file yourself before `connect()` |
| Key-value helper | No | `KeyValueStore` |
| BLOBs | Yes | Yes, as `Uint8Array` |
| ORM support | TypeORM built-in `capacitor` driver | Custom drivers (Kysely works well) |
| Extra native setup | Web: copy `sql-wasm.wasm` | iOS `NSAllowsLocalNetworking`, Android localhost cleartext rule |
| Maintainer | Capacitor community | Capgo |

### When to stay on the community plugin

Be practical. Stay if:

- you ship an **Electron** build,
- you use **TypeORM** (its capacitor driver is written against the community plugin, see [TypeORM with Capacitor](/blog/typeorm-capacitor-sqlite/)),
- you rely on **JSON import/export or sync tables** and do not want to rebuild them,
- your queries are small and the app works well today.

### When Fast SQL is the better fit

Move if:

- you load or write large datasets (sync engines, offline catalogs, search indexes, CRDT logs),
- you want encryption only for some databases, with keys from the Keychain or Keystore,
- you do not want SQLCipher in an app that does not need it,
- you want a real SQLite file on the web through OPFS instead of an in-memory copy,
- you want a simple API: connect, query, run, transaction.

For a full walkthrough of Fast SQL itself, see [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/).

## Step 1: install Fast SQL next to the old plugin

Keep the community plugin installed for one release so you can migrate existing data.

```bash
bun add @capgo/capacitor-fast-sql
bunx cap sync
```

Native configuration Fast SQL needs:

- **iOS**: `NSAppTransportSecurity` > `NSAllowsLocalNetworking` = `true` in `Info.plist`.
- **Android**: a `network_security_config.xml` that permits cleartext to `localhost` and `127.0.0.1`, referenced from the manifest.
- **Encryption**: `net.zetetic:sqlcipher-android` in the Android app module and the `CapgoCapacitorFastSql/SQLCipher` pod on iOS. Details in [encrypting SQLite in Capacitor](/blog/encrypt-sqlite-database-capacitor/).
- **Web**: `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers for OPFS.

## Step 2: map the API

### Opening a database

Before:

```typescript
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);
const db = await sqlite.createConnection('app', false, 'no-encryption', 1, false);
await db.open();
```

After:

```typescript
import { FastSQL } from '@capgo/capacitor-fast-sql';

const db = await FastSQL.connect({ database: 'app', walMode: true, performancePresets: true });
```

`FastSQL.connect()` returns the existing connection if the database is already open, so there is no `isConnection` / `retrieveConnection` dance.

### Method mapping

| Community plugin | Fast SQL |
| --- | --- |
| `createConnection()` + `open()` | `FastSQL.connect({ database })` |
| `closeConnection(name)` | `FastSQL.disconnect(name)` |
| `db.query(sql, values)` returns `{ values }` | `db.query(sql, params)` returns rows |
| `db.run(sql, values)` returns `{ changes: { changes, lastId } }` | `db.run(sql, params)` returns `{ rowsAffected, insertId }` |
| `db.execute(multiStatementString)` | One `db.execute(sql)` per statement, or `db.executeBatch([...])` |
| `db.executeSet(set)` | `db.executeBatch(ops)` with `{ statement, params }` |
| `beginTransaction` / `commitTransaction` / `rollbackTransaction` | `db.transaction(async (tx) => ...)` or `beginTransaction()` / `commit()` / `rollback()` |
| `addUpgradeStatement` / `upgradeStatements` | A `PRAGMA user_version` migration runner |
| `copyFromAssets()` | Copy a bundled `.db` into `Directory.Data` before the first `connect()` |
| `setEncryptionSecret()` + `mode: 'secret'` | `encrypted: true, encryptionKey` on `connect()` |
| `initWebStore()` / `saveToStore()` | Not needed, OPFS persists writes |

### Queries and writes

Before:

```typescript
const res = await db.query('SELECT * FROM notes WHERE pinned = ?', [1]);
const notes = res.values ?? [];

const { changes } = await db.run('INSERT INTO notes (title) VALUES (?)', ['Hello']);
const id = changes?.lastId;
```

After:

```typescript
const notes = await db.query('SELECT * FROM notes WHERE pinned = ?', [1]);

const { insertId } = await db.run('INSERT INTO notes (title) VALUES (?)', ['Hello']);
```

Both plugins return rows as objects keyed by column name.

### Multi-statement execute

The community `execute()` accepts a string with several statements separated by `;`. Fast SQL prepares one statement per call. Split your SQL, or better, keep statements as an array:

```typescript
const schema = [
  'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)',
  'CREATE INDEX IF NOT EXISTS idx_notes_title ON notes (title)',
];

await db.executeBatch(schema.map((statement) => ({ statement })));
```

Do not split on `;` with a naive `split(';')` if any statement contains a trigger body or a string literal with a semicolon.

### Upgrade statements to user_version

The community plugin stores the schema version in `PRAGMA user_version` too. If you keep the same version numbers, your existing users' databases are already at the right version after the file migration in step 3.

```typescript
import type { SQLConnection } from '@capgo/capacitor-fast-sql';

// Same content as your old upgrade statements, index 0 = version 1
const versions: string[][] = [
  ['CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)'],
  ['ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0'],
];

export async function migrate(db: SQLConnection) {
  const [{ user_version }] = await db.query('PRAGMA user_version');
  for (let v = Number(user_version); v < versions.length; v++) {
    await db.transaction(async (tx) => {
      for (const statement of versions[v]) await tx.execute(statement);
      await tx.execute(`PRAGMA user_version = ${v + 1}`);
    });
  }
}
```

Check the actual `user_version` on an existing install before relying on this. Log it from the old plugin in your current release if you are not sure.

### Prepopulated databases

The community plugin's `copyFromAssets()` copies bundled databases on first launch. With Fast SQL, put the file where the plugin looks before connecting. Fast SQL stores `<name>.db` in `Documents` on iOS and in the app's `files` directory on Android, which are both `Directory.Data` in `@capacitor/filesystem`:

```typescript
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FastSQL } from '@capgo/capacitor-fast-sql';

async function openCatalog() {
  const exists = await Filesystem.stat({ path: 'catalog.db', directory: Directory.Data })
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    const blob = await (await fetch('/assets/catalog.db')).blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(blob);
    });
    await Filesystem.writeFile({ path: 'catalog.db', data: base64, directory: Directory.Data });
  }
  return FastSQL.connect({ database: 'catalog', readOnly: true });
}
```

For large files, download them in chunks or ship a compressed file and use the file plugin's native copy instead of base64 in JavaScript.

## Step 3: migrate existing user data

Users who update your app have a database created by the community plugin. It lives at a different path with a different name:

| | Community plugin | Fast SQL |
| --- | --- | --- |
| iOS | `Documents/<name>SQLite.db` (default `iosDatabaseLocation`) | `Documents/<name>.db` |
| Android | `databases/<name>SQLite.db` | `files/<name>.db` |

### Option A: copy the file (unencrypted databases)

Fastest, and it keeps everything: indexes, triggers, `user_version`.

```typescript
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export async function moveCommunityDatabase(name: string): Promise<void> {
  const done = await Preferences.get({ key: `sqlite-moved:${name}` });
  if (done.value === '1') return;

  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const exists = (await sqlite.isDatabase(name)).result;
  if (exists) {
    const conn = await sqlite.createConnection(name, false, 'no-encryption', 1, false);
    await conn.open();
    await conn.execute('PRAGMA wal_checkpoint(TRUNCATE)', false).catch(() => undefined);
    const { url } = await conn.getUrl();
    await sqlite.closeConnection(name, false);

    if (url) {
      await Filesystem.copy({ from: url, to: `${name}.db`, toDirectory: Directory.Data });
    }
  }
  await Preferences.set({ key: `sqlite-moved:${name}`, value: '1' });
}
```

Call it before the first `FastSQL.connect({ database: name })`. Notes:

- `getUrl()` (iOS and Android) returns the database file URL. Passing a full `file://` URL with no `directory` lets the Filesystem plugin read from any path inside your sandbox.
- Closing the connection and checkpointing first makes sure no recent writes are left in a `-wal` file.
- Keep the old file for one release and delete it later with the community connection's `delete()` method once you are confident. Then remove the community plugin.

### Option B: copy rows in JavaScript (encrypted databases, or a schema change)

When the source is encrypted with the community plugin's stored secret, the simplest safe path is to let that plugin decrypt and copy rows into a new Fast SQL database. This also lets you encrypt with a new per-database key from secure storage.

```typescript
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { FastSQL } from '@capgo/capacitor-fast-sql';

export async function copyRows(name: string, target: { encryptionKey?: string }) {
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const src = await sqlite.createConnection(name, true, 'secret', 1, false);
  await src.open();

  const dst = await FastSQL.connect({
    database: name,
    encrypted: Boolean(target.encryptionKey),
    encryptionKey: target.encryptionKey,
  });

  const objects = ((await src.query(
    `SELECT type, name, sql FROM sqlite_master
     WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%'`,
  )).values ?? []) as { type: string; name: string; sql: string }[];
  const tables = objects.filter((o) => o.type === 'table');
  const others = objects.filter((o) => o.type !== 'table');
  const version = (await src.query('PRAGMA user_version')).values?.[0]?.user_version ?? 0;

  await dst.transaction(async (tx) => {
    for (const t of tables) await tx.execute(t.sql);
    for (const t of tables) {
      const rows = (await src.query(`SELECT * FROM "${t.name}"`)).values ?? [];
      if (!rows.length) continue;
      const cols = Object.keys(rows[0]);
      const statement = `INSERT INTO "${t.name}" (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`;
      await tx.executeBatch(rows.map((r) => ({ statement, params: cols.map((c) => r[c]) })));
    }
    for (const o of others) await tx.execute(o.sql);
    await tx.execute(`PRAGMA user_version = ${Number(version)}`);
  });

  await sqlite.closeConnection(name, false);
}
```

Use `'no-encryption'` and `false` in `createConnection` if the source is not encrypted. The community plugin requires `iosIsEncryption` / `androidIsEncryption` in `capacitor.config` for its encrypted modes, which you already have if you used them. For large tables, page through with `WHERE rowid > ? ORDER BY rowid LIMIT 5000`.

Both plugins use SQLCipher 4 defaults, so an encrypted file may also open in Fast SQL directly with the same passphrase. The community plugin manages that passphrase internally, though, and row copying avoids depending on that detail.

## Step 4: remove the old plugin

After one or two releases with the migration in place:

```bash
bun remove @capacitor-community/sqlite jeep-sqlite
bunx cap sync
```

Remove `sql-wasm.wasm` from your assets and any `jeep-sqlite` setup in `main.ts`. Removing the plugin also removes its SQLCipher dependency, so if you do not opt into Fast SQL's encryption, the iOS and Android binaries get smaller.

Data migration code is JavaScript, so it can ship with [Capgo live updates](/live-update/), but the release that adds Fast SQL is a native change and needs a store build. Ship the native build first. [Capgo Build](/native-build/) can produce it in the cloud if you do not keep a Mac around (App Store uploads require Xcode 26 or later since April 2026).

## Troubleshooting

**Fast SQL connects but every query fails on iOS.** `NSAllowsLocalNetworking` is missing from the app's `Info.plist`, or the app was not rebuilt after adding it.

**Android: `CLEARTEXT communication to localhost not permitted`.** Add the localhost `domain-config` to your network security config. If you already had one for SSL pinning, merge them.

**Only part of my schema was created.** You passed a multi-statement string to `execute()`. Split it into an array.

**`INSERT ... RETURNING` returns nothing on Android.** In Fast SQL 8.2, Android returns rows only for statements starting with `SELECT`, `PRAGMA` or `EXPLAIN`. Use `insertId` from `run()`.

**Booleans do not match on Android reads.** Pass `1`/`0` instead of `true`/`false` in query parameters. Android binds read-query parameters as text.

**The copied database is empty.** The community plugin was configured with a custom `iosDatabaseLocation`, or the source name differs. Log the URL returned by `getUrl()`.

**Web data from the old plugin is gone.** The community plugin stored web data in IndexedDB through `jeep-sqlite`, Fast SQL uses OPFS. Re-sync web clients from your backend, or export with the old plugin's `exportToJson` and import rows into Fast SQL.

## Other options

- **`@capgo/capacitor-data-storage-sqlite`** if what you really need is a string key-value store backed by SQLite. See [key-value storage in Capacitor](/blog/capacitor-key-value-storage/).
- **An ORM or query builder on top**: [Kysely](/blog/kysely-capacitor-sqlite/) works with Fast SQL through a short custom driver. [Drizzle](/blog/drizzle-orm-capacitor-sqlite/) currently fits the community plugin better.

The full Fast SQL API is in the [plugin docs](/docs/plugins/fast-sql/) and on the [plugin page](/plugins/capacitor-fast-sql/).
