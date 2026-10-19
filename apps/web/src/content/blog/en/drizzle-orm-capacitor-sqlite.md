---
slug: drizzle-orm-capacitor-sqlite
title: "How to Use Drizzle ORM with Capacitor and SQLite"
description: "Set up Drizzle ORM with Capacitor and SQLite: a working sqlite-proxy driver, typed schema, relational queries, transactions and in-app Drizzle Kit migrations."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor logo for a guide on using Drizzle ORM with Capacitor and SQLite"
keywords: drizzle capacitor, drizzle orm capacitor sqlite, drizzle sqlite-proxy, drizzle kit migrations mobile, capacitor sqlite orm, ionic drizzle
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does Drizzle ORM support Capacitor?"
    answer: "Drizzle has no Capacitor-specific driver, but its sqlite-proxy driver accepts any async function that runs SQL and returns rows as arrays. Wrapping a Capacitor SQLite plugin in that function gives you the full Drizzle query builder, relational queries and transactions. This guide includes a tested implementation."
  - question: "How do I run Drizzle Kit migrations in a Capacitor app?"
    answer: "Set driver: 'expo' in drizzle.config.ts so Drizzle Kit also writes a migrations.js bundle with the SQL embedded. Import that bundle in the app, make your bundler load .sql files as strings, and apply pending entries at startup with a small migration runner that records applied migrations in a table."
  - question: "Why are some columns undefined or wrong after a join?"
    answer: "Drizzle does not alias joined columns, so two columns with the same name (for example users.id and posts.id) arrive from the plugin as one object key. Select only uniquely named columns, or alias them with sql`${posts.id}`.as('post_id')."
  - question: "Which SQLite plugin should I use with Drizzle on Capacitor?"
    answer: "@capacitor-community/sqlite works with the proxy approach because it returns row objects in column order on iOS, Android and web. @capgo/capacitor-fast-sql returns rows keyed by column name without a guaranteed key order on iOS, so for Fast SQL a query builder that reads rows by name, like Kysely, is the better match today."
  - question: "Can I use Drizzle relational queries on mobile?"
    answer: "Yes, as long as you define relations() in the schema and pass the schema to drizzle(). Relational queries use SQLite JSON functions, which are available on iOS and recent Android versions. Test on the oldest Android version you support."
---

Drizzle ORM runs in a Capacitor app through its `sqlite-proxy` driver: you give Drizzle one async function that executes SQL on a native SQLite plugin and returns rows as arrays, and Drizzle handles the typed query builder, relational queries and transactions on top. This guide builds that function for `@capacitor-community/sqlite`, shows how to ship Drizzle Kit migrations inside the app bundle, and lists the edge cases that silently corrupt results if you miss them.

Everything below was tested with `drizzle-orm` 0.45 and `drizzle-kit` 0.31 on Capacitor 8.

## Why Drizzle on a mobile database

- **Schema in TypeScript.** Tables are plain TypeScript objects. Types for selects and inserts are inferred, no code generation step.
- **SQL-shaped API.** `db.select().from(users).where(eq(users.id, 1))` maps one to one to SQL, so you can reason about what runs on the device.
- **Migrations generated from the schema.** Drizzle Kit diffs your schema and writes SQL migration files.
- **No decorators.** Works with Vite and esbuild without extra TypeScript flags.

The trade-off: Drizzle has no Capacitor driver in its package, so you write the bridge yourself. It is about 30 lines.

## Picking the SQLite plugin

Drizzle's `sqlite-proxy` driver maps result rows **by position**: for `all` and `values` it expects an array of arrays, for `get` a single array, in the same order as the columns in the generated `SELECT`. Capacitor SQLite plugins return objects keyed by column name, so the driver has to turn each object back into an array. That only works when the object keys keep the column order.

| Plugin | Row format | Column order preserved | Fit for Drizzle proxy |
| --- | --- | --- | --- |
| `@capacitor-community/sqlite` | Objects | Yes. On iOS the plugin sends an `ios_columns` list and the JS layer rebuilds each row in column order | Good |
| `@capgo/capacitor-fast-sql` | Objects | Not guaranteed on iOS, rows are serialized from a Swift dictionary | Use Kysely instead |

That is why this guide uses the community plugin. If you already use Fast SQL, or want its faster data path, [Kysely](/blog/kysely-capacitor-sqlite/) reads rows by column name and works with it directly. For an overview of both plugins, see [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/).

## Install

