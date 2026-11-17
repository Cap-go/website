---
slug: cordova-sqlite-storage-alternative
title: "cordova-sqlite-storage Alternative for Capacitor"
description: "cordova-sqlite-storage alternative for Capacitor: native SQLite with @capgo/capacitor-fast-sql, encryption, WAL mode, and a typed execute() API."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-17T11:00:00.000Z
updated_at: 2026-11-17T11:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a SQLite plugin guide"
keywords: cordova-sqlite-storage alternative, capacitor sqlite, capacitor fast sql, @capgo/capacitor-fast-sql
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-sqlite-storage alternative in Capacitor?"
    answer: "@capgo/capacitor-fast-sql replaces sqlitePlugin.openDatabase with connect(), execute(), and transaction helpers from definitions.ts."
  - question: "Is cordova-sqlite-storage still maintained?"
    answer: "npm lists cordova-sqlite-storage at version 7.0.0 with a registry modified date of 28 January 2025. Upstream is storesafe/cordova-sqlite-storage."
  - question: "Does Capgo support encryption?"
    answer: "Yes. SQLConnectionOptions in definitions.ts supports encrypted and encryptionKey on native platforms."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/fast-sql/, npm @capgo/capacitor-fast-sql, and GitHub Cap-go/capacitor-fast-sql."
---

The practical **cordova-sqlite-storage alternative** for a Capacitor app is [`@capgo/capacitor-fast-sql`](/plugins/capacitor-fast-sql/). It replaces `window.sqlitePlugin.openDatabase` and Web SQL style transactions with `FastSQL.connect()` and `execute()` plus an optional high throughput HTTP protocol. This guide covers npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-sqlite-storage in Capacitor

**cordova-sqlite-storage** on npm is version **7.0.0**. The registry `modified` timestamp is **28 January 2025**. The source lives at [storesafe/cordova-sqlite-storage](https://github.com/storesafe/cordova-sqlite-storage). The README describes a Web SQL inspired API:

- `sqlitePlugin.openDatabase({ name, location, ... })`
- `db.transaction(fn)` with `tx.executeSql(sql, params, success, error)`
- Browser fallback through sql.js without persistence by default
- Android `androidDatabaseProvider` and corruption warnings when multiple SQLite stacks share one file

In a Capacitor codebase the Cordova plugin still means a `before_plugin_install` hook, callback transactions, and no first class TypeScript for result rows.

[`@capgo/capacitor-fast-sql`](https://www.npmjs.com/package/@capgo/capacitor-fast-sql) latest on npm is **8.3.4** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `connect()`, `disconnect()`, `execute()`, `beginTransaction()`, `commitTransaction()`, `rollbackTransaction()`, `batchExecute()`, optional `walMode` and `performancePresets`, and web Worker configuration. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-fast-sql
bunx cap sync
```

On web, enable Cross Origin Isolation if you need OPFS persistence per the README in `definitions.ts` (`configureWeb()` before the first `connect()`).

## Usage example

```ts
import { FastSQL } from '@capgo/capacitor-fast-sql';

export async function openAppDb() {
  await FastSQL.connect({
    database: 'app',
    walMode: true,
    performancePresets: true,
  });

  await FastSQL.execute({
    database: 'app',
    statement: 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT)',
  });

  const { rows } = await CapgoCapacitorFastSql.execute({
    database: 'app',
    statement: 'SELECT * FROM users WHERE id = ?',
    params: [1],
  });
  return rows;
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
const db = window.sqlitePlugin.openDatabase({ name: 'app.db', location: 'default' });
db.transaction((tx) => {
  tx.executeSql('INSERT INTO users (email) VALUES (?)', ['a@b.co']);
});
```

```ts
// After (Capacitor)
import { FastSQL } from '@capgo/capacitor-fast-sql';

await FastSQL.connect({ database: 'app' });
await FastSQL.beginTransaction({ database: 'app' });
try {
  await FastSQL.execute({
    database: 'app',
    statement: 'INSERT INTO users (email) VALUES (?)',
    params: ['a@b.co'],
  });
  await FastSQL.commitTransaction({ database: 'app' });
} catch (e) {
  await FastSQL.rollbackTransaction({ database: 'app' });
  throw e;
}
```

### API mapping table

| cordova-sqlite-storage (`sqlitePlugin` / Web SQL) | @capgo/capacitor-fast-sql |
| --- | --- |
| `openDatabase({ name, ... })` | `connect({ database, encrypted?, walMode?, ... })` |
| Close database | `disconnect({ database })` |
| `tx.executeSql(sql, params, ...)` | `execute({ database, statement, params? })` returns `SQLResult` with `rows`, `rowsAffected`, `insertId` |
| `db.transaction(fn)` | `beginTransaction()` / `commitTransaction()` / `rollbackTransaction()` |
| Multiple statements in one transaction | Repeated `execute()` inside `beginTransaction()` / `commitTransaction()` |
| `location` / `iosDatabaseLocation` | App data directory file name via `database` string |
| `androidDatabaseProvider: 'system'` workaround | Single Capacitor native SQLite stack; avoid opening the same file with another plugin |
| Callback errors | Promise rejection |
| Cordova plugin install | `bun add @capgo/capacitor-fast-sql` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/fast-sql/](/docs/plugins/fast-sql/)
- Marketing page: [/plugins/capacitor-fast-sql/](/plugins/capacitor-fast-sql/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-fast-sql](https://www.npmjs.com/package/@capgo/capacitor-fast-sql)
- GitHub: [https://github.com/Cap-go/capacitor-fast-sql/](https://github.com/Cap-go/capacitor-fast-sql/)
- Cordova upstream: [https://github.com/storesafe/cordova-sqlite-storage](https://github.com/storesafe/cordova-sqlite-storage)

SQLite schema changes belong in a native release. Use [Capgo Build](/native-build/) when you add the plugin, then ship data access logic with [Capgo live updates](/live-update/) only for JavaScript that does not require a new store binary. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).