---
slug: kysely-capacitor-sqlite
title: "How to Use Kysely with Capacitor and SQLite"
description: "Use Kysely with Capacitor and SQLite: write a small Kysely dialect for Fast SQL, type your tables, run queries, transactions and in-app migrations."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor logo for a guide on using Kysely with Capacitor and SQLite"
keywords: kysely capacitor, kysely sqlite, capacitor sqlite query builder, kysely dialect, typescript sqlite mobile, capacitor fast sql
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does Kysely have a Capacitor dialect?"
    answer: "Kysely ships dialects for server databases. For Capacitor you plug in a small custom Dialect that reuses Kysely's SqliteAdapter, SqliteQueryCompiler and SqliteIntrospector and only implements the driver that talks to the native SQLite plugin. The full code for a Fast SQL driver is about 80 lines and is included in this guide."
  - question: "Is Kysely an ORM?"
    answer: "No. Kysely is a type-safe SQL query builder. It does not manage entities, relations or schema sync. You describe your tables as TypeScript interfaces and Kysely checks table names, column names and result types at compile time."
  - question: "How do I run Kysely migrations in a Capacitor app?"
    answer: "Use the Migrator from kysely/migration with an in-code MigrationProvider that returns an object of migrations. FileMigrationProvider needs Node's fs and does not work in a WebView. Migration names are sorted alphabetically, so prefix them with a number."
  - question: "Why does returning() give no rows on Android?"
    answer: "With @capgo/capacitor-fast-sql 8.2.x, Android returns rows only for statements that start with SELECT, PRAGMA or EXPLAIN. INSERT ... RETURNING executes but returns no rows there. Use executeTakeFirst() and read insertId, then select the row."
  - question: "Can I use Kysely with @capacitor-community/sqlite instead?"
    answer: "Yes, the same Dialect structure works. Only the connection class changes: call query() for reads and run() for writes, and map its values and changes fields to Kysely's QueryResult."
---

Kysely works well with Capacitor and SQLite because it only needs one thing from the platform: a driver that sends a SQL string with parameters and returns rows as objects. This guide builds that driver for `@capgo/capacitor-fast-sql`, then covers typed tables, CRUD, joins, transactions and migrations that run inside the app on iOS, Android and the web.

You get compile-time checked SQL without code generation and without a heavy runtime.

## Why Kysely fits mobile SQLite

Kysely is a query builder, not an ORM. You write something that reads like SQL, and TypeScript checks every table and column name and infers the result type.

- No decorators or reflection, so it works with Vite and esbuild out of the box.
- No code generation step. Your `Database` interface is the schema contract.
- Small runtime that tree-shakes well, which matters for app bundle size and for [live update](/live-update/) download size.
- The driver interface is tiny. Kysely already contains the SQLite query compiler, adapter and introspector, so you only write the transport.

If you have not set up SQLite in your app yet, start with [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/). It covers the native configuration Fast SQL needs (`NSAllowsLocalNetworking` on iOS and a localhost cleartext rule on Android).

## Install

```bash
bun add kysely @capgo/capacitor-fast-sql
bunx cap sync
```

This guide uses Kysely 0.29 and Fast SQL 8.2. In Kysely 0.29 the migration classes moved to the `kysely/migration` entry point.

## Write the Fast SQL dialect

A Kysely `Dialect` has four factories. Three of them come straight from Kysely's SQLite support. The fourth is our driver.