```bash
bun add drizzle-orm @capacitor-community/sqlite
bun add -d drizzle-kit
bunx cap sync
```

`@capacitor-community/sqlite` bundles SQLCipher on iOS and Android, so your app ships encryption code even if you do not encrypt anything. Keep that in mind for App Store export compliance questions.

## Define the schema

```typescript
// src/db/schema.ts
import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const posts = sqliteTable(
  'posts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    authorId: integer('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    published: integer('published', { mode: 'boolean' }).notNull().default(false),
  },
  (t) => [index('idx_posts_author').on(t.authorId)],
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
```

A few details matter on mobile:

- `mode: 'timestamp'` stores seconds since epoch as an integer and gives you `Date` objects in TypeScript.
- `$defaultFn(() => new Date())` sets the default in JavaScript. A SQL default like `unixepoch()` needs SQLite 3.38 or newer, which older Android system SQLite does not have.
- `mode: 'boolean'` stores `1`/`0`. Drizzle converts both ways.
- `relations()` is what powers `db.query.*` with `with: {...}`. Foreign keys alone are not enough for relational queries.

## Open the connection

The community plugin keeps a registry of connections. During live reload or hot module replacement your code can run twice, so reuse an existing connection instead of creating a second one.

```typescript
// src/db/connection.ts
import {
  CapacitorSQLite,
  SQLiteConnection,
  type SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);

export async function openConnection(name: string): Promise<SQLiteDBConnection> {
  const consistent = (await sqlite.checkConnectionsConsistency()).result;
  const exists = (await sqlite.isConnection(name, false)).result;

  const conn =
    consistent && exists
      ? await sqlite.retrieveConnection(name, false)
      : await sqlite.createConnection(name, false, 'no-encryption', 1, false);

  await conn.open();
  await conn.execute('PRAGMA foreign_keys = ON', false);
  return conn;
}
```

The plugin appends `SQLite.db` to the file name, so `app` becomes `appSQLite.db` on disk. On the web the plugin needs the `jeep-sqlite` custom element and `sqlite.initWebStore()` before the first connection. Follow the plugin's web setup if you target the browser.

## The sqlite-proxy driver

This is the core of the integration. Drizzle calls the function with the SQL, the parameters, and a `method`:

- `run`: no rows needed (INSERT, UPDATE, DELETE, DDL, transaction control).
- `all`: every row, as arrays.
- `get`: the first row, as an array, or `undefined`.
- `values`: every row, as arrays (used by raw `values()` calls and internals).

```typescript
// src/db/client.ts
import type { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as schema from './schema';

const READ = /^\s*(select|pragma|with|explain)\b/i;
const TX_CONTROL = /^\s*(begin|commit|rollback|savepoint|release)\b/i;

export function createDb(conn: SQLiteDBConnection) {
  return drizzle(
    async (sql, params, method) => {
      // Transaction control: no params, no rows, no implicit wrapping
      if (TX_CONTROL.test(sql)) {
        await conn.execute(sql, false);
        return { rows: [] };
      }

      let rows: Record<string, unknown>[];
      if (READ.test(sql)) {
        rows = (await conn.query(sql, params)).values ?? [];
      } else {
        // 'all' returns rows for INSERT/UPDATE/DELETE ... RETURNING
        const res = await conn.run(sql, params, false, method === 'run' ? 'no' : 'all');
        rows = res.changes?.values ?? [];
      }

      if (method === 'run') return { rows: [] };

      // Drizzle maps by position. The plugin keeps column order in each object.
      const arrays = rows.map((row) => Object.values(row));
      return { rows: method === 'get' ? (arrays[0] as any) : arrays };
    },
    { schema },
  );
}

export type AppDb = ReturnType<typeof createDb>;
```

Why each branch exists:

- **`TX_CONTROL`**: Drizzle implements `db.transaction()` by sending `begin`, `commit`, `rollback`, and `savepoint`/`release` for nested transactions. They go through `execute(sql, false)`, the same path TypeORM's official Capacitor driver uses for `BEGIN`/`COMMIT`.
- **`false` as the third argument to `run()`**: the plugin's default wraps each statement in its own transaction, which collides with Drizzle's explicit `begin`.
- **`returnMode 'all'`**: makes `.returning()` work for inserts, updates and deletes.
- **`Object.values(row)`**: turns the keyed row back into a positional array.

I ran this exact function against an in-memory SQLite that returns rows the way the plugin does. Inserts with `.returning()`, filtered selects, `.get()`, relational queries, transactions, and rollbacks on a thrown error all produce correct results.

