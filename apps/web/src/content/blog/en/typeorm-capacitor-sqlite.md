---
slug: typeorm-capacitor-sqlite
title: "How to Use TypeORM with Capacitor and SQLite"
description: "Use TypeORM with Capacitor and SQLite on iOS and Android: DataSource setup, entities that work with Vite, repositories, transactions and generated migrations."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor logo for a guide on using TypeORM with Capacitor and SQLite"
keywords: typeorm capacitor, typeorm capacitor sqlite, typeorm ionic, capacitor-community sqlite typeorm, typeorm migrations mobile, typeorm vite decorators
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does TypeORM support Capacitor?"
    answer: "Yes. TypeORM has a built-in DataSource type named capacitor. It expects a SQLiteConnection from @capacitor-community/sqlite as its driver option, so that plugin is required. No extra adapter package is needed."
  - question: "Why do my TypeORM entities fail with ColumnTypeUndefinedError in a Vite app?"
    answer: "Vite and esbuild do not emit decorator metadata, so TypeORM cannot infer column types from TypeScript property types. Give every @Column an explicit type such as @Column('text') or @Column('integer'). Relations are fine because they use arrow functions."
  - question: "Can I use the TypeORM CLI to generate migrations for a Capacitor app?"
    answer: "Not against the device database, since the CLI runs in Node or Bun. Point a second DataSource of type sqljs at a local file with the same entities, run migration:run then migration:generate, and import the generated migration classes in the app. Both drivers use TypeORM's SQLite dialect, so the SQL is compatible."
  - question: "Should I use synchronize: true in a Capacitor app?"
    answer: "Not in production. synchronize compares entities with the database on every start and can drop and recreate tables or columns, which deletes user data on the device. Use migrations and keep synchronize false."
  - question: "Does TypeORM work with @capgo/capacitor-fast-sql?"
    answer: "Not out of the box. TypeORM's capacitor driver calls the community plugin's connection API directly. If you want Fast SQL, a query builder with a small custom driver, such as Kysely, is the simpler route."
---

TypeORM works in a Capacitor app through its built-in `capacitor` driver, which runs every query on `@capacitor-community/sqlite`. You configure a `DataSource` with the plugin's `SQLiteConnection`, define entities with decorators, and use repositories and transactions as you would on a server. This guide covers the full setup on TypeORM 1.x and Capacitor 8, including the two things most tutorials skip: explicit column types for Vite, and how to generate migrations even though the CLI cannot talk to a phone.

## When TypeORM is a good fit

TypeORM is a data-mapper ORM with entities, relations, repositories and a migration system. On mobile it makes sense when:

- you already use TypeORM on the backend and want the same entity style in the app,
- your data model has many relations and you want `relations: { posts: true }` instead of hand-written joins,
- your team prefers classes and decorators over schema objects.

It is heavier than a query builder. If bundle size and startup time matter most, or you want to use `@capgo/capacitor-fast-sql`, look at [Kysely](/blog/kysely-capacitor-sqlite/) or [Drizzle](/blog/drizzle-orm-capacitor-sqlite/) instead.

## Install

```bash
bun add typeorm @capacitor-community/sqlite
bunx cap sync
```

TypeORM 1.x imports `reflect-metadata` itself, so you do not need a separate import at the top of `main.ts` as older guides show. The community plugin bundles SQLCipher on iOS and Android whether or not you encrypt, which matters when you answer App Store export compliance questions.

### TypeScript settings

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  }
}
```

`experimentalDecorators` enables TypeORM's legacy decorators. `useDefineForClassFields: false` stops class field initializers from overwriting values TypeORM sets, which matters when your `target` is ES2022 or later.

## Entities that work with Vite and esbuild

Most Capacitor apps are built with Vite, which compiles TypeScript with esbuild. esbuild supports decorators but does not implement `emitDecoratorMetadata`, so TypeORM cannot read property types at runtime. Without explicit types you get `ColumnTypeUndefinedError`. Give every column a type:

```typescript
// src/db/entities/author.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { Post } from './post';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  name!: string;

  @Column('text', { unique: true })
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Relation<Post[]>;
}
```

```typescript
// src/db/entities/post.ts
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { Author } from './author';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  title!: string;

  @Column('boolean', { default: false })
  published!: boolean;

  @Index()
  @Column('integer')
  authorId!: number;

  @ManyToOne(() => Author, (author) => author.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author!: Relation<Author>;
}
```

Notes:

- `Relation<T>` is a type-only wrapper. It avoids circular import problems between `author.ts` and `post.ts` if you ever compile with decorator metadata (for example in the CLI or tests).
- The explicit `authorId` column lets you filter and insert by id without loading the author.
- SQLite has no boolean type. TypeORM stores `boolean` columns as `0`/`1` and converts them back.

## Configure the DataSource

```typescript
// src/db/data-source.ts
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm';
import { Author } from './entities/author';
import { Post } from './entities/post';
import { Init1790000000000 } from './migrations/1790000000000-Init';