```typescript
// src/db/fast-sql-dialect.ts
import {
  CompiledQuery,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
  type DatabaseConnection,
  type DatabaseIntrospector,
  type Dialect,
  type DialectAdapter,
  type Driver,
  type Kysely,
  type QueryCompiler,
  type QueryResult,
} from 'kysely';
import {
  FastSQL,
  type SQLConnection,
  type SQLConnectionOptions,
  type SQLValue,
} from '@capgo/capacitor-fast-sql';

// Kysely passes JS values as-is. Normalize them to what SQLite stores.
function toSqlValue(value: unknown): SQLValue {
  if (value === undefined || value === null) return null;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'bigint') return Number(value);
  if (value instanceof Uint8Array) return value;
  if (typeof value === 'object') return JSON.stringify(value);
  return value as SQLValue;
}

class FastSqlConnection implements DatabaseConnection {
  constructor(readonly db: SQLConnection) {}

  async executeQuery<R>(compiled: CompiledQuery): Promise<QueryResult<R>> {
    const result = await this.db.execute(compiled.sql, compiled.parameters.map(toSqlValue));
    return {
      rows: result.rows as R[],
      numAffectedRows: result.rowsAffected != null ? BigInt(result.rowsAffected) : undefined,
      insertId: result.insertId != null ? BigInt(result.insertId) : undefined,
    };
  }

  // eslint-disable-next-line require-yield
  async *streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Streaming is not supported by the Fast SQL driver');
  }
}

// One native connection per database, so serialize access to it.
class ConnectionMutex {
  #pending: Promise<void> = Promise.resolve();
  #release?: () => void;

  async lock(): Promise<void> {
    const previous = this.#pending;
    let release!: () => void;
    this.#pending = new Promise<void>((resolve) => (release = resolve));
    await previous;
    this.#release = release;
  }

  unlock(): void {
    const release = this.#release;
    this.#release = undefined;
    release?.();
  }
}

class FastSqlDriver implements Driver {
  #connection?: FastSqlConnection;
  readonly #mutex = new ConnectionMutex();

  constructor(private readonly options: SQLConnectionOptions) {}

  async init(): Promise<void> {
    const db = await FastSQL.connect(this.options);
    this.#connection = new FastSqlConnection(db);
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    await this.#mutex.lock();
    return this.#connection!;
  }

  async releaseConnection(): Promise<void> {
    this.#mutex.unlock();
  }

  async beginTransaction(connection: DatabaseConnection): Promise<void> {
    await (connection as FastSqlConnection).db.beginTransaction();
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await (connection as FastSqlConnection).db.commit();
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await (connection as FastSqlConnection).db.rollback();
  }

  async destroy(): Promise<void> {
    if (this.#connection) {
      await FastSQL.disconnect(this.options.database);
      this.#connection = undefined;
    }
  }
}

export class FastSqlDialect implements Dialect {
  constructor(private readonly options: SQLConnectionOptions) {}

  createDriver(): Driver {
    return new FastSqlDriver(this.options);
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler();
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter();
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db);
  }
}
```

What each part does:

- **`toSqlValue`** converts booleans to `1`/`0`, dates to ISO strings and plain objects to JSON. SQLite has no boolean or date type, and on Android the plugin binds read-query parameters as text, so `true` would arrive as the string `'true'` and never match a `1`.
- **`FastSqlConnection.executeQuery`** calls `execute()` on the Fast SQL connection, which goes over the plugin's local HTTP channel on iOS and Android and through SQLite Wasm on the web. Rows already come back as objects keyed by column name, which is exactly what Kysely expects.
- **`ConnectionMutex`** matters. Fast SQL keeps one native connection per database. Without the lock, two concurrent Kysely transactions would interleave their statements on that one connection. Kysely's own SQLite driver uses the same pattern.
- **Transactions** go through the plugin's native `beginTransaction`, `commit` and `rollback` instead of raw `begin` SQL, so the plugin tracks transaction state correctly on both platforms.
- **Savepoints** are not implemented. If you call `savepoint()` on a controlled transaction, Kysely throws `The savepoint method is not supported by this driver`. Add `savepoint`, `rollbackToSavepoint` and `releaseSavepoint` methods that run the compiled savepoint SQL if you need them.

## Describe your tables

The `Database` interface maps table names to row types. Use Kysely's helper types to describe what the database fills in.

```typescript
// src/db/schema.ts
import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface ProjectTable {
  id: Generated<number>;
  name: string;
  created_at: ColumnType<string, string | undefined, never>;
}

export interface TaskTable {
  id: Generated<number>;
  project_id: number;
  title: string;
  done: ColumnType<number, number | boolean | undefined, number | boolean>;
  due_at: string | null;
}

export interface Database {
  projects: ProjectTable;
  tasks: TaskTable;
}

export type Task = Selectable<TaskTable>;
export type NewTask = Insertable<TaskTable>;
export type TaskUpdate = Updateable<TaskTable>;
```

`Generated<number>` makes `id` optional on insert. `ColumnType<Select, Insert, Update>` lets a column read as one type and accept another, here `done` reads as a number but accepts booleans on write, which the driver turns into `1`/`0`. `never` on update means the column cannot be changed.

## Create the Kysely instance

