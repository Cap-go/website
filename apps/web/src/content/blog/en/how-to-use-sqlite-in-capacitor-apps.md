---
slug: how-to-use-sqlite-in-capacitor-apps
title: "How to Use SQLite in a Capacitor App (2026 Guide)"
description: "Learn how to use SQLite in a Capacitor app: pick a plugin, open a database, run migrations, transactions, encryption and web support, with working code."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor logo for a guide on using SQLite in a Capacitor app"
keywords: sqlite capacitor, capacitor sqlite, capacitor sqlite plugin, sqlite ionic capacitor, capacitor fast sql, offline database capacitor, capacitor 8 sqlite
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best SQLite plugin for Capacitor 8?"
    answer: "For new apps, @capgo/capacitor-fast-sql is a strong default: it supports iOS, Android and web (SQLite Wasm with OPFS), optional SQLCipher encryption, transactions, batches and BLOBs, and it moves query data over a local HTTP channel instead of the Capacitor bridge. @capacitor-community/sqlite is the mature alternative and is required if you want TypeORM's built-in capacitor driver."
  - question: "Can I use SQLite in a Capacitor app on the web?"
    answer: "Yes. Fast SQL uses the official @sqlite.org/sqlite-wasm build with OPFS persistence on the web. Your server must send Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp, otherwise the plugin falls back to a non-persistent database."
  - question: "How do I run schema migrations with SQLite in Capacitor?"
    answer: "Store the schema version in PRAGMA user_version, keep an ordered list of migration steps in your code, and on startup run every step newer than the stored version inside a transaction, bumping user_version at the end of each step. Never edit a step that already shipped."
  - question: "Is SQLite better than Capacitor Preferences or localStorage?"
    answer: "For more than a handful of values, yes. Preferences is meant for small key-value settings, and WebView storage like localStorage or IndexedDB can be evicted by the OS. SQLite gives you a real file on disk, indexes, transactions and queries."
  - question: "Does the database survive a Capgo live update?"
    answer: "Yes. Live updates replace the web bundle, not the app data directory, so the SQLite file stays. Your migration code ships with the bundle, so keep migrations additive so an older bundle can still read a newer schema after a rollback."
---

To use SQLite in a Capacitor app, install a native SQLite plugin such as `@capgo/capacitor-fast-sql`, open a database once at startup, create your schema with versioned migrations, then read and write with parameterized SQL. This guide walks through that full setup on Capacitor 8 for iOS, Android and the web, including transactions, encryption, file locations, and the errors you are most likely to hit.

If you only need a few settings, SQLite is overkill. If you store lists, records, or anything you want to filter, sort, or sync, it is the right tool.

## When SQLite is the right storage choice

Capacitor apps have several places to put data. They solve different problems:

| Storage | Good for | Limits |
| --- | --- | --- |
| `localStorage` / IndexedDB | Throwaway cache | Lives inside the WebView, the OS can evict it, no real queries in localStorage |
| `@capacitor/preferences` | A few small settings (theme, language) | String values only, not meant for large data, not encrypted |
| Keychain / Keystore storage | Tokens, encryption keys | Small secrets only |
| Files (`@capacitor/filesystem`) | Images, PDFs, exports | No querying |
| SQLite | Records, offline data, sync queues, search | You manage schema and migrations |

Pick SQLite when you need any of these: offline-first data, more than a few hundred records, filters and sorting, relations between tables, atomic multi-step writes, or encryption at rest for structured data.

## Choosing a Capacitor SQLite plugin in 2026

There are three realistic options for native SQLite on Capacitor 8:

| | `@capgo/capacitor-fast-sql` | `@capacitor-community/sqlite` | `@capgo/capacitor-data-storage-sqlite` |
| --- | --- | --- | --- |
| Purpose | General SQL database | General SQL database | String key-value store on SQLite |
| Platforms | iOS, Android, Web | iOS, Android, Web, Electron | iOS, Android, Web, Electron |
| Web engine | Official SQLite Wasm + OPFS | jeep-sqlite (sql.js + IndexedDB) | IndexedDB |
| Data transport | Local HTTP channel, bypasses the bridge | Capacitor bridge | Capacitor bridge |
| Encryption | Optional SQLCipher (iOS, Android) | SQLCipher always bundled | SQLCipher, passphrase in config |
| Row format | Objects keyed by column | Objects keyed by column | Strings |
| ORM support | Custom drivers (Kysely, Drizzle) | TypeORM built-in driver | None |