export const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

export const AppDataSource = new DataSource({
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'app',
  mode: 'no-encryption',
  entities: [Author, Post],
  migrations: [Init1790000000000],
  synchronize: false,
  migrationsRun: false,
  journalMode: 'WAL',
  logging: ['error'],
});
```

Option by option:

- **`driver`**: the plugin's `SQLiteConnection`. TypeORM's driver uses it to create and open the connection, then turns on `PRAGMA foreign_keys` so `onDelete: 'CASCADE'` works.
- **`database`**: the plugin adds a `SQLite.db` suffix, so the file is `appSQLite.db`.
- **`mode`**: `no-encryption`, or one of the plugin's encryption modes (`secret`, `encryption`). See [encrypting SQLite in Capacitor](/blog/encrypt-sqlite-database-capacitor/).
- **`synchronize: false`**: in production, always. Sync can drop columns to match entities, which deletes user data on the device.
- **`migrationsRun: false`**: the plugin's documentation asks for this with the capacitor type. Run migrations yourself right after `initialize()`, as shown below.
- **`journalMode: 'WAL'`**: optional. Better concurrency between reads and writes.
- **`migrations`**: class references, not a glob. There is no file system scan in a WebView.

Glob patterns like `entities: ['src/**/*.entity.ts']` do not work in the app for the same reason. Import the classes.

## Initialize at startup

```typescript
// src/db/index.ts
import { Capacitor } from '@capacitor/core';
import { AppDataSource, sqliteConnection } from './data-source';

let ready: Promise<typeof AppDataSource> | null = null;

export function initDatabase() {
  if (!ready) {
    ready = (async () => {
      if (Capacitor.getPlatform() === 'web') {
        // Needs the jeep-sqlite element in the DOM, see "Web support"
        await sqliteConnection.initWebStore();
      }

      // Clean up connections left over from a hot reload
      await sqliteConnection.checkConnectionsConsistency();

      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      await AppDataSource.runMigrations({ transaction: 'each' });

      if (Capacitor.getPlatform() === 'web') {
        await sqliteConnection.saveToStore('app');
      }
      return AppDataSource;
    })();
  }
  return ready;
}
```

Call `await initDatabase()` before your app renders anything that reads data. `transaction: 'each'` wraps every migration in its own transaction, so a failure leaves earlier migrations applied and the failing one rolled back.

## Repositories: insert, select, update, delete

```typescript
import { initDatabase } from './db';
import { Author } from './db/entities/author';
import { Post } from './db/entities/post';

const ds = await initDatabase();
const authors = ds.getRepository(Author);
const posts = ds.getRepository(Post);

// Insert
const ada = await authors.save(authors.create({ name: 'Ada', email: 'ada@example.com' }));
await posts.save([
  posts.create({ title: 'Draft', authorId: ada.id }),
  posts.create({ title: 'Live', authorId: ada.id, published: true }),
]);

// Select
const published = await posts.find({
  where: { authorId: ada.id, published: true },
  order: { id: 'DESC' },
});
const one = await authors.findOneBy({ email: 'ada@example.com' });

// Load a relation
const withPosts = await authors.findOne({
  where: { id: ada.id },
  relations: { posts: true },
});

// Update without loading
await posts.update({ authorId: ada.id }, { published: true });

// Delete
await posts.delete({ published: false });
```

`save()` inserts or updates depending on whether the primary key is set, and returns the entity with its generated id. For bulk writes where you do not need entities back, `insert()` is faster because it skips the extra lookups.

### Query builder for anything non-trivial

```typescript
const stats = await ds
  .getRepository(Author)
  .createQueryBuilder('a')
  .leftJoin('a.posts', 'p')
  .select('a.id', 'id')
  .addSelect('a.name', 'name')
  .addSelect('COUNT(p.id)', 'postCount')
  .groupBy('a.id')
  .getRawMany<{ id: number; name: string; postCount: number }>();
```

Joins and aggregates are where an ORM saves you time on mobile. Check the generated SQL with `.getSql()` while developing, and add indexes for columns used in `WHERE` and `JOIN`.

## Transactions

```typescript
await ds.transaction(async (manager) => {
  const grace = await manager.save(Author, { name: 'Grace', email: 'grace@example.com' });
  await manager.save(Post, { title: 'Hello', authorId: grace.id });
});
```

Use the `manager` passed to the callback for every query inside the transaction. If the callback throws, TypeORM rolls back.

The Capacitor driver uses a single connection, so there is no isolation between the transaction and other work: a query made through `ds` or another repository while the transaction is open runs on the same connection and is committed or rolled back with it. Don't start unrelated database work until the transaction finishes, keep transactions short, and never wait for a network request inside one.

## Migrations: generate them with a local sqljs DataSource

The TypeORM CLI runs on your computer, not on the phone, so it cannot inspect the device database. The plugin's own docs say migrations for the capacitor type have to be written by hand. You can still get generated migrations: TypeORM's `sqljs` driver uses the same SQLite dialect, so it produces SQL that the device runs unchanged.

### 1. Add a CLI-only DataSource

```bash
bun add -d sql.js
```

```typescript
// typeorm.cli.ts (project root, not bundled into the app)
import { DataSource } from 'typeorm';
import { Author } from './src/db/entities/author';
import { Post } from './src/db/entities/post';