## Initialize once

```typescript
// src/db/index.ts
import { openConnection } from './connection';
import { createDb, type AppDb } from './client';
import { runMigrations } from './migrate';
import bundle from '../../drizzle/migrations';

let dbPromise: Promise<AppDb> | null = null;

export function getDb(): Promise<AppDb> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const conn = await openConnection('app');
      await runMigrations(conn, bundle);
      return createDb(conn);
    })();
  }
  return dbPromise;
}
```

## Migrations with Drizzle Kit

Drizzle's built-in `sqlite-proxy` migrator reads `.sql` files from disk with Node's `fs`, which a WebView does not have. The fix is to let Drizzle Kit bundle the SQL into a JavaScript module and apply it yourself.

### 1. Configure Drizzle Kit

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
});
```

`driver: 'expo'` does not mean you need Expo. It tells Drizzle Kit to also write `drizzle/migrations.js`, which imports the journal and each `.sql` file. That is the format any non-Node runtime needs.

### 2. Generate

```bash
bunx drizzle-kit generate
```

You get `drizzle/0000_<name>.sql`, `drizzle/meta/_journal.json` and `drizzle/migrations.js`. Commit all three. Run `generate` again after every schema change. Do not edit SQL files that already shipped.

### 3. Let the bundler import .sql as text

`migrations.js` has lines like `import m0000 from './0000_fearless_selene.sql'`. Vite does not know `.sql`, so add a tiny plugin instead of another dependency:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'sql-as-text',
      transform(code, id) {
        if (id.endsWith('.sql')) {
          return { code: `export default ${JSON.stringify(code)};`, map: null };
        }
      },
    },
  ],
});
```

And a type declaration so TypeScript accepts the import:

```typescript
// src/sql.d.ts
declare module '*.sql' {
  const content: string;
  export default content;
}
```

With webpack (Angular custom builders, older setups) use an `asset/source` rule for `.sql` files instead.

### 4. Apply migrations at startup

```typescript
// src/db/migrate.ts
import type { SQLiteDBConnection } from '@capacitor-community/sqlite';

interface MigrationBundle {
  journal: { entries: { idx: number; when: number; tag: string }[] };
  migrations: Record<string, string>;
}

export async function runMigrations(conn: SQLiteDBConnection, bundle: MigrationBundle) {
  await conn.execute(
    `CREATE TABLE IF NOT EXISTS __drizzle_migrations (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       hash TEXT NOT NULL,
       created_at NUMERIC
     )`,
    false,
  );

  const res = await conn.query(
    'SELECT created_at FROM __drizzle_migrations ORDER BY created_at DESC LIMIT 1',
  );
  const lastApplied = Number(res.values?.[0]?.created_at ?? 0);

  for (const entry of bundle.journal.entries) {
    if (entry.when <= lastApplied) continue;

    const key = `m${entry.idx.toString().padStart(4, '0')}`;
    const sqlText = bundle.migrations[key];
    if (!sqlText) throw new Error(`Missing migration ${entry.tag}`);

    const statements = sqlText
      .split('--> statement-breakpoint')
      .map((s) => s.trim())
      .filter(Boolean);

    await conn.beginTransaction();
    try {
      for (const statement of statements) {
        await conn.execute(statement, false);
      }
      await conn.run(
        'INSERT INTO __drizzle_migrations (hash, created_at) VALUES (?, ?)',
        [entry.tag, entry.when],
        false,
      );
      await conn.commitTransaction();
    } catch (error) {
      await conn.rollbackTransaction();
      throw error;
    }
  }
}
```

This follows the same rule Drizzle's own migrators use: a migration is pending when its journal timestamp is newer than the newest one recorded. Each migration runs in its own transaction, so a failure leaves the previous state intact. Calling it on every launch is cheap.

If you ship JavaScript with [Capgo live updates](/live-update/), new migrations reach users without a store release. Keep them additive (new tables, new nullable columns), because a rollback to an older bundle will run against the newer schema.

## Queries