This guide uses Fast SQL. It is maintained by Capgo, tracks Capacitor major versions (plugin v8 for Capacitor 8), keeps SQLCipher opt-in, and avoids serializing large result sets through the bridge. If you already run the community plugin, read our [comparison and migration guide](/blog/capacitor-community-sqlite-alternative/) first.

## Install Fast SQL

```bash
bun add @capgo/capacitor-fast-sql
bunx cap sync
```

Fast SQL starts a small HTTP server bound to `localhost` and sends SQL to it with a per-connection bearer token. Both platforms block cleartext HTTP by default, so allow it for loopback only.

### iOS: allow local networking

Add this to `ios/App/App/Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsLocalNetworking</key>
    <true/>
</dict>
```

`NSAllowsLocalNetworking` only covers loopback and local addresses. It does not relax App Transport Security for your real API calls.

### Android: allow cleartext to localhost

Create `android/app/src/main/res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">localhost</domain>
        <domain includeSubdomains="false">127.0.0.1</domain>
    </domain-config>
</network-security-config>
```

Reference it in `android/app/src/main/AndroidManifest.xml`:

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
```

If you already have a network security config (for SSL pinning, for example), add the `domain-config` block to it instead of creating a second file.

## Open the database once

Create a single module that owns the connection. Opening the same database repeatedly is wasteful, and you want one place to run migrations.

```typescript
// src/db/index.ts
import { FastSQL, type SQLConnection } from '@capgo/capacitor-fast-sql';
import { migrate } from './migrate';

let dbPromise: Promise<SQLConnection> | null = null;

export function getDb(): Promise<SQLConnection> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await FastSQL.connect({
        database: 'notes',
        walMode: true, // PRAGMA journal_mode = WAL
        performancePresets: true, // synchronous=NORMAL, busy_timeout, foreign_keys=ON
      });
      await migrate(db);
      return db;
    })().catch((error) => {
      dbPromise = null; // let the next call retry instead of reusing the failure
      throw error;
    });
  }
  return dbPromise;
}
```

`walMode` and `performancePresets` are available from plugin version 8.0.49. `performancePresets` also turns on `foreign_keys`, which SQLite leaves off by default, so `ON DELETE CASCADE` actually works.

Call `getDb()` wherever you need the database. The first call opens and migrates, later calls reuse the same promise. If opening or migrating fails, the next call tries again.

## Schema migrations with PRAGMA user_version

Fast SQL gives you raw SQL, not a migration framework, which is fine because SQLite already has a version slot in the file header: `PRAGMA user_version`. Keep an ordered array of steps and apply only what is missing.

```typescript
// src/db/migrate.ts
import type { SQLConnection } from '@capgo/capacitor-fast-sql';

// Index 0 = version 1, index 1 = version 2, ...
// Never edit a step after it shipped. Add a new one.
const steps: string[][] = [
  [
    `CREATE TABLE IF NOT EXISTS notes (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       body TEXT,
       created_at INTEGER NOT NULL
     )`,
  ],
  [
    `ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0`,
    `CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes (created_at)`,
  ],
];

export async function migrate(db: SQLConnection): Promise<void> {
  const rows = await db.query('PRAGMA user_version');
  const current = Number(rows[0]?.user_version ?? 0);

  for (let version = current; version < steps.length; version++) {
    await db.transaction(async (tx) => {
      for (const statement of steps[version]) {
        await tx.execute(statement);
      }
      // PRAGMA does not accept bound parameters, the value is a trusted integer
      await tx.execute(`PRAGMA user_version = ${version + 1}`);
    });
  }
}
```

Rules that keep this safe:

- One SQL statement per `execute()` call. Both native implementations prepare only the first statement of a string, so `"CREATE ...; CREATE ..."` silently runs one of them.
- Each version runs in a transaction, so a crash halfway leaves the database at the previous version and the step re-runs next launch.
- Prefer additive changes (new tables, new nullable columns). SQLite supports `ALTER TABLE ... DROP COLUMN` and `RENAME COLUMN` in recent versions, but the system SQLite on older Android releases may be behind, so the portable way to reshape a table is create new table, copy, drop old, rename.

### Migrations and live updates

If you ship JavaScript changes with [Capgo live updates](/live-update/), your migration code ships with the bundle. That is convenient, since a schema change does not need a store release. It also means a rollback can put an older bundle on top of a newer schema. Keep migrations backward compatible (add columns, do not rename or drop them in the same release that stops using them) and an older bundle keeps working.

## Reading and writing data

`SQLConnection` gives you four methods you will use all the time:

| Method | Returns | Use for |
| --- | --- | --- |
| `query(sql, params)` | `SQLRow[]` | SELECT and PRAGMA reads |
| `run(sql, params)` | `{ rowsAffected, insertId }` | INSERT, UPDATE, DELETE |
| `execute(sql, params)` | `{ rows, rowsAffected, insertId }` | Anything, full result |
| `executeBatch(ops)` | `SQLResult[]` | Many statements in one round trip |

Always bind values with `?` placeholders. Never build SQL with string concatenation from user input.

```typescript
// src/db/notes.ts
import { getDb } from './index';