export default new DataSource({
  type: 'sqljs',
  location: '.typeorm/schema.sqlite',
  autoSave: true,
  entities: [Author, Post],
  migrations: ['src/db/migrations/*.ts'],
});
```

Add `.typeorm/` to `.gitignore`. That file is a scratch copy of "what the schema looks like after all existing migrations".

### 2. Bring the scratch database up to date, then diff

```bash
mkdir -p .typeorm
bun ./node_modules/typeorm/cli.js migration:run -d ./typeorm.cli.ts
bun ./node_modules/typeorm/cli.js migration:generate -d ./typeorm.cli.ts src/db/migrations/AddTags
```

Bun runs the TypeScript data source and entities directly. The first command applies existing migrations to the scratch database. The second compares it with your entities and writes a new migration class, for example `src/db/migrations/1790000123456-AddTags.ts`. Then add that class to the `migrations` array in `data-source.ts`.

A generated initial migration looks like this:

```typescript
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1790000000000 implements MigrationInterface {
  name = 'Init1790000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_authors_email" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "published" boolean NOT NULL DEFAULT (0), "authorId" integer NOT NULL, CONSTRAINT "FK_posts_author" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_posts_authorId" ON "posts" ("authorId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_posts_authorId"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "authors"`);
  }
}
```

Read every generated migration before shipping it. For SQLite, TypeORM often changes a table by creating `temporary_<table>`, copying rows, dropping the original and renaming. That is correct, but on a large table it takes time on a phone, so run it with a loading state.

### Writing migrations by hand

If you write migrations yourself, start every statement with an uppercase keyword. The capacitor query runner looks at the first word, case-sensitively, to decide how to call the plugin: `BEGIN`, `COMMIT`, `ROLLBACK`, `CREATE`, `ALTER` and `DROP` go to `execute`, `INSERT`, `UPDATE` and `DELETE` go to `run`, and everything else goes to `query`. A lowercase `create table` is sent as a query, which is not what you want for DDL.

### Migrations and live updates

Migration classes are part of your JavaScript bundle. With [Capgo live updates](/live-update/) a schema change reaches users without a store review. A rollback can then put older code on a newer schema, so prefer additive migrations (new tables, new nullable columns) and remove old columns in a later release.

## Web support

The community plugin runs on the web through the `jeep-sqlite` web component (sql.js persisted to IndexedDB). It is useful for development in the browser:

```bash
bun add jeep-sqlite
cp node_modules/sql.js/dist/sql-wasm.wasm public/assets/
```

```typescript
// main.ts, before initDatabase()
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';

if (Capacitor.getPlatform() === 'web') {
  jeepSqlite(window);
  const el = document.createElement('jeep-sqlite');
  document.body.appendChild(el);
  await customElements.whenDefined('jeep-sqlite');
}
```

On the web the database lives in memory and is written to IndexedDB when you call `sqliteConnection.saveToStore('app')`. Call it after writes you care about, or data is lost on reload.

## Troubleshooting

**`Column type for Post#title is not defined and cannot be guessed`.** esbuild did not emit metadata. Add an explicit type to the `@Column` decorator.

**`Capacitor package has not been found installed`.** The `driver` option is missing or undefined. Pass `new SQLiteConnection(CapacitorSQLite)`.

**A "connection already exists" error on reload.** Initialization ran twice. Keep the single `ready` promise and call `checkConnectionsConsistency()` before `initialize()`.

**`No metadata for "Post" was found`.** The entity class is not in the `entities` array, or you used a glob string. Import the class.

**Data reset after every app update during development.** `synchronize: true` is on, or migrations drop and recreate tables. Turn sync off and inspect the generated SQL.

**Migrations ran in the CLI but not on the device.** The new class is not in the `migrations` array in `data-source.ts`. The app does not scan folders.

## Wrap-up

TypeORM on Capacitor is three pieces: the community SQLite plugin as the driver, entities with explicit column types, and migrations generated against a local `sqljs` database and imported as classes. With those in place, repositories, relations and transactions behave the same as on your backend.

For a lighter setup on `@capgo/capacitor-fast-sql`, see [Kysely with Capacitor](/blog/kysely-capacitor-sqlite/). For the plugin basics, start with [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/). When the native side changes, [Capgo Build](/native-build/) can rebuild and sign the iOS and Android apps in the cloud.