```typescript
// src/db/index.ts
import { Kysely } from 'kysely';
import { FastSqlDialect } from './fast-sql-dialect';
import type { Database } from './schema';
import { runMigrations } from './migrations';

let instance: Promise<Kysely<Database>> | null = null;

export function getDb(): Promise<Kysely<Database>> {
  if (!instance) {
    instance = (async () => {
      const db = new Kysely<Database>({
        dialect: new FastSqlDialect({
          database: 'tasks',
          walMode: true,
          performancePresets: true, // also enables foreign_keys
        }),
      });
      await runMigrations(db);
      return db;
    })();
  }
  return instance;
}
```

Kysely calls the driver's `init()` lazily on the first query, so constructing the instance is cheap.

## Migrations inside the app

Kysely's `FileMigrationProvider` reads a folder with Node's `fs`, which does not exist in a WebView. Provide migrations in code instead. The `Migrator` stores applied names in a `kysely_migration` table and runs pending ones in order.

```typescript
// src/db/migrations.ts
import { sql, type Kysely } from 'kysely';
import { Migrator, type Migration, type MigrationProvider } from 'kysely/migration';

const migrations: Record<string, Migration> = {
  '0001_init': {
    async up(db: Kysely<any>) {
      await db.schema
        .createTable('projects')
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('created_at', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
        .execute();

      await db.schema
        .createTable('tasks')
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('project_id', 'integer', (col) =>
          col.notNull().references('projects.id').onDelete('cascade'),
        )
        .addColumn('title', 'text', (col) => col.notNull())
        .addColumn('done', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
    },
  },
  '0002_due_date': {
    async up(db: Kysely<any>) {
      await db.schema.alterTable('tasks').addColumn('due_at', 'text').execute();
      await db.schema.createIndex('idx_tasks_project').on('tasks').column('project_id').execute();
    },
  },
};

class InCodeMigrationProvider implements MigrationProvider {
  async getMigrations(): Promise<Record<string, Migration>> {
    return migrations;
  }
}

export async function runMigrations(db: Kysely<any>): Promise<void> {
  const migrator = new Migrator({ db, provider: new InCodeMigrationProvider() });
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((r) => {
    if (r.status === 'Error') console.error(`Migration ${r.migrationName} failed`);
  });
  if (error) throw error;
}
```

Notes:

- Names are sorted alphabetically, so use a zero-padded prefix.
- `migrateToLatest()` does not throw. It returns `{ error, results }`, so check `error` yourself or your app starts with a half-migrated schema.
- Calling it on every launch is cheap. If nothing is pending it reads the migration table and returns.
- SQLite supports transactional DDL, so the Migrator wraps the run in a transaction. That works with the driver above.
- Write migrations against `Kysely<any>`, not your current `Database` type. Old migrations must keep compiling after the schema evolves.

## Queries

### Insert

```typescript
const db = await getDb();

const result = await db
  .insertInto('projects')
  .values({ name: 'Groceries' })
  .executeTakeFirst();

const projectId = Number(result.insertId);

await db
  .insertInto('tasks')
  .values([
    { project_id: projectId, title: 'Milk' },
    { project_id: projectId, title: 'Bread', done: true },
  ])
  .execute();
```

`insertId` is a `bigint` in Kysely. Convert with `Number()` for normal row ids.

Avoid `.returning()` if you target Android with the current Fast SQL version: Android only returns rows for statements that start with `SELECT`, `PRAGMA` or `EXPLAIN`, so `INSERT ... RETURNING` runs but returns nothing. iOS and web return the rows. Reading `insertId` works everywhere.

### Select

```typescript
const openTasks = await db
  .selectFrom('tasks')
  .select(['id', 'title', 'due_at'])
  .where('project_id', '=', projectId)
  .where('done', '=', 0)
  .orderBy('id')
  .execute();
// openTasks: { id: number; title: string; due_at: string | null }[]

const project = await db
  .selectFrom('projects')
  .selectAll()
  .where('id', '=', projectId)
  .executeTakeFirst(); // undefined if not found
```

### Joins and aggregates

```typescript
const summary = await db
  .selectFrom('projects as p')
  .leftJoin('tasks as t', 't.project_id', 'p.id')
  .select((eb) => [
    'p.id',
    'p.name',
    eb.fn.count<number>('t.id').as('task_count'),
    eb.fn.sum<number>('t.done').as('done_count'),
  ])
  .groupBy('p.id')
  .execute();
```

Kysely knows which columns exist after the join, and the aliases (`task_count`, `done_count`) end up in the result type. Because rows come back as objects keyed by column name, give every selected column a unique name. Two columns both called `id` would overwrite each other in the row object, which is true for any SQLite driver that returns objects.

### Nested results with JSON helpers