export interface Note {
  id: number;
  title: string;
  body: string | null;
  created_at: number;
  pinned: number;
}

export async function addNote(title: string, body: string | null): Promise<number> {
  const db = await getDb();
  const { insertId } = await db.run(
    'INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)',
    [title, body, Date.now()],
  );
  if (insertId == null) throw new Error('Insert did not return an id');
  return insertId;
}

export async function listNotes(search = ''): Promise<Note[]> {
  const db = await getDb();
  const rows = await db.query(
    'SELECT id, title, body, created_at, pinned FROM notes WHERE title LIKE ? ORDER BY pinned DESC, created_at DESC',
    [`%${search}%`],
  );
  return rows as unknown as Note[];
}

export async function setPinned(id: number, pinned: boolean): Promise<void> {
  const db = await getDb();
  await db.run('UPDATE notes SET pinned = ? WHERE id = ?', [pinned ? 1 : 0, id]);
}

export async function deleteNote(id: number): Promise<number> {
  const db = await getDb();
  const { rowsAffected } = await db.run('DELETE FROM notes WHERE id = ?', [id]);
  return rowsAffected;
}
```

Rows come back as plain objects keyed by column name, so there is no columns/values mapping step. SQLite has no boolean type, so store `1` and `0` and convert at the edge of your data layer, as `setPinned` does.

## Transactions and batch writes

Wrap every multi-step write in a transaction. It keeps data consistent and it is much faster, because SQLite syncs to disk once per commit instead of once per statement.

```typescript
import { getDb } from './index';

export async function importNotes(items: { title: string; body: string }[]) {
  const db = await getDb();
  const now = Date.now();

  await db.transaction(async (tx) => {
    await tx.executeBatch(
      items.map((item) => ({
        statement: 'INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)',
        params: [item.title, item.body, now],
      })),
    );
  });
}
```

`transaction()` commits when the callback resolves and rolls back if it throws. If you need manual control there is also `beginTransaction()`, `commit()` and `rollback()` on the connection.

All calls share a single native connection per database. While a transaction is open, other code that writes to the same database runs inside it. Keep transactions short and avoid awaiting network requests inside them.

## Storing binary data

Pass a `Uint8Array` and you get a `Uint8Array` back. The plugin base64-encodes it for transport and stores a real BLOB.

```typescript
const db = await getDb();
await db.execute('CREATE TABLE IF NOT EXISTS thumbnails (note_id INTEGER PRIMARY KEY, data BLOB)');
await db.run('INSERT OR REPLACE INTO thumbnails (note_id, data) VALUES (?, ?)', [noteId, bytes]);

const [row] = await db.query('SELECT data FROM thumbnails WHERE note_id = ?', [noteId]);
const image = row?.data as Uint8Array | undefined;
```

Keep large media (photos, videos) as files and store only the path in SQLite. BLOBs are fine for thumbnails, small attachments, and embeddings.

## Encrypting the database

Fast SQL supports SQLCipher on iOS and Android. It is opt-in, so apps that do not need it do not ship it:

```typescript
const db = await FastSQL.connect({
  database: 'vault',
  encrypted: true,
  encryptionKey: keyFromSecureStorage,
});
```

On Android you add `net.zetetic:sqlcipher-android` to your app's `build.gradle`. On iOS you switch the pod to the `CapgoCapacitorFastSql/SQLCipher` subspec. Generating the key, storing it in the Keychain or Keystore, encrypting an existing plaintext database and rotating keys are covered step by step in [How to encrypt a SQLite database in Capacitor](/blog/encrypt-sqlite-database-capacitor/). Encryption is not available on the web.

## Web support

On the web Fast SQL uses the official `@sqlite.org/sqlite-wasm` build and stores the file in the Origin Private File System (OPFS). It is a real SQLite file, not a copy held in memory and flushed to IndexedDB.

OPFS needs cross-origin isolation, so your dev server and your production host must send two headers:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

With Vite:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    exclude: ['@sqlite.org/sqlite-wasm'],
  },
});
```