```typescript
import { and, desc, eq, sql } from 'drizzle-orm';
import { getDb } from './db';
import { posts, users } from './db/schema';

const db = await getDb();

// Insert and get the row back
const [ada] = await db
  .insert(users)
  .values({ name: 'Ada', email: 'ada@example.com' })
  .returning();

// Bulk insert
await db.insert(posts).values([
  { authorId: ada.id, title: 'Draft' },
  { authorId: ada.id, title: 'Live', published: true },
]);

// Select with filters
const live = await db
  .select()
  .from(posts)
  .where(and(eq(posts.authorId, ada.id), eq(posts.published, true)))
  .orderBy(desc(posts.id));

// Single row or undefined
const user = await db.select().from(users).where(eq(users.email, 'ada@example.com')).get();

// Update and delete
await db.update(posts).set({ published: true }).where(eq(posts.id, live[0].id));
await db.delete(posts).where(eq(posts.published, false));

// Aggregate
const [{ count }] = await db
  .select({ count: sql<number>`count(*)` })
  .from(posts);
```

### Relational queries

```typescript
const authors = await db.query.users.findMany({
  with: { posts: { where: (p, { eq }) => eq(p.published, true) } },
});

const one = await db.query.users.findFirst({
  where: (u, { eq }) => eq(u.id, ada.id),
  with: { posts: true },
});
```

Drizzle builds these with SQLite's JSON functions, then parses the result. They work on iOS and on recent Android versions. If your `minSdkVersion` is old, check `SELECT json('{}')` on your oldest test device.

### Joins: alias duplicate column names

This is the one sharp edge of any proxy driver built on object rows. Drizzle does not add `AS` aliases to joined columns, so this query:

```typescript
// Wrong: both columns are named "id" in the result set
await db
  .select({ postId: posts.id, userId: users.id })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id));
```

produces two columns called `id`. They collapse into one key in the row object, the array is one value short, and Drizzle assigns values to the wrong fields. In my test `postId` came back with the user id and `userId` was `undefined`. No error is thrown.

Alias them explicitly:

```typescript
await db
  .select({
    postId: sql<number>`${posts.id}`.as('post_id'),
    userId: sql<number>`${users.id}`.as('user_id'),
    title: posts.title,
    author: users.name,
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id));
```

Selecting columns with different names (`posts.title`, `users.name`) is fine. Avoid `db.select().from(a).innerJoin(b, ...)` without a field list when both tables share column names like `id` or `created_at`. Relational queries do not have this problem.

## Transactions

```typescript
await db.transaction(async (tx) => {
  const [user] = await tx
    .insert(users)
    .values({ name: 'Grace', email: 'grace@example.com' })
    .returning();

  await tx.insert(posts).values({ authorId: user.id, title: 'Hello' });

  // Nested transactions become savepoints
  await tx.transaction(async (inner) => {
    await inner.insert(posts).values({ authorId: user.id, title: 'Maybe' });
  });
});
```

If the callback throws, Drizzle sends `rollback`. Calling `tx.rollback()` also aborts the transaction, by throwing.

There is one connection per database, so keep transactions short and do not `await` network calls inside them. Other writes on the same connection would run inside your open transaction.

## Troubleshooting

**"Connection already exists" error on startup.** Your initialization ran twice, usually because of hot reload. Use the `checkConnectionsConsistency` and `retrieveConnection` pattern shown above.

**`cannot start a transaction within a transaction`.** A `run()` call was made without `false` as the third argument, so the plugin opened its own transaction inside Drizzle's.

**Migrations run on every launch and fail with `table already exists`.** The `__drizzle_migrations` insert is missing or rolled back. Check that the journal `when` values in your bundle match the rows in the table.

**Build error `Failed to parse source for import analysis` on `.sql`.** The Vite transform plugin is missing or runs after another plugin that tries to parse the file. Put it first in the `plugins` array.

**`.returning()` returns an empty array.** The write went through `run` with return mode `no`. Make sure the driver passes `'all'` when `method` is not `run`.

**Dates are off by a factor of 1000.** `mode: 'timestamp'` stores seconds, `mode: 'timestamp_ms'` stores milliseconds. Pick one per column and do not mix it with raw `Date.now()` inserts.

## When to pick something else

- You want the fastest data path with Fast SQL, or row objects keyed by name: [Kysely with Capacitor](/blog/kysely-capacitor-sqlite/).
- You prefer decorators, entities and repositories, or you are porting a TypeORM backend model: [TypeORM with Capacitor](/blog/typeorm-capacitor-sqlite/).
- You need encryption at rest: [Encrypting a SQLite database in Capacitor](/blog/encrypt-sqlite-database-capacitor/).

Adding a native plugin means rebuilding the iOS and Android apps. If you do not have a Mac at hand, [Capgo Build](/native-build/) builds and signs both in the cloud.