```typescript
import { jsonArrayFrom } from 'kysely/helpers/sqlite';

const projects = await db
  .selectFrom('projects')
  .select((eb) => [
    'projects.id',
    'projects.name',
    jsonArrayFrom(
      eb.selectFrom('tasks')
        .select(['tasks.id', 'tasks.title'])
        .whereRef('tasks.project_id', '=', 'projects.id'),
    ).as('tasks'),
  ])
  .execute();
```

This relies on SQLite's JSON functions. They are built in on iOS, in the web build and in recent Android releases, but if your `minSdkVersion` is old, run `SELECT json('{}')` on your oldest test device first.

### Update and delete

```typescript
await db.updateTable('tasks').set({ done: true }).where('id', '=', taskId).execute();

const deleted = await db.deleteFrom('tasks').where('done', '=', 1).executeTakeFirst();
console.log(Number(deleted.numDeletedRows));
```

## Transactions

```typescript
await db.transaction().execute(async (trx) => {
  const { insertId } = await trx
    .insertInto('projects')
    .values({ name: 'Trip' })
    .executeTakeFirstOrThrow();

  await trx
    .insertInto('tasks')
    .values(['Passport', 'Tickets', 'Charger'].map((title) => ({
      project_id: Number(insertId),
      title,
    })))
    .execute();
});
```

If the callback throws, the driver rolls back. Use `trx`, not `db`, inside the callback. Queries on `db` wait for the mutex, which is held by the transaction, so they would deadlock until the transaction ends.

## Raw SQL when you need it

```typescript
import { sql } from 'kysely';

const { rows } = await sql<{ journal_mode: string }>`PRAGMA journal_mode`.execute(db);
```

The `sql` tag binds interpolated values as parameters, so it is safe with user input. Use `sql.raw()` only for trusted fragments.

## Using the community plugin instead

If you are on `@capacitor-community/sqlite`, keep the dialect, adapter, compiler and mutex, and replace the connection:

```typescript
import type { SQLiteDBConnection } from '@capacitor-community/sqlite';

class CommunityConnection implements DatabaseConnection {
  constructor(readonly db: SQLiteDBConnection) {}

  async executeQuery<R>(compiled: CompiledQuery): Promise<QueryResult<R>> {
    const params = compiled.parameters.map(toSqlValue);
    if (/^\s*(select|pragma|with)\b/i.test(compiled.sql)) {
      const res = await this.db.query(compiled.sql, params);
      return { rows: (res.values ?? []) as R[] };
    }
    const res = await this.db.run(compiled.sql, params, false, 'all');
    return {
      rows: (res.changes?.values ?? []) as R[],
      numAffectedRows: BigInt(res.changes?.changes ?? 0),
      insertId: res.changes?.lastId != null ? BigInt(res.changes.lastId) : undefined,
    };
  }

  async *streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Streaming is not supported');
  }
}
```

Pass `false` as the third argument to `run()`. Its default wraps every statement in its own transaction, which breaks Kysely transactions. Use the plugin's `beginTransaction()`, `commitTransaction()` and `rollbackTransaction()` in the driver.

## Troubleshooting

**`Cannot find module 'kysely/migration'`.** You are on Kysely older than 0.29, where `Migrator` is exported from `kysely` directly. Update or change the import.

**Queries hang forever.** You used `db` inside `db.transaction().execute()`. Use the `trx` argument.

**`done = true` never matches on Android.** A boolean reached the plugin without conversion. Make sure every value goes through `toSqlValue`, including values in `sql` template literals.

**`no such table: kysely_migration` errors on first launch.** The Migrator creates its table itself, so this usually means `init()` failed earlier. Check the native setup (iOS local networking, Android cleartext localhost rule) and log the first error.

**Types say a column exists but SQLite says it does not.** The `Database` interface and the migrations drifted. The interface is not generated from the database, so update both in the same commit.

## Summary

Kysely needs about 80 lines of glue to run on Capacitor: a connection that calls `execute()`, a mutex, and transaction hooks. In exchange you get fully typed SQL on top of Fast SQL's native SQLite on iOS and Android and SQLite Wasm on the web.

Related reading: [Drizzle ORM with Capacitor](/blog/drizzle-orm-capacitor-sqlite/) if you prefer schema-first definitions, [TypeORM with Capacitor](/blog/typeorm-capacitor-sqlite/) for decorators and repositories, and the [Fast SQL plugin docs](/docs/plugins/fast-sql/) for every connection option.