If the headers are missing, the plugin logs a warning and falls back to a non-persistent database: everything works until you reload. `CapgoCapacitorFastSql.configureWeb({ useOpfs, worker })` lets you change the defaults before the first `connect()`, and it is a no-op on native.

`require-corp` also blocks cross-origin images and scripts that do not send CORP or CORS headers, so test third-party embeds when you turn it on.

## Where the database file lives

| Platform | Location | Notes |
| --- | --- | --- |
| iOS | `Documents/<name>.db` | Included in iCloud and device backups by default |
| Android | `files/<name>.db` in the app's internal storage | Subject to Android Auto Backup rules |
| Web | OPFS for the page origin | Cleared if the user clears site data |

Two practical consequences. First, uninstalling the app deletes the file on both mobile platforms. Second, backups can restore the database file onto a new device. That is usually what you want, but if the database is encrypted with a key that does not travel with the backup, the restored file cannot be opened. The encryption guide covers how to handle that.

## Performance checklist

- Turn on `walMode`. Readers stop blocking the writer.
- Batch writes in a transaction with `executeBatch`. This is the single biggest win for imports and sync.
- Add indexes for columns you filter or sort on, then check with `EXPLAIN QUERY PLAN`.
- Select only the columns you need. Large `TEXT` and `BLOB` columns cost transfer time even over the HTTP channel.
- Paginate with `WHERE created_at < ? ORDER BY created_at DESC LIMIT 50` instead of large `OFFSET` values.
- After deleting a lot of data, run `VACUUM` occasionally to shrink the file. It rewrites the whole database, so do it during idle time.

## Troubleshooting

**`SQL execution failed` on iOS right after connect.** The local HTTP request was blocked. Check that `NSAllowsLocalNetworking` is in the right `Info.plist` and rebuild the native app, a live reload is not enough.

**`CLEARTEXT communication to localhost not permitted` on Android.** The network security config is missing or not referenced from the manifest.

**Only the first statement ran.** You passed several statements in one string. Split them, or use `executeBatch`.

**`no such table` after an update.** The migration did not run, or it ran against another database name. Log `PRAGMA user_version` at startup and compare with your steps array.

**A filter on a boolean or computed value never matches on Android.** For read queries the Android implementation binds parameters as text. Comparisons against a column with INTEGER affinity still work because SQLite converts the text, but comparisons against expressions (for example `json_extract(...) = ?` or `count(*) > ?`) compare text with a number. Pass `1`/`0` instead of `true`/`false`, and use `CAST(? AS INTEGER)` when comparing against an expression.

**`INSERT ... RETURNING` returns no rows on Android.** In the current plugin version, Android only returns rows for statements that start with `SELECT`, `PRAGMA` or `EXPLAIN`. Use `insertId` from `run()` and select the row afterwards. The same applies to queries that start with `WITH`: wrap them so they start with `SELECT`, or test them on Android early.

**Data disappears on reload in the browser.** OPFS is not available, almost always because the COOP/COEP headers are missing on the deployed host.

**`Encryption is not available in this build` on iOS.** You passed `encrypted: true` without switching to the SQLCipher subspec.

## Going further

Raw SQL is fine for small apps. Once you have more than a few tables, a typed layer helps:

- [Kysely with Capacitor and SQLite](/blog/kysely-capacitor-sqlite/): typed query builder with a small custom driver for Fast SQL.
- [Drizzle ORM with Capacitor and SQLite](/blog/drizzle-orm-capacitor-sqlite/): schema in TypeScript, generated migrations.
- [TypeORM with Capacitor and SQLite](/blog/typeorm-capacitor-sqlite/): decorators and repositories.
- [Key-value storage options in Capacitor](/blog/capacitor-key-value-storage/): when Preferences or a KV table on SQLite is enough.

The plugin reference lives in the [Fast SQL docs](/docs/plugins/fast-sql/) and the [plugin page](/plugins/capacitor-fast-sql/). Fast SQL needs a native rebuild when you add it or change its configuration. If you do not want to maintain a Mac for that, [Capgo Build](/native-build/) can produce signed iOS and Android binaries in the cloud. Since April 2026 App Store uploads must be built with Xcode 26 or later, so check your build machine before the next release.
